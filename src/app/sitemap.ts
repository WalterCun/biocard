import { MetadataRoute } from "next";
import prisma from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // Dynamic public profiles
  try {
    const profiles = await prisma.profile.findMany({
      where: { isPublic: true },
      select: { username: true, updatedAt: true },
    });

    const profileUrls = profiles.map((profile) => ({
      url: `${baseUrl}/${profile.username}`,
      lastModified: profile.updatedAt,
      changeFrequency: "daily" as const,
      priority: 0.8,
    }));

    return [...staticPages, ...profileUrls];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticPages;
  }
}
