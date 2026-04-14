import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    // In production, verify the webhook signature:
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const event = stripe.webhooks.constructEvent(body, signature, endpointSecret);

    // Mock webhook handling
    const event = JSON.parse(body);

    if (event.type === "checkout.session.completed") {
      const session = event.data?.object;
      if (session?.metadata?.productId) {
        // Create order in DB
        await prisma.order.create({
          data: {
            buyerEmail: session.customer_email || "unknown",
            productId: session.metadata.productId,
            amount: session.amount_total / 100,
            status: "PAID",
            stripePaymentId: session.payment_intent,
          },
        });

        // Update product sales count
        await prisma.product.update({
          where: { id: session.metadata.productId },
          data: { salesCount: { increment: 1 } },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}