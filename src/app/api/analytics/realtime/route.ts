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

    // Last 5 minutes visitors (simulated - real implementation needs Redis or similar)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const recentVisitors = await prisma.analytics.groupBy({
      by: ["visitorId", "country", "city", "device"],
      where: {
        profileId: profile.id,
        createdAt: { gte: fiveMinutesAgo },
      },
      _count: true,
    });

    // Today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayVisits = await prisma.analytics.count({
      where: {
        profileId: profile.id,
        eventType: "visit",
        createdAt: { gte: today },
      },
    });

    const todayClicks = await prisma.analytics.count({
      where: {
        profileId: profile.id,
        eventType: "click",
        createdAt: { gte: today },
      },
    });

    return NextResponse.json({
      activeVisitors: recentVisitors.length,
      todayVisits,
      todayClicks,
      recentVisitors: recentVisitors.slice(0, 10).map((v) => ({
        visitorId: v.visitorId || "anonymous",
        country: v.country || "Unknown",
        city: v.city || "Unknown",
        device: v.device || "desktop",
        pageViews: v._count,
      })),
    });
  } catch (error) {
    console.error("Error fetching realtime:", error);
    return NextResponse.json(
      { error: "Error al obtener datos en tiempo real" },
      { status: 500 },
    );
  }
}
