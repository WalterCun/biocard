import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { profileId, linkId, visitorId, userAgent, country, city } = body;

    if (!profileId || !linkId) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 },
      );
    }

    // Generate visitor ID from IP or create new one
    const vid = visitorId || crypto.randomUUID();

    // Create analytics record
    const analytics = await prisma.analytics.create({
      data: {
        profileId,
        linkId,
        visitorId: vid,
        userAgent,
        country,
        city,
        eventType: "click",
      },
    });

    // Increment link click count
    await prisma.link.update({
      where: { id: linkId },
      data: { clickCount: { increment: 1 } },
    });

    return NextResponse.json({ success: true, analyticsId: analytics.id });
  } catch (error) {
    console.error("Error tracking click:", error);
    return NextResponse.json(
      { error: "Error al registrar click" },
      { status: 500 },
    );
  }
}
