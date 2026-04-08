import { NextResponse } from "next/server";

const themes = [
  {
    id: "light",
    name: "Light",
    colors: { background: "#FFFFFF", text: "#000000", accent: "#6366f1" },
    font: "Inter",
  },
  {
    id: "dark",
    name: "Dark",
    colors: { background: "#1a1a1a", text: "#ffffff", accent: "#6366f1" },
    font: "Inter",
  },
  {
    id: "ocean",
    name: "Ocean",
    colors: { background: "#0a192f", text: "#e6f1ff", accent: "#0066cc" },
    font: "Poppins",
  },
  {
    id: "forest",
    name: "Forest",
    colors: { background: "#1b2a1f", text: "#e8f5e9", accent: "#228B22" },
    font: "Roboto",
  },
  {
    id: "sunset",
    name: "Sunset",
    colors: { background: "#1a1410", text: "#fff5eb", accent: "#FF6B35" },
    font: "Open Sans",
  },
];

export async function GET() {
  return NextResponse.json(themes);
}
