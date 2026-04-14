import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";

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

    const link = await prisma.link.findUnique({
      where: { id: params.id },
    });

    if (!link || link.profileId !== profile.id) {
      return NextResponse.json({ error: "Link no encontrado" }, { status: 404 });
    }

    const body = await req.json();
    const { password } = body;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.link.update({
        where: { id: params.id },
        data: { password: hashedPassword },
      });
    }

    return NextResponse.json({ message: "Password configurado" });
  } catch (error) {
    console.error("Error setting password:", error);
    return NextResponse.json(
      { error: "Error al configurar password" },
      { status: 500 },
    );
  }
}