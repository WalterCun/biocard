"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, UserPlus, Shield } from "lucide-react";

interface TeamMember {
  id: string;
  email: string;
  role: string;
  invitedAt: string;
  joinedAt: string | null;
  user?: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
}

const roleLabels: Record<string, string> = {
  OWNER: "Dueño",
  ADMIN: "Administrador",
  EDITOR: "Editor",
  VIEWER: "Visor",
};

const roleColors: Record<string, string> = {
  OWNER: "bg-yellow-500",
  ADMIN: "bg-red-500",
  EDITOR: "bg-blue-500",
  VIEWER: "bg-gray-500",
};

export function TeamSettings() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("EDITOR");
  const [inviting, setInviting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await fetch("/api/team");
      if (res.ok) {
        const data = await res.json();
        setMembers(data);
      }
    } catch (e) {
      console.error("Error fetching team:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviting(true);
    setError(null);

    try {
      const res = await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error invitando usuario");
      } else {
        setInviteEmail("");
        fetchTeam();
      }
    } catch (e) {
      setError("Error de conexión");
    } finally {
      setInviting(false);
    }
  };

  const handleRemove = async (memberId: string) => {
    if (!confirm("¿Eliminar este miembro?")) return;

    try {
      await fetch(`/api/team/${memberId}`, { method: "DELETE" });
      fetchTeam();
    } catch (e) {
      console.error("Error removing member:", e);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Invitar miembro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleInvite} className="flex gap-2">
            <Input
              type="email"
              placeholder="Email del miembro"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              required
              className="flex-1"
            />
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="px-3 py-2 rounded border bg-background"
            >
              <option value="ADMIN">Administrador</option>
              <option value="EDITOR">Editor</option>
              <option value="VIEWER">Visor</option>
            </select>
            <Button type="submit" disabled={inviting}>
              {inviting ? "Invitando..." : "Invitar"}
            </Button>
          </form>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Miembros del equipo
          </CardTitle>
        </CardHeader>
        <CardContent>
          {members.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No hay miembros en el equipo
            </p>
          ) : (
            <div className="space-y-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {member.user?.image ? (
                      <img
                        src={member.user.image}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        {member.email[0].toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="font-medium">
                        {member.user?.name || member.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {member.user?.email || member.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={roleColors[member.role]}>
                      {roleLabels[member.role]}
                    </Badge>
                    {member.role !== "OWNER" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemove(member.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
