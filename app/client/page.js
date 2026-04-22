'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, MapPin, TrendingUp } from 'lucide-react';
import AppShell from '@/components/AppShell';
import ProviderCard from '@/components/ProviderCard';
import ProviderModal from '@/components/ProviderModal';
import { Toast, useToast } from '@/components/Toast';
import { PROVIDERS, SERVICES } from '@/lib/data';

export default function ClientDashboard() {
  const [selected, setSelected] = useState(null);
  const { toast, showToast } = useToast();
  const featured = [...PROVIDERS].sort((a,b)=>b.rating-a.rating).slice(0,4);

  return (
    <AppShell role="client" title="Bonjour, Fatou 👋" subtitle="Que cherchez-vous aujourd'hui ?">
      {/* Hero card */}
      <div className="rounded-2xl p-5 mb-6 relative overflow-hidden animate-slide-up"
        style={{ background: 'linear-gradient(135deg, var(--ink) 0%, var(--ink-soft) 100%)' }}>
        <div className="absolute top-0 right-0 w-48 h-48 opacity-10"
          style={{ background: 'radial-gradient(circle, var(--amber), transparent)', transform: 'translate(20%,-20%)' }} />
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--emerald)' }} />
          <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,.5)' }}>
            <strong style={{ color: 'var(--emerald)' }}>1 prestataire</strong> disponible à 1.2 km
          </span>
        </div>
        <p className="text-white text-sm mb-1" style={{ color: 'rgba(255,255,255,.7)' }}>
          <strong style={{ color: 'var(--amber)' }}>2 devis</strong> en attente de réponse
        </p>
        <Link href="/client/map"
          className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-xl text-xs font-semibold no-underline transition-all"
          style={{ background: 'var(--amber)', color: 'var(--ink)' }}>
          <MapPin size={13} strokeWidth={2.5} /> Voir sur la carte <ArrowRight size={13} strokeWidth={2.5} />
        </Link>
      </div>

      {/* Services */}
      <div className="mb-6 animate-slide-up stagger-1">
        <h2 className="text-base font-semibold mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>Services</h2>
        <div className="grid grid-cols-5 gap-2">
          {SERVICES.map(s => (
            <Link key={s.label} href={`/client/providers?cat=${s.cat}`}
              className="group bg-white border rounded-xl p-3 text-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-[var(--ink)] no-underline"
              style={{ borderColor: 'var(--border)' }}>
              <span className="text-xl block mb-1">{s.icon}</span>
              <h4 className="text-xs font-semibold truncate" style={{ color: 'var(--ink)' }}>{s.label}</h4>
              <p className="text-xs" style={{ color: 'var(--ink-faint)' }}>{s.count}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Top providers */}
      <div className="animate-slide-up stagger-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={15} strokeWidth={2} style={{ color: 'var(--amber)' }} />
            <h2 className="text-base font-semibold" style={{ fontFamily: 'DM Serif Display, serif' }}>Meilleurs prestataires</h2>
          </div>
          <Link href="/client/providers" className="text-xs font-medium no-underline flex items-center gap-1"
            style={{ color: 'var(--ink-muted)' }}>
            Voir tous <ArrowRight size={12} strokeWidth={2} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {featured.map((p, i) => (
            <div key={p.id} className={`animate-slide-up stagger-${i+1}`}>
              <ProviderCard provider={p} onClick={() => setSelected(p)}
                onContact={() => showToast(`Demande envoyée à ${p.name}`)} />
            </div>
          ))}
        </div>
      </div>

      <ProviderModal provider={selected} onClose={() => setSelected(null)}
        onContact={p => showToast(`Demande envoyée à ${p.name}`)} />
      <Toast toast={toast} />
    </AppShell>
  );
}
