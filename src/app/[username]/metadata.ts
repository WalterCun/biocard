import { Metadata } from 'next';
import prisma from '@/lib/db';

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
    where: { username },
  });

  if (!profile) {
    return {
      title: 'Usuario no encontrado - BioCard',
    };
  }

  return {
    title: `${profile.displayName || profile.username} - BioCard`,
    description: profile.bio || `Ver los enlaces de ${profile.username}`,
    openGraph: {
      title: `${profile.displayName || profile.username} - BioCard`,
      description: profile.bio || `Ver los enlaces de ${profile.username}`,
      images: profile.avatar ? [profile.avatar] : [],
    },
  };
}