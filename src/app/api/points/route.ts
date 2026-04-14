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

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { points: true, level: true },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching points:", error);
    return NextResponse.json({ error: "Error al obtener puntos" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Internal endpoint - would be called by other actions
    const { userId, action, points, description } = await req.json();

    if (!userId || !action || !points) {
      return NextResponse.json({ error: "Parámetros incompletos" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        points: { increment: points },
      },
    });

    // Log the reward
    await prisma.reward.create({
      data: {
        userId,
        action,
        points,
        description,
      },
    });

    // Check for level up
    const newLevel = getLevel(user.points);
    if (newLevel !== user.level) {
      await prisma.user.update({
        where: { id: userId },
        data: { level: newLevel },
      });
    }

    return NextResponse.json({ points: user.points, level: newLevel });
  } catch (error) {
    console.error("Error awarding points:", error);
    return NextResponse.json({ error: "Error al otorgar puntos" }, { status: 500 });
  }
}

function getLevel(points: number): string {
  if (points >= 1000) return "platinum";
  if (points >= 500) return "gold";
  if (points >= 100) return "silver";
  return "bronze";
}