import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, profileId, source = "embedded" } = await req.json();

    if (!email || !profileId) {
      return NextResponse.json({ error: "Email y profileId requeridos" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const subscription = await prisma.emailCapture.upsert({
      where: {
        profileId_email: {
          profileId,
          email,
        },
      },
      update: { source },
      create: {
        profileId,
        email,
        source,
      },
    });

    return NextResponse.json(subscription);
  } catch (error) {
    console.error("Error subscribing:", error);
    return NextResponse.json({ error: "Error al suscribir" }, { status: 500 });
  }
}