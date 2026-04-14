"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus, Instagram, Youtube, Twitter, Linkedin, Facebook, Github, MessageCircle } from "lucide-react";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

const platformIcons: Record<string, React.ReactNode> = {
  instagram: <Instagram className="w-4 h-4" />,
  youtube: <Youtube className="w-4 h-4" />,
  twitter: <Twitter className="w-4 h-4" />,
  linkedin: <Linkedin className="w-4 h-4" />,
  facebook: <Facebook className="w-4 h-4" />,
  github: <Github className="w-4 h-4" />,
  whatsapp: <MessageCircle className="w-4 h-4" />,
  tiktok: <span>Tk</span>,
  snapchat: <span>Sc</span>,
  discord: <span>Dc</span>,
};

const platforms = [
  { value: "instagram", label: "Instagram" },
  { value: "twitter", label: "Twitter / X" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "snapchat", label: "Snapchat" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "github", label: "GitHub" },
  { value: "discord", label: "Discord" },
];

export function SocialLinksEditor() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newPlatform, setNewPlatform] = useState("");
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const res = await fetch("/api/social-links");
      if (res.ok) {
        const data = await res.json();
        setLinks(data);
      }
    } catch (error) {
      console.error("Error fetching links:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newPlatform || !newUrl) return;

    setSaving(true);
    try {
      const res = await fetch("/api/social-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform: newPlatform, url: newUrl }),
      });

      if (res.ok) {
        const newLink = await res.json();
        setLinks([...links.filter((l) => l.platform !== newPlatform), newLink]);
        setNewPlatform("");
        setNewUrl("");
      }
    } catch (error) {
      console.error("Error adding link:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/social-links/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLinks(links.filter((l) => l.id !== id));
      }
    } catch (error) {
      console.error("Error deleting link:", error);
    } finally {
      setSaving(false);
    }
  };

  const availablePlatforms = platforms.filter(
    (p) => !links.some((l) => l.platform === p.value)
  );

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enlaces Sociales</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Existing links */}
        {links.map((link) => (
          <div
            key={link.id}
            className="flex items-center justify-between p-3 bg-muted rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
                {platformIcons[link.platform] || <span>{link.platform[0]}</span>}
              </div>
              <div>
                <span className="font-medium capitalize">{link.platform}</span>
                <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                  {link.url}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(link.id)}
              disabled={saving}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        ))}

        {/* Add new link */}
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <Select
              value={newPlatform}
              onValueChange={setNewPlatform}
              disabled={saving}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar plataforma" />
              </SelectTrigger>
              <SelectContent>
                {availablePlatforms.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Input
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://..."
              disabled={saving || !newPlatform}
            />
          </div>
          <Button
            onClick={handleAdd}
            disabled={saving || !newPlatform || !newUrl}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}