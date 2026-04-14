"use client";

import { useState, useEffect } from "react";
import { X, Smartphone, Tablet, Monitor } from "lucide-react";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: {
    username: string;
    displayName?: string;
    bio?: string;
    avatar?: string;
    theme: string;
    backgroundColor: string;
    backgroundImage?: string;
    font: string;
  };
  links?: Array<{
    id: string;
    title: string;
    url: string;
    icon?: string;
  }>;
}

const themeStyles: Record<string, { bg: string; text: string; accent: string }> = {
  light: { bg: "#FFFFFF", text: "#000000", accent: "#6366f1" },
  dark: { bg: "#1a1a1a", text: "#ffffff", accent: "#6366f1" },
  ocean: { bg: "#0a192f", text: "#e6f1ff", accent: "#0066cc" },
  forest: { bg: "#1b2a1f", text: "#e8f5e9", accent: "#228B22" },
  sunset: { bg: "#1a1410", text: "#fff5eb", accent: "#FF6B35" },
};

export function PreviewModal({ isOpen, onClose, profile, links = [] }: PreviewModalProps) {
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">("mobile");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const theme = themeStyles[profile.theme] || themeStyles.dark;
  const bgStyle = profile.backgroundImage
    ? { backgroundImage: `url(${profile.backgroundImage})`, backgroundSize: "cover" }
    : { backgroundColor: profile.backgroundColor };

  const deviceWidths = {
    mobile: "w-[375px]",
    tablet: "w-[768px]",
    desktop: "w-[1024px]",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-background rounded-full z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Device selector */}
        <div className="flex gap-2 mb-4 bg-background p-2 rounded-lg z-10">
          <button
            onClick={() => setDevice("mobile")}
            className={`p-2 rounded ${device === "mobile" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDevice("tablet")}
            className={`p-2 rounded ${device === "tablet" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDevice("desktop")}
            className={`p-2 rounded ${device === "desktop" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          >
            <Monitor className="w-4 h-4" />
          </button>
        </div>

        {/* Preview frame */}
        <div
          className={`${deviceWidths[device]} h-[80%] rounded-xl overflow-hidden shadow-2xl transition-all`}
          style={{
            fontFamily: profile.font || "Inter",
          }}
        >
          <div
            className="w-full h-full overflow-y-auto p-6 flex flex-col items-center"
            style={{
              ...bgStyle,
              color: theme.text,
            }}
          >
            {/* Avatar */}
            {profile.avatar && (
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white/20">
                <img src={profile.avatar} alt={profile.displayName || profile.username} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Display Name */}
            <h1 className="text-2xl font-bold mb-2">
              {profile.displayName || `@${profile.username}`}
            </h1>

            {/* Bio */}
            {profile.bio && <p className="text-center mb-6 opacity-80">{profile.bio}</p>}

            {/* Links */}
            <div className="w-full max-w-md space-y-3">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full p-4 rounded-lg text-center font-medium transition-transform hover:scale-[1.02]"
                  style={{
                    backgroundColor: theme.accent,
                    color: theme.bg,
                  }}
                >
                  {link.icon && <span className="mr-2">{link.icon}</span>}
                  {link.title}
                </a>
              ))}
              {links.length === 0 && (
                <p className="text-center opacity-50">No links yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}