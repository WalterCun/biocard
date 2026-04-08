"use client";

import { useState, useEffect } from "react";

interface Theme {
  id: string;
  name: string;
  colors: {
    background: string;
    text: string;
    accent: string;
  };
  font: string;
}

interface ThemeSelectorProps {
  currentTheme: string;
  onSelect: (themeId: string) => void;
}

const themes: Theme[] = [
  {
    id: "light",
    name: "Light",
    colors: { background: "#FFFFFF", text: "#000000", accent: "#6366f1" },
    font: "Inter",
  },
  {
    id: "dark",
    name: "Dark",
    colors: { background: "#1a1a1a", text: "#ffffff", accent: "#6366f1" },
    font: "Inter",
  },
  {
    id: "ocean",
    name: "Ocean",
    colors: { background: "#0a192f", text: "#e6f1ff", accent: "#0066cc" },
    font: "Poppins",
  },
  {
    id: "forest",
    name: "Forest",
    colors: { background: "#1b2a1f", text: "#e8f5e9", accent: "#228B22" },
    font: "Roboto",
  },
  {
    id: "sunset",
    name: "Sunset",
    colors: { background: "#1a1410", text: "#fff5eb", accent: "#FF6B35" },
    font: "Open Sans",
  },
];

export function ThemeSelector({ currentTheme, onSelect }: ThemeSelectorProps) {
  const [selected, setSelected] = useState(currentTheme);

  const handleSelect = (themeId: string) => {
    setSelected(themeId);
    onSelect(themeId);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Seleccionar Tema</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleSelect(theme.id)}
            className={`relative p-4 rounded-lg border-2 transition-all ${
              selected === theme.id
                ? "border-purple-500 shadow-lg"
                : "border-gray-200 hover:border-gray-300"
            }`}
            style={{
              backgroundColor: theme.colors.background,
            }}
          >
            <div className="space-y-2">
              <div
                className="h-8 rounded"
                style={{ backgroundColor: theme.colors.accent }}
              />
              <div
                className="text-sm font-medium"
                style={{ color: theme.colors.text }}
              >
                {theme.name}
              </div>
              <div
                className="text-xs"
                style={{ color: theme.colors.text, opacity: 0.7 }}
              >
                {theme.font}
              </div>
            </div>
            {selected === theme.id && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
