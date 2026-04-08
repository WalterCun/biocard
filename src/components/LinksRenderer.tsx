"use client";

import Link from "next/link";
import { EmbedRenderer } from "./EmbedRenderer";

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

interface LinksRendererProps {
  links: Link[];
  styles: {
    card: string;
    cardBorder: string;
    accent: string;
  };
}

const embedTypes = ["youtube", "spotify", "tiktok", "twitter", "instagram"];

export function LinksRenderer({ links, styles }: LinksRendererProps) {
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
      {Object.entries(categories).map(([category, categoryLinks]) => (
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
                            backgroundColor:
                              styles.accent.replace("border-", "") + "33",
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
                    <EmbedRenderer
                      url={link.url}
                      linkType={link.linkType}
                      embedData={link.embedData}
                    />
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
                            backgroundColor:
                              styles.accent.replace("border-", "") + "33",
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
      ))}
    </div>
  );
}
