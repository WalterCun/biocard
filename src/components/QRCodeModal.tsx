"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Share2, QrCode } from "lucide-react";

interface QRCodeModalProps {
  username: string;
  isOpen: boolean;
  onClose: () => void;
}

export function QRCodeModal({ username, isOpen, onClose }: QRCodeModalProps) {
  const [qrData, setQrData] = useState<{
    qrCodeUrl: string;
    profileUrl: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && username) {
      fetchQRCode();
    }
  }, [isOpen, username]);

  const fetchQRCode = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/profiles/${username}/qr`);
      if (!res.ok) throw new Error("Error generando QR");
      const data = await res.json();
      setQrData(data);
    } catch (err) {
      setError("Error al generar código QR");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            Código QR
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 py-8">{error}</p>
        ) : qrData ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <img
                src={qrData.qrCodeUrl}
                alt="QR Code"
                className="w-64 h-64 border rounded-lg"
              />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Escanea el código o visita:
            </p>
            <p className="text-center font-medium break-all">
              {qrData.profileUrl}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => window.open(qrData.profileUrl, "_blank")}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = qrData.qrCodeUrl;
                  link.download = `${username}-qr.png`;
                  link.click();
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
