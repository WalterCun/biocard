"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Eye, MousePointer2, RefreshCw } from "lucide-react";

interface RealtimeData {
  activeVisitors: number;
  todayVisits: number;
  todayClicks: number;
  recentVisitors: Array<{
    visitorId: string;
    country: string;
    city: string;
    device: string;
    pageViews: number;
  }>;
}

export function RealtimeStats() {
  const [data, setData] = useState<RealtimeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    fetchRealtime();
    const interval = setInterval(fetchRealtime, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchRealtime = async () => {
    try {
      const res = await fetch("/api/analytics/realtime");
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setLastUpdate(new Date());
      }
    } catch (error) {
      console.error("Error fetching realtime:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-4">
            <RefreshCw className="w-5 h-5 animate-spin mr-2" />
            Cargando...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Users className="w-4 h-4" />
          Tiempo Real
        </CardTitle>
        {lastUpdate && (
          <span className="text-xs text-muted-foreground">
            {lastUpdate.toLocaleTimeString()}
          </span>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">
              {data?.activeVisitors || 0}
            </div>
            <div className="text-xs text-muted-foreground">
              Visitantes activos
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{data?.todayVisits || 0}</div>
            <div className="text-xs text-muted-foreground">Visitas hoy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{data?.todayClicks || 0}</div>
            <div className="text-xs text-muted-foreground">Clicks hoy</div>
          </div>
        </div>

        {data?.recentVisitors && data.recentVisitors.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs font-medium mb-2">Visitantes recientes</p>
            <div className="space-y-2">
              {data.recentVisitors.slice(0, 5).map((v, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="text-muted-foreground">
                    {v.country}, {v.city}
                  </span>
                  <span className="capitalize">{v.device}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
