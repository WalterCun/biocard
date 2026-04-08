"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LinkType {
  id: string;
  name: string;
  icon: string;
  description: string;
  embedSupported: boolean;
}

interface LinkTypeSelectorProps {
  value: string;
  onChange: (type: string) => void;
}

export function LinkTypeSelector({ value, onChange }: LinkTypeSelectorProps) {
  const [types, setTypes] = useState<LinkType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    try {
      const res = await fetch("/api/links/types");
      if (res.ok) {
        const data = await res.json();
        setTypes(data);
      }
    } catch (error) {
      console.error("Error fetching link types:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-sm text-muted-foreground">Cargando tipos...</div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {types.map((type) => (
        <button
          key={type.id}
          type="button"
          onClick={() => onChange(type.id)}
          className={cn(
            "flex items-center gap-2 p-3 rounded-lg border text-left transition-all",
            value === type.id
              ? "border-primary bg-primary/10 ring-1 ring-primary"
              : "border-border hover:border-primary/50 hover:bg-muted",
          )}
        >
          <span className="text-lg">{type.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{type.name}</p>
            {type.embedSupported && (
              <p className="text-xs text-muted-foreground">Embed</p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
