import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  const checks = {
    timestamp: new Date().toISOString(),
    status: "ok",
    services: {
      database: "checking",
    },
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.services.database = "ok";
  } catch (error) {
    checks.services.database = "error";
    checks.status = "degraded";
  }

  const statusCode = checks.status === "ok" ? 200 : 503;
  return NextResponse.json(checks, { status: statusCode });
}
