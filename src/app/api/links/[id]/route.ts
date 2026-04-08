import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { detectLinkType, getEmbedData } from "../types/route";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id } = await params;
    const body = await req.json();
    const {
      title,
      url,
      icon,
      thumbnail,
      category,
      isFeatured,
      isPinned,
      position,
      linkType,
    } = body;

    // Verificar que el link pertenece al perfil
    const existingLink = await prisma.link.findFirst({
      where: { id, profileId: profile.id },
    });

    if (!existingLink) {
      return NextResponse.json(
        { error: "Link no encontrado" },
        { status: 404 },
      );
    }

    // Auto-detect link type and generate embed data if URL changed
    const detectedType =
      linkType || (url ? detectLinkType(url) : existingLink.linkType);
    const embedData = url
      ? getEmbedData(url, detectedType)
      : existingLink.embedData;

    const link = await prisma.link.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(url && { url }),
        ...(linkType && { linkType: detectedType }),
        ...(embedData && { embedData }),
        ...(icon !== undefined && { icon }),
        ...(thumbnail !== undefined && { thumbnail }),
        ...(category !== undefined && { category }),
        ...(isFeatured !== undefined && { isFeatured }),
        ...(isPinned !== undefined && { isPinned }),
        ...(position !== undefined && { position }),
      },
    });

    return NextResponse.json(link);
  } catch (error) {
    console.error("Error updating link:", error);
    return NextResponse.json(
      { error: "Error al actualizar link" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id } = await params;

    // Verificar que el link pertenece al perfil
    const existingLink = await prisma.link.findFirst({
      where: { id, profileId: profile.id },
    });

    if (!existingLink) {
      return NextResponse.json(
        { error: "Link no encontrado" },
        { status: 404 },
      );
    }

    await prisma.link.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Link eliminado" });
  } catch (error) {
    console.error("Error deleting link:", error);
    return NextResponse.json(
      { error: "Error al eliminar link" },
      { status: 500 },
    );
  }
}
