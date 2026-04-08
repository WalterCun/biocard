'use client';

import { useState, useEffect } from 'react';
import LinksList from '@/components/LinksList';

interface Link {
  id: string;
  title: string;
  url: string;
  icon?: string;
  thumbnail?: string;
  category?: string;
  isFeatured: boolean;
  isPinned: boolean;
  position: number;
}

export default function LinksPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLinks = async () => {
    try {
      const res = await fetch('/api/links');
      if (res.ok) {
        const data = await res.json();
        setLinks(data);
      }
    } catch (error) {
      console.error('Error fetching links:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Gestionar Links</h1>
        <p className="text-gray-400 mt-1">
          Agrega, edita y reordena tus links
        </p>
      </div>

      <LinksList links={links} onLinksChange={fetchLinks} />
    </div>
  );
}