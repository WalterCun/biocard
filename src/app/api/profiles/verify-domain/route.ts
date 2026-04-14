import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import dns from "dns";
import { promisify } from "util";

const resolveTxt = promisify(dns.resolveTxt);

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
      select: {
        customDomain: true,
        domainVerified: true,
      },
    });

    if (!profile?.customDomain) {
      return NextResponse.json(
        { error: "No hay dominio configurado" },
        { status: 400 },
      );
    }

    if (profile.domainVerified) {
      return NextResponse.json({
        verified: true,
        message: "Dominio ya verificado",
      });
    }

    // Check CNAME record pointing to biocard.vercel.app or similar
    try {
      const cnameRecords = await new Promise<string[]>((resolve, reject) => {
        dns.resolveCname(profile.customDomain!, (err, records) => {
          if (err) reject(err);
          else resolve(records || []);
        });
      });

      const validTargets = [
        "biocard.vercel.app",
        "vercel.app",
        "biocard.app",
        "nextjs.io",
      ];

      const isValid = cnameRecords.some((cname) =>
        validTargets.some((target) => cname.endsWith(target))
      );

      if (isValid) {
        // Update domainVerified to true
        await prisma.profile.update({
          where: { userId: session.user.id },
          data: { domainVerified: true },
        });

        return NextResponse.json({
          verified: true,
          message: "Dominio verificado correctamente",
        });
      }
    } catch (dnsError) {
      console.error("DNS lookup failed:", dnsError);
    }

    return NextResponse.json({
      verified: false,
      message: "Verificación pendiente. Asegúrate de configurar el CNAME correctamente.",
    });
  } catch (error) {
    console.error("Error verifying domain:", error);
    return NextResponse.json(
      { error: "Error al verificar dominio" },
      { status: 500 },
    );
  }
}