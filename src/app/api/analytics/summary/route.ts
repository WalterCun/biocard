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
      where: { userEmail: session.user.email },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Perfil no encontrado" },
        { status: 404 },
      );
    }

    // Get date range for last 7 days
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Total visits (last 7 days)
    const visitsResult = await prisma.analytics.count({
      where: {
        profileId: profile.id,
        eventType: "visit",
        createdAt: { gte: sevenDaysAgo },
      },
    });

    // Total clicks (last 7 days)
    const clicksResult = await prisma.analytics.count({
      where: {
        profileId: profile.id,
        eventType: "click",
        createdAt: { gte: sevenDaysAgo },
      },
    });

    // Total links and active links
    const totalLinks = await prisma.link.count({
      where: { profileId: profile.id },
    });

    const activeLinks = await prisma.link.count({
      where: { profileId: profile.id, isActive: true },
    });

    // Top 5 links by clicks
    const topLinks = await prisma.link.findMany({
      where: { profileId: profile.id },
      orderBy: { clickCount: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        clickCount: true,
        url: true,
      },
    });

    // Daily visits for the last 7 days
    const dailyVisits = await prisma.$queryRaw`
      SELECT DATE(created_at) as date, COUNT(*) as count
      FROM analytics
      WHERE profile_id = ${profile.id}
        AND event_type = 'visit'
        AND created_at >= ${sevenDaysAgo}
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `;

    // Daily clicks for the last 7 days
    const dailyClicks = await prisma.$queryRaw`
      SELECT DATE(created_at) as date, COUNT(*) as count
      FROM analytics
      WHERE profile_id = ${profile.id}
        AND event_type = 'click'
        AND created_at >= ${sevenDaysAgo}
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `;

    // Devices breakdown
    const deviceStats = await prisma.analytics.groupBy({
      by: ["device"],
      where: {
        profileId: profile.id,
        createdAt: { gte: sevenDaysAgo },
      },
      _count: true,
    });

    // Countries breakdown
    const countryStats = await prisma.analytics.groupBy({
      by: ["country"],
      where: {
        profileId: profile.id,
        createdAt: { gte: sevenDaysAgo },
        country: { not: null },
      },
      _count: true,
      orderBy: { _count: { country: "desc" } },
      take: 5,
    });

    return NextResponse.json({
      summary: {
        totalVisits: visitsResult,
        totalClicks: clicksResult,
        totalLinks,
        activeLinks,
      },
      topLinks,
      dailyVisits: dailyVisits.map((v: any) => ({
        date: v.date,
        count: Number(v.count),
      })),
      dailyClicks: dailyClicks.map((c: any) => ({
        date: c.date,
        count: Number(c.count),
      })),
      devices: deviceStats.map((d) => ({
        device: d.device || "unknown",
        count: d._count,
      })),
      countries: countryStats.map((c) => ({
        country: c.country,
        count: c._count,
      })),
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Error al obtener analytics" },
      { status: 500 },
    );
  }
}
