"use client";

import { useState, useEffect } from "react";

interface EmbedData {
  videoId?: string;
  platform?: string;
  embedUrl?: string;
  type?: string;
  id?: string;
}

interface LinkEmbedPreviewProps {
  url: string;
  linkType: string;
}

export function LinkEmbedPreview({ url, linkType }: LinkEmbedPreviewProps) {
  const [embedData, setEmbedData] = useState<EmbedData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (url && isEmbedType(linkType)) {
      generateEmbedPreview();
    } else {
      setEmbedData(null);
    }
  }, [url, linkType]);

  const isEmbedType = (type: string) => {
    return ["youtube", "twitter", "instagram", "tiktok", "spotify"].includes(
      type,
    );
  };

  const generateEmbedPreview = () => {
    setLoading(true);
    try {
      let data: EmbedData | null = null;

      if (linkType === "youtube") {
        const match = url.match(
          /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        );
        if (match) {
          data = {
            videoId: match[1],
            platform: "youtube",
            embedUrl: `https://www.youtube.com/embed/${match[1]}`,
          };
        }
      } else if (linkType === "spotify") {
        const match = url.match(
          /spotify\.com\/(track|album|playlist|episode|show)\/([a-zA-Z0-9]+)/,
        );
        if (match) {
          data = {
            type: match[1],
            id: match[2],
            platform: "spotify",
            embedUrl: `https://open.spotify.com/embed/${match[1]}/${match[2]}`,
          };
        }
      }

      setEmbedData(data);
    } catch (e) {
      console.error("Error generating preview:", e);
    } finally {
      setLoading(false);
    }
  };

  if (!url || !isEmbedType(linkType)) return null;

  return (
    <div className="mt-3 rounded-lg overflow-hidden border bg-muted/30">
      {loading ? (
        <div className="aspect-video flex items-center justify-center text-muted-foreground">
          Generando preview...
        </div>
      ) : embedData?.embedUrl ? (
        <iframe
          src={embedData.embedUrl}
          className="w-full aspect-video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="aspect-video flex items-center justify-center text-muted-foreground text-sm">
          Preview no disponible
        </div>
      )}
    </div>
  );
}
