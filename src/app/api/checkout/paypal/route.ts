import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json({ error: "Product ID requerido" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }

    // In production, this would create a real PayPal order:
    // const paypal = new PayPalClient({clientId, clientSecret});
    // const order = await paypal.createOrder({...});

    const amount = Number(product.price);
    
    // Mock response - in production return real PayPal order
    return NextResponse.json({
      orderId: "pp_mock_" + Date.now(),
      approveUrl: "https://www.sandbox.paypal.com/mock/approve",
      amount,
      currency: product.currency,
    });
  } catch (error) {
    console.error("Error creating PayPal checkout:", error);
    return NextResponse.json({ error: "Error al crear checkout" }, { status: 500 });
  }
}