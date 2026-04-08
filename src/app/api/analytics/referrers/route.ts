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
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Perfil no encontrado" },
        { status: 404 },
      );
    }

    // Last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Referrers (source of traffic)
    const referrers = await prisma.analytics.groupBy({
      by: ["referrer"],
      where: {
        profileId: profile.id,
        createdAt: { gte: thirtyDaysAgo },
        referrer: { not: null },
      },
      _count: true,
      orderBy: { _count: { referrer: "desc" } },
      take: 20,
    });

    // UTM sources
    const utmSources = await prisma.analytics.groupBy({
      by: ["utmSource"],
      where: {
        profileId: profile.id,
        createdAt: { gte: thirtyDaysAgo },
        utmSource: { not: null },
      },
      _count: true,
      orderBy: { _count: { utmSource: "desc" } },
    });

    // Direct vs referral vs social
    const trafficSources = await prisma.analytics.groupBy({
      by: ["referrer"],
      where: {
        profileId: profile.id,
        createdAt: { gte: thirtyDaysAgo },
        eventType: "visit",
      },
      _count: true,
    });

    const direct = trafficSources
      .filter((r) => !r.referrer || r.referrer === "")
      .reduce((sum, r) => sum + r._count, 0);

    const social = trafficSources
      .filter(
        (r) =>
          r.referrer?.includes("facebook") ||
          r.referrer?.includes("twitter") ||
          r.referrer?.includes("instagram") ||
          r.referrer?.includes("linkedin") ||
          r.referrer?.includes("tiktok"),
      )
      .reduce((sum, r) => sum + r._count, 0);

    const organic = trafficSources
      .filter(
        (r) =>
          r.referrer &&
          r.referrer !== "" &&
          !r.referrer?.includes("facebook") &&
          !r.referrer?.includes("twitter") &&
          !r.referrer?.includes("instagram"),
      )
      .reduce((sum, r) => sum + r._count, 0);

    return NextResponse.json({
      referrers: referrers.map((r) => ({
        source: r.referrer || "Direct",
        count: r._count,
      })),
      utmSources: utmSources.map((u) => ({
        source: u.utmSource,
        count: u._count,
      })),
      breakdown: {
        direct,
        social,
        organic,
        total: direct + social + organic,
      },
    });
  } catch (error) {
    console.error("Error fetching referrers:", error);
    return NextResponse.json(
      { error: "Error al obtener fuentes de tráfico" },
      { status: 500 },
    );
  }
}
