import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Perfil no encontrado" },
        { status: 404 },
      );
    }

    const socialLinks = await prisma.socialLink.findMany({
      where: { profileId: profile.id },
      orderBy: { platform: "asc" },
    });

    return NextResponse.json(socialLinks);
  } catch (error) {
    console.error("Error fetching social links:", error);
    return NextResponse.json(
      { error: "Error al obtener social links" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Perfil no encontrado" },
        { status: 404 },
      );
    }

    const body = await req.json();
    const { platform, url } = body;

    if (!platform || !url) {
      return NextResponse.json(
        { error: "Plataforma y URL requeridos" },
        { status: 400 },
      );
    }

    // Validate platform
    const validPlatforms = [
      "instagram",
      "twitter",
      "youtube",
      "tiktok",
      "facebook",
      "linkedin",
      "snapchat",
      "whatsapp",
      "github",
      "discord",
    ];

    if (!validPlatforms.includes(platform)) {
      return NextResponse.json({ error: "Plataforma inválida" }, { status: 400 });
    }

    const socialLink = await prisma.socialLink.upsert({
      where: {
        profileId_platform: {
          profileId: profile.id,
          platform,
        },
      },
      update: { url },
      create: {
        profileId: profile.id,
        platform,
        url,
      },
    });

    return NextResponse.json(socialLink);
  } catch (error) {
    console.error("Error creating social link:", error);
    return NextResponse.json(
      { error: "Error al crear social link" },
      { status: 500 },
    );
  }
}