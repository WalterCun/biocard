'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProfileEditor } from '@/components/ProfileEditor';
import { ThemeSelector } from '@/components/ThemeSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

export default function ProfileSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profiles/me');
      if (!res.ok) {
        if (res.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch profile');
      }
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      setError('Error cargando perfil');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: Partial<Profile>) => {
    const res = await fetch('/api/profiles/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const result = await res.json();
      throw new Error(result.error || 'Error guardando perfil');
    }

    const updated = await res.json();
    setProfile(updated);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">{error || 'Perfil no encontrado'}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Configuración del Perfil</h1>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="appearance">Apariencia</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileEditor
            profile={profile}
            onSave={handleSave}
          />
        </TabsContent>

        <TabsContent value="appearance">
          <div className="space-y-6">
            <ThemeSelector
              currentTheme={profile.theme}
              onSelect={(themeId) => handleSave({ theme: themeId })}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}