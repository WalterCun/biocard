"use client";

import Link from "next/link";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

interface SocialLinksProps {
  links: SocialLink[];
  theme: string;
}

const platformIcons: Record<string, { icon: string; bg: string }> = {
  instagram: { icon: "📷", bg: "bg-pink-500" },
  twitter: { icon: "𝕏", bg: "bg-black" },
  youtube: { icon: "▶️", bg: "bg-red-500" },
  tiktok: { icon: "🎵", bg: "bg-black" },
  facebook: { icon: "f", bg: "bg-blue-600" },
  linkedin: { icon: "in", bg: "bg-blue-700" },
  snapchat: { icon: "👻", bg: "bg-yellow-400" },
  whatsapp: { icon: "💬", bg: "bg-green-500" },
  github: { icon: "🐙", bg: "bg-gray-800" },
  discord: { icon: "🎮", bg: "bg-indigo-600" },
};

export function SocialLinks({ links, theme }: SocialLinksProps) {
  const iconColor = theme === "light" ? "text-gray-900" : "text-white";

  return (
    <div className="flex justify-center gap-3 flex-wrap">
      {links.map((link) => {
        const platformInfo = platformIcons[link.platform];
        return (
          <Link
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg hover:scale-110 transition-transform ${iconColor}`}
            style={{
              backgroundColor: "rgba(128,128,128,0.2)",
            }}
            title={link.platform}
          >
            {platformInfo?.icon || link.platform[0].toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}