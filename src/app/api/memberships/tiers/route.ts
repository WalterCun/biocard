import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
    });

    if (!profile) {
      return NextResponse.json({ error: "Perfil no encontrado" }, { status: 404 });
    }

    const tiers = await prisma.membershipTier.findMany({
      where: { profileId: profile.id },
      orderBy: { price: "asc" },
    });

    return NextResponse.json(tiers);
  } catch (error) {
    console.error("Error fetching tiers:", error);
    return NextResponse.json({ error: "Error al obtener niveles" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
    });

    if (!profile) {
      return NextResponse.json({ error: "Perfil no encontrado" }, { status: 404 });
    }

    const body = await req.json();
    const { name, price, interval, description, features } = body;

    if (!name || !price) {
      return NextResponse.json({ error: "Nombre y precio requeridos" }, { status: 400 });
    }

    const tier = await prisma.membershipTier.create({
      data: {
        profileId: profile.id,
        name,
        price: Number(price),
        interval: interval || "monthly",
        description,
        features: features || [],
      },
    });

    return NextResponse.json(tier);
  } catch (error) {
    console.error("Error creating tier:", error);
    return NextResponse.json({ error: "Error al crear nivel" }, { status: 500 });
  }
}