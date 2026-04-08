import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  try {
    const { username } = await params;

    const profile = await prisma.profile.findUnique({
      where: { username },
      select: { id: true, username: true, isPublic: true },
    });

    if (!profile || !profile.isPublic) {
      return NextResponse.json(
        { error: "Perfil no encontrado" },
        { status: 404 },
      );
    }

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const profileUrl = `${baseUrl}/${username}`;

    // Generate QR code using an API (qrserver.com free API)
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=${encodeURIComponent(profileUrl)}`;

    // Return the URL to the QR code image
    return NextResponse.json({
      qrCodeUrl: qrApiUrl,
      profileUrl,
    });
  } catch (error) {
    console.error("Error generating QR:", error);
    return NextResponse.json({ error: "Error al generar QR" }, { status: 500 });
  }
}
