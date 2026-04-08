"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QRCodeModal } from "@/components/QRCodeModal";
import { vCardButton } from "@/components/vCardButton";
import { Download, Share2, QrCode, Contact } from "lucide-react";

interface ShareButtonsProps {
  username: string;
}

export function ShareButtons({ username }: ShareButtonsProps) {
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Compartir Perfil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Comparte tu perfil público con otros usando estas opciones:
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => setShowQR(true)}
              className="flex-1"
            >
              <QrCode className="w-4 h-4 mr-2" />
              Código QR
            </Button>

            <vCardButton username={username} />
          </div>

          <div className="pt-2">
            <p className="text-xs text-muted-foreground mb-1">URL directa:</p>
            <code className="text-xs bg-muted p-2 rounded block overflow-x-auto">
              {typeof window !== "undefined" ? window.location.origin : ""}/
              {username}
            </code>
          </div>
        </CardContent>
      </Card>

      <QRCodeModal
        username={username}
        isOpen={showQR}
        onClose={() => setShowQR(false)}
      />
    </>
  );
}
