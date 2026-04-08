'use client';

import { useEffect, useState } from 'react';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { useSession } from 'next-auth/react';

export default function AnalyticsPage() {
  const { data: session } = useSession();
  const [profileId, setProfileId] = useState<string | null>(null);

  useEffect(() => {
    // Get profile ID from session
    async function fetchProfileId() {
      const res = await fetch('/api/profiles/me');
      if (res.ok) {
        const data = await res.json();
        setProfileId(data.id);
      }
    }
    if (session) {
      fetchProfileId();
    }
  }, [session]);

  if (!session) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p className="text-center">Por favor inicia sesión para ver analytics</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>
      {profileId ? (
        <AnalyticsDashboard profileId={profileId} />
      ) : (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
}