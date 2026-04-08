"use client";

interface Link {
  id: string;
  title: string;
  url: string;
  linkType: string;
  embedData: any;
  icon: string | null;
  thumbnail: string | null;
  category: string | null;
  isPinned: boolean;
}

interface ProfileLinksProps {
  links: Link[];
  theme: string;
}

const themeStyles: Record<
  string,
  { card: string; cardBorder: string; accent: string }
> = {
  light: {
    card: "bg-white/80",
    cardBorder: "border-gray-200",
    accent: "#6366f1",
  },
  dark: {
    card: "bg-gray-800/50",
    cardBorder: "border-gray-700",
    accent: "#6366f1",
  },
  ocean: {
    card: "bg-[#112240]/50",
    cardBorder: "border-[#233554]",
    accent: "#0066cc",
  },
  forest: {
    card: "bg-[#2d4a3e]/50",
    cardBorder: "border-[#3d5a4e]",
    accent: "#228B22",
  },
  sunset: {
    card: "bg-[#2d1f1a]/50",
    cardBorder: "border-[#3d2f2a]",
    accent: "#FF6B35",
  },
};

export function ProfileLinks({ links, theme }: ProfileLinksProps) {
  const styles = themeStyles[theme] || themeStyles.dark;
  const embedTypes = ["youtube", "spotify", "tiktok", "twitter", "instagram"];

  const categories = links.reduce(
    (acc, link) => {
      const cat = link.category || "other";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(link);
      return acc;
    },
    {} as Record<string, Link[]>,
  );

  return (
    <div className="space-y-4">
      {links.length === 0 ? (
        <p className="text-center opacity-60">No hay enlaces todavía</p>
      ) : (
        Object.entries(categories).map(([category, categoryLinks]) => (
          <div key={category} className="space-y-3">
            {categoryLinks.map((link) => {
              const isEmbed = embedTypes.includes(link.linkType);

              return (
                <div key={link.id}>
                  {isEmbed && link.embedData?.embedUrl ? (
                    <div
                      className={`p-4 ${styles.card} rounded-xl border ${styles.cardBorder}`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        {link.thumbnail ? (
                          <img
                            src={link.thumbnail}
                            alt={link.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        ) : link.icon ? (
                          <span className="text-xl">{link.icon}</span>
                        ) : (
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{
                              backgroundColor: styles.accent + "33",
                            }}
                          >
                            🔗
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold">{link.title}</h3>
                        </div>
                        {link.isPinned && <span>📌</span>}
                      </div>
                      {link.linkType === "youtube" && (
                        <div className="w-full aspect-video rounded-lg overflow-hidden">
                          <iframe
                            src={link.embedData.embedUrl}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      )}
                      {link.linkType === "spotify" && (
                        <div className="w-full rounded-lg overflow-hidden">
                          <iframe
                            src={link.embedData.embedUrl}
                            className="w-full h-[152px]"
                            style={{ borderRadius: "12px" }}
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block p-4 ${styles.card} hover:opacity-90 rounded-xl transition-all hover:scale-[1.02] border ${styles.cardBorder}`}
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
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center"
                            style={{
                              backgroundColor: styles.accent + "33",
                            }}
                          >
                            🔗
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold">{link.title}</h3>
                          {link.category && (
                            <span className="text-xs opacity-60 uppercase">
                              {link.category}
                            </span>
                          )}
                        </div>
                        {link.isPinned && <span>📌</span>}
                      </div>
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        ))
      )}
    </div>
  );
}
