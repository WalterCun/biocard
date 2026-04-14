import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const link = await prisma.link.findUnique({
      where: { id: params.id },
    });

    if (!link || !link.password) {
      return NextResponse.json({ valid: false, error: "Link no encontrado" }, { status: 404 });
    }

    const body = await req.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ valid: false, error: "Password requerido" }, { status: 400 });
    }

    const isValid = await bcrypt.compare(password, link.password);

    if (isValid) {
      return NextResponse.json({ valid: true });
    } else {
      return NextResponse.json({ valid: false }, { status: 401 });
    }
  } catch (error) {
    console.error("Error verifying password:", error);
    return NextResponse.json(
      { error: "Error al verificar password" },
      { status: 500 },
    );
  }
}