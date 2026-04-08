import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import Link from 'next/link';

interface Props {
  params: Promise<{ username: string }>;
}

async function getProfileAndLinks(username: string) {
  const profile = await prisma.profile.findUnique({
    where: { username },
    include: {
      links: {
        orderBy: [
          { isPinned: 'desc' },
          { position: 'asc' },
        ],
      },
    },
  });

  return profile;
}

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params;
  
  const profile = await getProfileAndLinks(username);

  if (!profile) {
    notFound();
  }

  // Categorías de links
  const categories = profile.links.reduce((acc, link) => {
    const cat = link.category || 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(link);
    return acc;
  }, {} as Record<string, typeof profile.links>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-12 text-center">
        {profile.avatar && (
          <img
            src={profile.avatar}
            alt={profile.username}
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-purple-500"
          />
        )}
        <h1 className="text-3xl font-bold mb-2">{profile.displayName || profile.username}</h1>
        {profile.bio && (
          <p className="text-gray-300 max-w-md mx-auto mb-6">{profile.bio}</p>
        )}
      </div>

      {/* Links */}
      <div className="container mx-auto px-4 max-w-md">
        {profile.links.length === 0 ? (
          <p className="text-center text-gray-400">No hay enlaces todavía</p>
        ) : (
          <div className="space-y-4">
            {Object.entries(categories).map(([category, links]) => (
              <div key={category} className="space-y-3">
                {links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-all hover:scale-[1.02] border border-gray-700 hover:border-purple-500"
                  >
                    <div className="flex items-center gap-4">
                      {link.thumbnail ? (
                        <img
                          src={link.thumbnail}
                          alt={link.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : link.icon ? (
                        <span className="text-2xl">{link.icon}</span>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                          🔗
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold">{link.title}</h3>
                        {link.category && (
                          <span className="text-xs text-gray-400 uppercase">
                            {link.category}
                          </span>
                        )}
                      </div>
                      {link.isPinned && <span className="text-yellow-400">📌</span>}
                    </div>
                  </a>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 py-12 text-center text-gray-500 text-sm">
        <p>Powered by BioCard</p>
      </div>
    </div>
  );
}