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
      where: { userEmail: session.user.email },
      select: {
        customDomain: true,
        domainVerified: true,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching domain:", error);
    return NextResponse.json(
      { error: "Error al obtener dominio" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
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
    const { customDomain } = body;

    if (!customDomain) {
      return NextResponse.json({ error: "Dominio requerido" }, { status: 400 });
    }

    // Validate domain format
    const domainRegex =
      /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(customDomain)) {
      return NextResponse.json({ error: "Dominio inválido" }, { status: 400 });
    }

    // Check if domain is already in use
    const existing = await prisma.profile.findFirst({
      where: {
        customDomain,
        id: { not: profile.id },
      },
    });

    if (existing) {
      return NextResponse.json({ error: "Dominio ya en uso" }, { status: 400 });
    }

    const updated = await prisma.profile.update({
      where: { id: profile.id },
      data: {
        customDomain,
        domainVerified: false,
      },
      select: {
        customDomain: true,
        domainVerified: true,
      },
    });

    return NextResponse.json({
      ...updated,
      message: "Dominio configurado. Por favor configura el DNS CNAME.",
    });
  } catch (error) {
    console.error("Error updating domain:", error);
    return NextResponse.json(
      { error: "Error al actualizar dominio" },
      { status: 500 },
    );
  }
}

export async function DELETE() {
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

    await prisma.profile.update({
      where: { id: profile.id },
      data: {
        customDomain: null,
        domainVerified: false,
      },
    });

    return NextResponse.json({ message: "Dominio eliminado" });
  } catch (error) {
    console.error("Error deleting domain:", error);
    return NextResponse.json(
      { error: "Error al eliminar dominio" },
      { status: 500 },
    );
  }
}
