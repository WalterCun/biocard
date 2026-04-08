import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { sendEmail } from "@/lib/email";

export async function GET() {
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

    const teamMembers = await prisma.teamMember.findMany({
      where: { profileId: profile.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: { invitedAt: "desc" },
    });

    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error("Error fetching team:", error);
    return NextResponse.json(
      { error: "Error al obtener equipo" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userEmail: session.user.email },
      include: {
        user: true,
      },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Perfil no encontrado" },
        { status: 404 },
      );
    }

    const body = await req.json();
    const { email, role = "EDITOR" } = body;

    if (!email) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    // Check if user is owner
    const currentMember = await prisma.teamMember.findFirst({
      where: {
        profileId: profile.id,
        userId: session.user.id,
        role: "OWNER",
      },
    });

    if (!currentMember && profile.userId !== session.user.id) {
      return NextResponse.json(
        { error: "No tienes permiso para invitar" },
        { status: 403 },
      );
    }

    // Check if already exists
    const existing = await prisma.teamMember.findFirst({
      where: {
        profileId: profile.id,
        email,
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Usuario ya es miembro del equipo" },
        { status: 400 },
      );
    }

    // Create invite
    const member = await prisma.teamMember.create({
      data: {
        profileId: profile.id,
        email,
        role: role as any,
      },
    });

    // Send invitation email (mock for now)
    try {
      await sendEmail({
        to: email,
        subject: `Invitación a BioCard - ${profile.username}`,
        text: `Has sido invitado a administrar el perfil ${profile.username}. Inicia sesión en BioCard para aceptar la invitación.`,
      });
    } catch (e) {
      console.log("Email send skipped (not configured)");
    }

    return NextResponse.json(member);
  } catch (error) {
    console.error("Error creating invite:", error);
    return NextResponse.json(
      { error: "Error al crear invitación" },
      { status: 500 },
    );
  }
}
