import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    const socialLink = await prisma.socialLink.findUnique({
      where: { id: params.id },
    });

    if (!socialLink || socialLink.profileId !== profile.id) {
      return NextResponse.json(
        { error: "Social link no encontrado" },
        { status: 404 },
      );
    }

    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "URL requerida" }, { status: 400 });
    }

    const updated = await prisma.socialLink.update({
      where: { id: params.id },
      data: { url },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating social link:", error);
    return NextResponse.json(
      { error: "Error al actualizar social link" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    const socialLink = await prisma.socialLink.findUnique({
      where: { id: params.id },
    });

    if (!socialLink || socialLink.profileId !== profile.id) {
      return NextResponse.json(
        { error: "Social link no encontrado" },
        { status: 404 },
      );
    }

    await prisma.socialLink.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Social link eliminado" });
  } catch (error) {
    console.error("Error deleting social link:", error);
    return NextResponse.json(
      { error: "Error al eliminar social link" },
      { status: 500 },
    );
  }
}