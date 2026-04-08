"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Profile {
  id: string;
  username: string;
  displayName: string | null;
  bio: string | null;
  avatar: string | null;
  theme: string;
  backgroundColor: string;
  backgroundImage: string | null;
  font: string;
  isPublic: boolean;
}

interface ProfileEditorProps {
  profile: Profile;
  onSave: (data: Partial<Profile>) => Promise<void>;
}

export function ProfileEditor({ profile, onSave }: ProfileEditorProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Profile>>({
    username: profile.username,
    displayName: profile.displayName || "",
    bio: profile.bio || "",
    avatar: profile.avatar || "",
    theme: profile.theme,
    backgroundColor: profile.backgroundColor,
    backgroundImage: profile.backgroundImage || "",
    font: profile.font,
    isPublic: profile.isPublic,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Información del Perfil</CardTitle>
          <CardDescription>
            Actualiza tu información personal y nombre de usuario
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="tuusername"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="displayName">Nombre a mostrar</Label>
            <Input
              id="displayName"
              value={formData.displayName}
              onChange={(e) =>
                setFormData({ ...formData, displayName: e.target.value })
              }
              placeholder="Tu Nombre"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="bio">Biografía</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              placeholder="Cuéntanos sobre ti..."
              rows={4}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="avatar">URL de Avatar</Label>
            <Input
              id="avatar"
              value={formData.avatar}
              onChange={(e) =>
                setFormData({ ...formData, avatar: e.target.value })
              }
              placeholder="https://..."
            />
            {formData.avatar && (
              <div className="mt-2">
                <img
                  src={formData.avatar}
                  alt="Avatar preview"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Apariencia</CardTitle>
          <CardDescription>
            Personaliza cómo se ve tu perfil público
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="theme">Tema</Label>
            <select
              id="theme"
              value={formData.theme}
              onChange={(e) =>
                setFormData({ ...formData, theme: e.target.value })
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="ocean">Ocean</option>
              <option value="forest">Forest</option>
              <option value="sunset">Sunset</option>
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="backgroundColor">Color de fondo</Label>
            <div className="flex gap-2">
              <Input
                id="backgroundColor"
                type="color"
                value={formData.backgroundColor}
                onChange={(e) =>
                  setFormData({ ...formData, backgroundColor: e.target.value })
                }
                className="w-16 h-10"
              />
              <Input
                value={formData.backgroundColor}
                onChange={(e) =>
                  setFormData({ ...formData, backgroundColor: e.target.value })
                }
                placeholder="#1a1a2e"
                className="flex-1"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="font">Fuente</Label>
            <select
              id="font"
              value={formData.font}
              onChange={(e) =>
                setFormData({ ...formData, font: e.target.value })
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            >
              <option value="inter">Inter</option>
              <option value="poppins">Poppins</option>
              <option value="roboto">Roboto</option>
              <option value="open-sans">Open Sans</option>
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="backgroundImage">Imagen de fondo (URL)</Label>
            <Input
              id="backgroundImage"
              value={formData.backgroundImage}
              onChange={(e) =>
                setFormData({ ...formData, backgroundImage: e.target.value })
              }
              placeholder="https://..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Privacidad</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <input
              id="isPublic"
              type="checkbox"
              checked={formData.isPublic}
              onChange={(e) =>
                setFormData({ ...formData, isPublic: e.target.checked })
              }
              className="w-4 h-4"
            />
            <Label htmlFor="isPublic" className="font-normal">
              Perfil público
            </Label>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar cambios"}
      </Button>
    </form>
  );
}
