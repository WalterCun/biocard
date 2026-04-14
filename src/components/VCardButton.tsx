"use client";

import { Button } from "@/components/ui/button";
import { Download, Contact } from "lucide-react";

interface VCardButtonProps {
  username: string;
}

export function VCardButton({ username }: VCardButtonProps) {
  const handleDownload = () => {
    window.open(`/api/profiles/${username}/vcard`, "_blank");
  };

  return (
    <Button variant="outline" onClick={handleDownload}>
      <Download className="w-4 h-4 mr-2" />
      Descargar Contacto
    </Button>
  );
}
