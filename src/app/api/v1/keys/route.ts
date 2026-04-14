import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import crypto from "crypto";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const keys = await prisma.apiKey.findMany({
      where: { userId: session.user.id },
      select: {
        id: true,
        name: true,
        lastUsedAt: true,
        createdAt: true,
      },
    });

    return NextResponse.json(keys);
  } catch (error) {
    console.error("Error fetching API keys:", error);
    return NextResponse.json({ error: "Error al obtener keys" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Nombre requerido" }, { status: 400 });
    }

    const key = crypto.randomBytes(32).toString("hex");
    const hashedKey = crypto.createHash("sha256").update(key).digest("hex");

    const apiKey = await prisma.apiKey.create({
      data: {
        userId: session.user.id,
        name,
        key: hashedKey,
        permissions: ["read"],
      },
    });

    // Return the raw key only once
    return NextResponse.json({
      id: apiKey.id,
      key: key, // Only shown once!
      name: apiKey.name,
      createdAt: apiKey.createdAt,
    });
  } catch (error) {
    console.error("Error creating API key:", error);
    return NextResponse.json({ error: "Error al crear key" }, { status: 500 });
  }
}