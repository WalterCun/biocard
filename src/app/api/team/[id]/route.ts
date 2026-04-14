import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

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
      where: { userId: session.user.id },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Perfil no encontrado" },
        { status: 404 },
      );
    }

    // Check owner permission
    const ownerMember = await prisma.teamMember.findFirst({
      where: {
        profileId: profile.id,
        userId: session.user.id,
        role: "OWNER",
      },
    });

    if (!ownerMember && profile.userId !== session.user.id) {
      return NextResponse.json({ error: "No tienes permiso" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    const { role } = body;

    const member = await prisma.teamMember.update({
      where: { id },
      data: { role: role as any },
    });

    return NextResponse.json(member);
  } catch (error) {
    console.error("Error updating member:", error);
    return NextResponse.json(
      { error: "Error al actualizar miembro" },
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
      where: { userId: session.user.id },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Perfil no encontrado" },
        { status: 404 },
      );
    }

    // Check owner/admin permission
    const currentMember = await prisma.teamMember.findFirst({
      where: {
        profileId: profile.id,
        userId: session.user.id,
        role: { in: ["OWNER", "ADMIN"] },
      },
    });

    if (!currentMember && profile.userId !== session.user.id) {
      return NextResponse.json({ error: "No tienes permiso" }, { status: 403 });
    }

    const { id } = await params;

    // Can't delete owner
    const targetMember = await prisma.teamMember.findUnique({
      where: { id },
    });

    if (targetMember?.role === "OWNER") {
      return NextResponse.json(
        { error: "No puedes eliminar al dueño" },
        { status: 400 },
      );
    }

    await prisma.teamMember.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Miembro eliminado" });
  } catch (error) {
    console.error("Error deleting member:", error);
    return NextResponse.json(
      { error: "Error al eliminar miembro" },
      { status: 500 },
    );
  }
}
