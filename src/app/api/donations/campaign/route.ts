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
      include: { campaign: true },
    });

    return NextResponse.json(profile?.campaign || null);
  } catch (error) {
    console.error("Error fetching campaign:", error);
    return NextResponse.json({ error: "Error al obtener campaña" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
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
    const { name, description, goalAmount, currency, isActive, showDonors } = body;

    const campaign = await prisma.donationCampaign.upsert({
      where: { profileId: profile.id },
      update: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(goalAmount && { goalAmount: Number(goalAmount) }),
        ...(currency && { currency }),
        ...(isActive !== undefined && { isActive }),
        ...(showDonors !== undefined && { showDonors }),
      },
      create: {
        profileId: profile.id,
        name: name || "Mi campaña",
        description,
        goalAmount: Number(goalAmount) || 1000,
        currency: currency || "USD",
        isActive: isActive ?? true,
        showDonors: showDonors ?? true,
      },
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.error("Error saving campaign:", error);
    return NextResponse.json({ error: "Error al guardar campaña" }, { status: 500 });
  }
}