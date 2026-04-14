export const linkTypes = [
  {
    id: "link",
    name: "Enlace",
    icon: "🔗",
    description: "Enlace a cualquier sitio web",
    embedSupported: false,
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "▶️",
    description: "Video de YouTube (embed)",
    embedSupported: true,
    urlPattern: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    icon: "🐦",
    description: "Tweet o perfil de X",
    embedSupported: true,
    urlPattern: /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/.+$/,
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "📸",
    description: "Post o reels de Instagram",
    embedSupported: true,
    urlPattern: /^(https?:\/\/)?(www\.)?instagram\.com\/.+$/,
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "🎵",
    description: "Video de TikTok",
    embedSupported: true,
    urlPattern: /^(https?:\/\/)?(www\.)?tiktok\.com\/.+$/,
  },
  {
    id: "spotify",
    name: "Spotify",
    icon: "🎧",
    description: "Canción o playlist de Spotify",
    embedSupported: true,
    urlPattern: /^(https?:\/\/)?(open\.)?spotify\.com\/.+$/,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "💼",
    description: "Perfil o post de LinkedIn",
    embedSupported: false,
    urlPattern: /^(https?:\/\/)?(www\.)?linkedin\.com\/.+$/,
  },
  {
    id: "github",
    name: "GitHub",
    icon: "💻",
    description: "Repositorio o perfil de GitHub",
    embedSupported: false,
    urlPattern: /^(https?:\/\/)?(www\.)?github\.com\/.+$/,
  },
];

export function detectLinkType(url: string): string {
  for (const type of linkTypes) {
    if (type.urlPattern && type.urlPattern.test(url)) {
      return type.id;
    }
  }
  return "link";
}

export function getEmbedData(url: string, linkType: string): any {
  try {
    switch (linkType) {
      case "youtube": {
        const ytMatch = url.match(
          /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        );
        if (ytMatch) {
          return {
            videoId: ytMatch[1],
            platform: "youtube",
            embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}`,
          };
        }
        break;
      }
      case "twitter":
      case "x": {
        return {
          platform: "twitter",
          embedUrl: url
            .replace("twitter.com", "twitter.com intent/tweet")
            .replace("x.com", "x.com intent/tweet"),
        };
      }
      case "spotify": {
        const spMatch = url.match(
          /spotify\.com\/(track|album|playlist|episode|show)\/([a-zA-Z0-9]+)/,
        );
        if (spMatch) {
          return {
            type: spMatch[1],
            id: spMatch[2],
            platform: "spotify",
            embedUrl: `https://open.spotify.com/embed/${spMatch[1]}/${spMatch[2]}`,
          };
        }
        break;
      }
      case "tiktok": {
        const ttMatch = url.match(/tiktok\.com\/@[\w]+\/video\/(\d+)/);
        if (ttMatch) {
          return {
            videoId: ttMatch[1],
            platform: "tiktok",
          };
        }
        break;
      }
    }
  } catch (e) {
    console.error("Error parsing embed data:", e);
  }
  return null;
}