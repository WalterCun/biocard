import { NextResponse } from "next/server";
import { linkTypes } from "@/lib/link-types";

export async function GET() {
  const types = linkTypes.map(({ urlPattern, ...type }) => type);
  return NextResponse.json(types);
}