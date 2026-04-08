import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { ProfileLinks } from "@/components/ProfileLinks";

interface Props {
  params: Promise<{ username: string }>;
}

const themeStyles: Record<
  string,
  { bg: string; text: string; accent: string; card: string; cardBorder: string }
> = {
  light: {
    bg: "from-gray-100 to-gray-200",
    text: "text-gray-900",
    accent: "border-indigo-500",
    card: "bg-white/80",
    cardBorder: "border-gray-200",
  },
  dark: {
    bg: "from-gray-900 to-gray-800",
    text: "text-white",
    accent: "border-purple-500",
    card: "bg-gray-800/50",
    cardBorder: "border-gray-700",
  },
  ocean: {
    bg: "from-[#0a192f] to-[#112240]",
    text: "text-[#e6f1ff]",
    accent: "border-[#0066cc]",
    card: "bg-[#112240]/50",
    cardBorder: "border-[#233554]",
  },
  forest: {
    bg: "from-[#1b2a1f] to-[#2d4a3e]",
    text: "text-[#e8f5e9]",
    accent: "border-[#228B22]",
    card: "bg-[#2d4a3e]/50",
    cardBorder: "border-[#3d5a4e]",
  },
  sunset: {
    bg: "from-[#1a1410] to-[#2d1f1a]",
    text: "text-[#fff5eb]",
    accent: "border-[#FF6B35]",
    card: "bg-[#2d1f1a]/50",
    cardBorder: "border-[#3d2f2a]",
  },
};

function getStyles(theme: string) {
  return themeStyles[theme] || themeStyles.dark;
}

async function getProfileAndLinks(username: string) {
  const profile = await prisma.profile.findUnique({
    where: { username, isPublic: true },
    include: {
      links: {
        where: { isActive: true },
        orderBy: [{ isPinned: "desc" }, { position: "asc" }],
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

  const styles = getStyles(profile.theme);
  const bgStyle = profile.backgroundImage
    ? {
        backgroundImage: `url(${profile.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

  // Categorías de links
  const categories = profile.links.reduce(
    (acc, link) => {
      const cat = link.category || "other";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(link);
      return acc;
    },
    {} as Record<string, typeof profile.links>,
  );

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${styles.bg} ${styles.text}`}
      style={bgStyle}
    >
      {/* Header */}
      <div className="container mx-auto px-4 py-12 text-center">
        {profile.avatar ? (
          <img
            src={profile.avatar}
            alt={profile.username}
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 object-cover"
            style={{ borderColor: styles.accent.replace("border-", "") }}
          />
        ) : (
          <div
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 flex items-center justify-center text-3xl font-bold"
            style={{
              borderColor: styles.accent.replace("border-", ""),
              backgroundColor: "rgba(128,128,128,0.2)",
            }}
          >
            {profile.username[0]?.toUpperCase()}
          </div>
        )}
        <h1 className="text-3xl font-bold mb-2">
          {profile.displayName || profile.username}
        </h1>
        {profile.bio && (
          <p className="opacity-80 max-w-md mx-auto mb-6">{profile.bio}</p>
        )}
      </div>

      {/* Links */}
      <div className="container mx-auto px-4 max-w-md">
        <ProfileLinks links={profile.links} theme={profile.theme} />
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 py-12 text-center opacity-50 text-sm">
        <p>Powered by BioCard</p>
      </div>
    </div>
  );
}
