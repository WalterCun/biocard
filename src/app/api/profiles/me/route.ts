import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET(req: Request) {
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

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        email: true,
        name: true,
        image: true,
        plan: true,
        points: true,
        level: true,
      },
    });

    return NextResponse.json({ ...profile, user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Error al obtener perfil" },
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
      where: { userId: session.user.id },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Perfil no encontrado" },
        { status: 404 },
      );
    }

    const body = await req.json();
    const {
      username,
      displayName,
      bio,
      avatar,
      theme,
      backgroundColor,
      backgroundImage,
      font,
      isPublic,
      customDomain,
    } = body;

    if (username && username !== profile.username) {
      const existing = await prisma.profile.findUnique({
        where: { username },
      });
      if (existing) {
        return NextResponse.json(
          { error: "Username ya en uso" },
          { status: 400 },
        );
      }
    }

    const updated = await prisma.profile.update({
      where: { id: profile.id },
      data: {
        ...(username && { username }),
        ...(displayName !== undefined && { displayName }),
        ...(bio !== undefined && { bio }),
        ...(avatar !== undefined && { avatar }),
        ...(theme && { theme }),
        ...(backgroundColor && { backgroundColor }),
        ...(backgroundImage !== undefined && { backgroundImage }),
        ...(font && { font }),
        ...(isPublic !== undefined && { isPublic }),
        ...(customDomain !== undefined && { customDomain }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Error al actualizar perfil" },
      { status: 500 },
    );
  }
}
