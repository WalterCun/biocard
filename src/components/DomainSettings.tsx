"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Globe, CheckCircle, XCircle, AlertTriangle, RefreshCw } from "lucide-react";

interface DomainConfig {
  customDomain: string | null;
  domainVerified: boolean;
}

export function DomainSettings() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [config, setConfig] = useState<DomainConfig | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetchDomain();
  }, []);

  const fetchDomain = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/profiles/me/domain");
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
        if (data.customDomain) {
          setDomain(data.customDomain);
        }
      }
    } catch (error) {
      console.error("Error fetching domain:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/profiles/me/domain", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customDomain: domain }),
      });
      const data = await res.json();
      if (res.ok) {
        setConfig({ customDomain: domain, domainVerified: false });
        setMessage({
          type: "success",
          text: data.message || "Dominio configurado",
        });
      } else {
        setMessage({
          type: "error",
          text: data.error || "Error configurando dominio",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error de conexión" });
    } finally {
      setSaving(false);
    }
  };

  const handleVerify = async () => {
    setVerifying(true);
    setMessage(null);
    try {
      const res = await fetch("/api/profiles/verify-domain", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok && data.verified) {
        setConfig({ ...config!, domainVerified: true });
        setMessage({
          type: "success",
          text: data.message || "Dominio verificado",
        });
      } else {
        setMessage({
          type: "error",
          text: data.message || "Verificación fallida",
        });
      }
      await fetchDomain();
    } catch (error) {
      setMessage({ type: "error", text: "Error de conexión" });
    } finally {
      setVerifying(false);
    }
  };

  const handleRemove = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/profiles/me/domain", { method: "DELETE" });
      if (res.ok) {
        setConfig({ customDomain: null, domainVerified: false });
        setDomain("");
        setMessage({ type: "success", text: "Dominio eliminado" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error eliminando dominio" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Dominio Personalizado
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {config?.customDomain ? (
          <>
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <span className="font-mono">{config.customDomain}</span>
              {config.domainVerified ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
              )}
            </div>

            {!config.domainVerified && (
              <Alert>
                <AlertTriangle className="w-4 h-4" />
                <AlertDescription>
                  Configura un registro CNAME en tu proveedor DNS apuntando a{" "}
                  <code className="font-mono">biocard.vercel.app</code>
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              {!config.domainVerified && (
                <Button
                  variant="outline"
                  onClick={handleVerify}
                  disabled={verifying}
                >
                  <RefreshCw
                    className={`w-4 h-4 mr-2 ${verifying ? "animate-spin" : ""}`}
                  />
                  {verifying ? "Verificando..." : "Verificar dominio"}
                </Button>
              )}
              <Button
                variant="destructive"
                onClick={handleRemove}
                disabled={saving}
              >
                Eliminar dominio
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tu dominio</label>
              <div className="flex gap-2">
                <Input
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="ejemplo.com"
                  disabled={saving}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Ejemplo: tudominio.com (sin http:// ni www)
              </p>
            </div>

            {message && (
              <Alert
                variant={message.type === "error" ? "destructive" : "default"}
              >
                {message.type === "error" ? (
                  <XCircle className="w-4 h-4" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}

            <Button onClick={handleSave} disabled={saving || !domain}>
              {saving ? "Guardando..." : "Guardar dominio"}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}