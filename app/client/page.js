'use client';
import Link from 'next/link';
import { useState } from 'react';
import AppShell from '@/components/AppShell';
import ProviderCard from '@/components/ProviderCard';
import ProviderModal from '@/components/ProviderModal';
import { Toast, useToast } from '@/components/Toast';
import { PROVIDERS, SERVICES } from '@/lib/data';

export default function ClientDashboard() {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const { toast, showToast } = useToast();
  const featured = [...PROVIDERS].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <AppShell role="client" title="Tableau de bord" subtitle="Bonjour, que cherchez-vous aujourd'hui ?">
      {/* Banner */}
      <div className="rounded-2xl p-6 mb-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 60%, #1a4a8a 100%)' }}>
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, var(--gold), transparent)', transform: 'translate(30%, -30%)' }} />
        <h2 className="text-white text-xl font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>🌅 Bonjour, Fatou !</h2>
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,.7)' }}>
          Vous avez <strong style={{ color: 'var(--gold)' }}>2 devis</strong> en attente de réponse et un prestataire disponible à{' '}
          <strong style={{ color: 'var(--teal)' }}>1.2 km</strong> de chez vous.
        </p>
        <Link href="/client/map"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold no-underline transition-all hover:translate-x-1"
          style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
          🗺️ Voir la carte →
        </Link>
      </div>

      {/* Services */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-base" style={{ fontFamily: 'Syne, sans-serif' }}>Services populaires</h3>
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-2 mb-8">
        {SERVICES.map(s => (
          <Link key={s.label} href={`/client/providers?cat=${s.cat}`}
            className="bg-white rounded-2xl p-3 text-center cursor-pointer border transition-all duration-200 hover:-translate-y-1 hover:bg-[var(--navy)] group no-underline"
            style={{ borderColor: 'var(--border)' }}>
            <span className="text-2xl block mb-1">{s.icon}</span>
            <h4 className="text-xs font-bold group-hover:text-white" style={{ color: 'var(--navy)' }}>{s.label}</h4>
            <p className="text-xs group-hover:text-white/60" style={{ color: '#7A91B0' }}>{s.count}</p>
          </Link>
        ))}
      </div>

      {/* Featured providers */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-base" style={{ fontFamily: 'Syne, sans-serif' }}>⭐ Top prestataires près de vous</h3>
        <Link href="/client/providers" className="text-sm font-semibold no-underline" style={{ color: 'var(--navy-light)' }}>Voir tous →</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {featured.map(p => (
          <ProviderCard key={p.id} provider={p}
            onClick={() => setSelectedProvider(p)}
            onContact={() => showToast(`✅ Demande envoyée à ${p.name} !`)} />
        ))}
      </div>

      <ProviderModal provider={selectedProvider} onClose={() => setSelectedProvider(null)}
        onContact={p => showToast(`✅ Demande de contact envoyée à ${p.name} !`)} />
      <Toast toast={toast} />
    </AppShell>
  );
}
