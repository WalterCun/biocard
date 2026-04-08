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

    // Get unique visitors per day for last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const dailyVisitors = await prisma.$queryRaw`
      SELECT DATE(created_at) as date, COUNT(DISTINCT visitor_id) as unique_visitors
      FROM analytics
      WHERE profile_id = ${profile.id}
        AND event_type = 'visit'
        AND created_at >= ${thirtyDaysAgo}
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `;

    // Calculate returning visitors (visitors with more than 1 visit)
    const returningVisitors = await prisma.$queryRaw`
      SELECT visitor_id, COUNT(*) as visit_count
      FROM analytics
      WHERE profile_id = ${profile.id}
        AND event_type = 'visit'
        AND created_at >= ${thirtyDaysAgo}
      GROUP BY visitor_id
      HAVING COUNT(*) > 1
    `;

    // Total unique visitors
    const totalUnique = await prisma.analytics.groupBy({
      by: ["visitorId"],
      where: {
        profileId: profile.id,
        eventType: "visit",
        createdAt: { gte: thirtyDaysAgo },
      },
    });

    // Average visits per visitor
    const totalVisits = await prisma.analytics.count({
      where: {
        profileId: profile.id,
        eventType: "visit",
        createdAt: { gte: thirtyDaysAgo },
      },
    });

    const avgVisitsPerVisitor =
      totalUnique.length > 0
        ? (totalVisits / totalUnique.length).toFixed(2)
        : 0;

    return NextResponse.json({
      dailyVisitors: (dailyVisitors as any[]).map((d: any) => ({
        date: d.date,
        visitors: Number(d.unique_visitors),
      })),
      metrics: {
        totalUniqueVisitors: totalUnique.length,
        returningVisitors: (returningVisitors as any[]).length,
        totalVisits,
        avgVisitsPerVisitor: parseFloat(avgVisitsPerVisitor as string),
      },
    });
  } catch (error) {
    console.error("Error fetching retention:", error);
    return NextResponse.json(
      { error: "Error al obtener métricas de retención" },
      { status: 500 },
    );
  }
}
