'use client';

import { useState, useEffect } from 'react';
import LinkForm from './LinkForm';

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

interface Props {
  links: Link[];
  onLinksChange: () => void;
}

export default function LinksList({ links: initialLinks, onLinksChange }: Props) {
  const [links, setLinks] = useState<Link[]>(initialLinks);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  useEffect(() => {
    setLinks(initialLinks);
  }, [initialLinks]);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este link?')) return;

    const res = await fetch(`/api/links/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setLinks(links.filter((l) => l.id !== id));
      onLinksChange();
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
  };

  const handleDrop = async (dropIndex: number) => {
    if (draggedItem === null) return;

    const newLinks = [...links];
    const [draggedLink] = newLinks.splice(draggedItem, 1);
    newLinks.splice(dropIndex, 0, draggedLink);

    // Actualizar posiciones
    const updatedLinks = newLinks.map((link, index) => ({
      id: link.id,
      position: index,
    }));

    setLinks(newLinks);
    setDraggedItem(null);

    // Guardar nuevo orden
    await fetch('/api/links/reorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ links: updatedLinks }),
    });
  };

  const sortedLinks = [...links].sort((a, b) => {
    if (a.isPinned !== b.isPinned) return b.isPinned ? 1 : -1;
    return a.position - b.position;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Mis Links</h2>
        <button
          onClick={() => {
            setEditingLink(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
        >
          + Agregar Link
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">
              {editingLink ? 'Editar Link' : 'Nuevo Link'}
            </h3>
            <LinkForm
              link={editingLink || undefined}
              onSuccess={() => {
                setShowForm(false);
                setEditingLink(null);
                onLinksChange();
              }}
              onCancel={() => {
                setShowForm(false);
                setEditingLink(null);
              }}
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        {sortedLinks.map((link, index) => (
          <div
            key={link.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={() => handleDrop(index)}
            className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 cursor-move"
          >
            <span className="text-gray-500">☰</span>
            
            <div className="flex-1">
              <h4 className="font-medium flex items-center gap-2">
                {link.icon && <span>{link.icon}</span>}
                {link.title}
                {link.isPinned && <span className="text-yellow-400">📌</span>}
                {link.isFeatured && <span className="text-purple-400">⭐</span>}
              </h4>
              <p className="text-sm text-gray-400 truncate">{link.url}</p>
              {link.category && (
                <span className="text-xs text-gray-500 uppercase">{link.category}</span>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingLink(link);
                  setShowForm(true);
                }}
                className="p-2 text-gray-400 hover:text-white"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(link.id)}
                className="p-2 text-gray-400 hover:text-red-400"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}

        {links.length === 0 && (
          <p className="text-center text-gray-400 py-8">
            No hay links todavía. ¡Agrega el primero!
          </p>
        )}
      </div>
    </div>
  );
}