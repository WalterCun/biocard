'use client';

import { useSession } from 'next-auth/react';
import { Link as LinkIcon, Eye, MousePointer, TrendingUp, Plus } from 'lucide-react';
import Link from 'next/link';

// Mock data - will be replaced with API calls
const stats = [
  { label: 'Visitas totales', value: '1,234', change: '+12%', icon: Eye },
  { label: 'Clicks en links', value: '567', change: '+8%', icon: MousePointer },
  { label: 'Links activos', value: '8', change: '0%', icon: LinkIcon },
  { label: 'Miembros', value: '3', change: '0%', icon: TrendingUp },
];

const recentLinks = [
  { title: 'Instagram', clicks: 234, active: true },
  { title: 'YouTube', clicks: 189, active: true },
  { title: 'Mi Tienda', clicks: 89, active: true },
  { title: 'Contacto', clicks: 55, active: true },
];

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">
          Bienvenido{session?.user?.name ? `, ${session.user.name}` : ''}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-6 bg-gray-800 rounded-xl border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-8 h-8 text-purple-400" />
              <span className="text-green-400 text-sm">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <Link
          href="/links/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Crear nuevo link
        </Link>
      </div>

      {/* Recent Links */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Links recientes</h2>
        </div>
        <div className="divide-y divide-gray-700">
          {recentLinks.map((link) => (
            <div
              key={link.title}
              className="p-4 flex items-center justify-between hover:bg-gray-700/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                  <LinkIcon className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{link.title}</p>
                  <p className="text-sm text-gray-400">{link.clicks} clicks</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  link.active
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-gray-600 text-gray-300'
                }`}
              >
                {link.active ? 'Activo' : 'Inactivo'}
              </span>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-700">
          <Link
            href="/links"
            className="text-purple-400 hover:text-purple-300 text-sm"
          >
            Ver todos los links →
          </Link>
        </div>
      </div>
    </div>
  );
}