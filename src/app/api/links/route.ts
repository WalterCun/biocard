import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { detectLinkType, getEmbedData } from "./types/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userEmail: session.user.email },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Perfil no encontrado" },
        { status: 404 },
      );
    }

    const links = await prisma.link.findMany({
      where: { profileId: profile.id },
      orderBy: { position: "asc" },
    });

    return NextResponse.json(links);
  } catch (error) {
    console.error("Error fetching links:", error);
    return NextResponse.json(
      { error: "Error al obtener links" },
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
      where: { userEmail: session.user.email },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Perfil no encontrado" },
        { status: 404 },
      );
    }

    const body = await req.json();
    const {
      title,
      url,
      icon,
      thumbnail,
      category,
      isFeatured,
      isPinned,
      linkType,
    } = body;

    // Auto-detect link type if not provided
    const detectedType = linkType || detectLinkType(url);
    const embedData = getEmbedData(url, detectedType);

    // Obtener la posición más alta
    const lastLink = await prisma.link.findFirst({
      where: { profileId: profile.id },
      orderBy: { position: "desc" },
    });

    const newPosition = lastLink ? lastLink.position + 1 : 0;

    const link = await prisma.link.create({
      data: {
        profileId: profile.id,
        title,
        url,
        linkType: detectedType,
        embedData,
        icon,
        thumbnail,
        category,
        isFeatured: isFeatured || false,
        isPinned: isPinned || false,
        position: newPosition,
      },
    });

    return NextResponse.json(link);
  } catch (error) {
    console.error("Error creating link:", error);
    return NextResponse.json({ error: "Error al crear link" }, { status: 500 });
  }
}
