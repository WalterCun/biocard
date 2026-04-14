"use client";

import { useState } from "react";

interface BackgroundPickerProps {
  currentColor?: string;
  currentImage?: string;
  onColorChange: (color: string) => void;
  onImageChange: (image: string | null) => void;
}

const presetGradients = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
];

const solidColors = [
  "#1a1a2e",
  "#16213e",
  "#0f3460",
  "#533483",
  "#e94560",
  "#2c3e50",
  "#34495e",
  "#7f8c8d",
];

export function BackgroundPicker({
  currentColor,
  currentImage,
  onColorChange,
  onImageChange,
}: BackgroundPickerProps) {
  const [activeTab, setActiveTab] = useState<"color" | "gradient" | "image">("color");
  const [customColor, setCustomColor] = useState(currentColor || "#1a1a2e");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload/background", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      onImageChange(data.url);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("color")}
          className={`px-3 py-1 text-sm rounded ${
            activeTab === "color" ? "bg-primary text-primary-foreground" : "bg-muted"
          }`}
        >
          Color
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("gradient")}
          className={`px-3 py-1 text-sm rounded ${
            activeTab === "gradient" ? "bg-primary text-primary-foreground" : "bg-muted"
          }`}
        >
          Gradient
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("image")}
          className={`px-3 py-1 text-sm rounded ${
            activeTab === "image" ? "bg-primary text-primary-foreground" : "bg-muted"
          }`}
        >
          Image
        </button>
      </div>

      {activeTab === "color" && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {solidColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => onColorChange(color)}
                className={`w-8 h-8 rounded-full border-2 ${
                  currentColor === color ? "border-primary" : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={customColor}
              onChange={(e) => {
                setCustomColor(e.target.value);
                onColorChange(e.target.value);
              }}
              className="w-10 h-10 rounded cursor-pointer"
            />
            <input
              type="text"
              value={customColor}
              onChange={(e) => {
                setCustomColor(e.target.value);
                onColorChange(e.target.value);
              }}
              className="flex-1 px-3 py-2 bg-background border rounded"
              placeholder="#000000"
            />
          </div>
        </div>
      )}

      {activeTab === "gradient" && (
        <div className="flex flex-wrap gap-2">
          {presetGradients.map((gradient, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onColorChange(gradient)}
              className={`w-16 h-10 rounded-lg border-2 ${
                currentColor === gradient ? "border-primary" : "border-transparent"
              }`}
              style={{ background: gradient }}
            />
          ))}
        </div>
      )}

      {activeTab === "image" && (
        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-3 py-2 bg-background border rounded"
          />
          {currentImage && (
            <button
              type="button"
              onClick={() => onImageChange(null)}
              className="text-sm text-destructive"
            >
              Remove image
            </button>
          )}
        </div>
      )}
    </div>
  );
}