import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      profileId,
      visitorId,
      userAgent,
      country,
      city,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
    } = body;

    if (!profileId) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 },
      );
    }

    // Generate visitor ID if not provided
    const vid = visitorId || crypto.randomUUID();

    // Create analytics record
    const analytics = await prisma.analytics.create({
      data: {
        profileId,
        visitorId: vid,
        userAgent,
        country,
        city,
        referrer,
        utmSource,
        utmMedium,
        utmCampaign,
        eventType: "visit",
      },
    });

    return NextResponse.json({ success: true, analyticsId: analytics.id });
  } catch (error) {
    console.error("Error tracking visit:", error);
    return NextResponse.json(
      { error: "Error al registrar visita" },
      { status: 500 },
    );
  }
}
