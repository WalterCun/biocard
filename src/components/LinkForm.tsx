"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LinkTypeSelector } from "./LinkTypeSelector";
import { LinkEmbedPreview } from "./LinkEmbedPreview";

interface LinkFormProps {
  link?: {
    id: string;
    title: string;
    url: string;
    linkType?: string;
    embedData?: any;
    icon?: string;
    thumbnail?: string;
    category?: string;
    isFeatured?: boolean;
    isPinned?: boolean;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

const CATEGORIES = [
  { value: "social", label: "Social" },
  { value: "portfolio", label: "Portfolio" },
  { value: "shop", label: "Tienda" },
  { value: "contact", label: "Contacto" },
  { value: "other", label: "Otro" },
];

export default function LinkForm({ link, onSuccess, onCancel }: LinkFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: link?.title || "",
    url: link?.url || "",
    linkType: link?.linkType || "link",
    icon: link?.icon || "",
    thumbnail: link?.thumbnail || "",
    category: link?.category || "other",
    isFeatured: link?.isFeatured || false,
    isPinned: link?.isPinned || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = link ? "PUT" : "POST";
      const url = link ? `/api/links/${link.id}` : "/api/links";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error saving link");

      onSuccess();
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Tipo de enlace</label>
        <LinkTypeSelector
          value={formData.linkType}
          onChange={(type) => setFormData({ ...formData, linkType: type })}
        />
      </div>

      {["youtube", "spotify", "tiktok", "twitter", "instagram"].includes(
        formData.linkType,
      ) && <LinkEmbedPreview url={formData.url} linkType={formData.linkType} />}

      <div>
        <label className="block text-sm font-medium mb-1">Título</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 rounded border bg-gray-800 border-gray-700 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">URL</label>
        <input
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          className="w-full p-2 rounded border bg-gray-800 border-gray-700 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Categoría</label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full p-2 rounded border bg-gray-800 border-gray-700 text-white"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Icono (emoji)</label>
        <input
          type="text"
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          className="w-full p-2 rounded border bg-gray-800 border-gray-700 text-white"
          placeholder="🔗"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Thumbnail URL</label>
        <input
          type="url"
          value={formData.thumbnail}
          onChange={(e) =>
            setFormData({ ...formData, thumbnail: e.target.value })
          }
          className="w-full p-2 rounded border bg-gray-800 border-gray-700 text-white"
        />
      </div>

      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) =>
              setFormData({ ...formData, isFeatured: e.target.checked })
            }
          />
          Destacado
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isPinned}
            onChange={(e) =>
              setFormData({ ...formData, isPinned: e.target.checked })
            }
          />
          Fijar
        </label>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Guardando..." : link ? "Actualizar" : "Crear"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
