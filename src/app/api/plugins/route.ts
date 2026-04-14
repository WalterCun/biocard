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

    const plugins = await prisma.plugin.findMany({
      orderBy: { category: "asc" },
    });

    return NextResponse.json(plugins);
  } catch (error) {
    console.error("Error fetching plugins:", error);
    return NextResponse.json({ error: "Error al obtener plugins" }, { status: 500 });
  }
}