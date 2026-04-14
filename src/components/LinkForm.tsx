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
    password?: string | null;
    scheduleStart?: Date | null;
    scheduleEnd?: Date | null;
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
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    title: link?.title || "",
    url: link?.url || "",
    linkType: link?.linkType || "link",
    icon: link?.icon || "",
    thumbnail: link?.thumbnail || "",
    category: link?.category || "other",
    isFeatured: link?.isFeatured || false,
    isPinned: link?.isPinned || false,
    password: "",
    scheduleStart: link?.scheduleStart ? new Date(link.scheduleStart).toISOString().slice(0, 16) : "",
    scheduleEnd: link?.scheduleEnd ? new Date(link.scheduleEnd).toISOString().slice(0, 16) : "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: any = { ...formData };
      if (!formData.password) delete payload.password;
      if (!formData.scheduleStart) delete payload.scheduleStart;
      if (!formData.scheduleEnd) delete payload.scheduleEnd;
      
      // Parse dates
      if (payload.scheduleStart) payload.scheduleStart = new Date(payload.scheduleStart);
      if (payload.scheduleEnd) payload.scheduleEnd = new Date(payload.scheduleEnd);

      const method = link ? "PUT" : "POST";
      const url = link ? `/api/links/${link.id}` : "/api/links";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error saving link");

      // Set password if provided
      if (formData.password && link) {
        await fetch(`/api/links/${link.id}/password`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: formData.password }),
        });
      }

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

      {/* Advanced options */}
      <div className="border-t pt-4 mt-4">
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          {showPassword ? "▼ Ocultar opciones avanzadas" : "▶ Mostrar opciones avanzadas"}
        </button>

        {showPassword && (
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">Password (protegido)</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-2 rounded border bg-gray-800 border-gray-700 text-white"
                placeholder="Dejar vacío para quitar protección"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Inicio programado</label>
                <input
                  type="datetime-local"
                  value={formData.scheduleStart}
                  onChange={(e) => setFormData({ ...formData, scheduleStart: e.target.value })}
                  className="w-full p-2 rounded border bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Fin programado</label>
                <input
                  type="datetime-local"
                  value={formData.scheduleEnd}
                  onChange={(e) => setFormData({ ...formData, scheduleEnd: e.target.value })}
                  className="w-full p-2 rounded border bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
          </div>
        )}
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