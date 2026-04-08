import { Metadata } from "next";
import prisma from "@/lib/db";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateStaticParams() {
  const profiles = await prisma.profile.findMany({
    select: { username: true },
    where: { username: { not: null } },
  });

  return profiles.map((profile) => ({
    username: profile.username,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;

  const profile = await prisma.profile.findUnique({
    where: { username, isPublic: true },
    select: {
      displayName: true,
      bio: true,
      avatar: true,
      username: true,
    },
  });

  if (!profile) {
    return {
      title: "Usuario no encontrado - BioCard",
    };
  }

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const profileUrl = `${baseUrl}/${username}`;

  return {
    title: `${profile.displayName || profile.username} | BioCard`,
    description:
      profile.bio || `Visita el perfil de ${profile.username} en BioCard`,
    openGraph: {
      title: `${profile.displayName || profile.username} | BioCard`,
      description: profile.bio || `Perfil público de ${profile.username}`,
      images: profile.avatar ? [profile.avatar] : [],
      url: profileUrl,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.displayName || profile.username} | BioCard`,
      description: profile.bio || `Perfil público de ${profile.username}`,
      images: profile.avatar ? [profile.avatar] : [],
    },
    alternates: {
      canonical: profileUrl,
    },
  };
}
