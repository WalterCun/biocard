"use client";

interface EmbedData {
  videoId?: string;
  platform?: string;
  embedUrl?: string;
  type?: string;
  id?: string;
}

interface EmbedRendererProps {
  url: string;
  linkType: string;
  embedData?: EmbedData | null;
}

export function EmbedRenderer({
  url,
  linkType,
  embedData,
}: EmbedRendererProps) {
  if (!embedData?.embedUrl) return null;

  switch (linkType) {
    case "youtube":
      return (
        <div className="w-full aspect-video rounded-lg overflow-hidden">
          <iframe
            src={embedData.embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );

    case "spotify":
      return (
        <div className="w-full rounded-lg overflow-hidden">
          <iframe
            src={embedData.embedUrl}
            className="w-full h-[152px]"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            style={{ borderRadius: "12px" }}
          />
        </div>
      );

    case "twitter":
      return (
        <div className="w-full rounded-lg overflow-hidden bg-white/5">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 text-center text-sm text-muted-foreground hover:underline"
          >
            Ver tweet →
          </a>
        </div>
      );

    default:
      return null;
  }
}
