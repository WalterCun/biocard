'use client';

import { useEffect, useState } from 'react';
import { ShareButtons } from '@/components/ShareButtons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SharePage() {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/profiles/me');
        if (res.ok) {
          const data = await res.json();
          setUsername(data.username);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!username) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p className="text-center">Perfil no encontrado</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Compartir Perfil</h1>
      <ShareButtons username={username} />
    </div>
  );
}