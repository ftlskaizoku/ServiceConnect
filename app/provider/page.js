'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AppShell from '@/components/AppShell';
import { Toast, useToast } from '@/components/Toast';

function useCounter(target, duration = 1500) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = p < .5 ? 2*p*p : -1+(4-2*p)*p;
      setVal(target * ease);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);
  return val;
}

const MISSIONS = [
  { title:'Installation électrique — Almadies', client:'Amadou Diallo', price:45000, status:'active', date:"Aujourd'hui" },
  { title:'Réparation plomberie — Plateau', client:'Aissatou Ndiaye', price:30000, status:'pending', date:"Aujourd'hui" },
  { title:'Peinture intérieure — Ouakam', client:'Moussa Ba', price:80000, status:'done', date:'Hier', rating:5 },
  { title:'Maintenance PC — Grand Yoff', client:'Ibrahima Sow', price:15000, status:'done', date:'Il y a 2j', rating:4.5 },
];

export default function ProviderDashboard() {
  const { toast, showToast } = useToast();
  const rev = useCounter(155000);
  const rating = useCounter(4.8);
  const missions = useCounter(12);

  const KPI = ({ icon, label, value, sub, accent }) => (
    <div className="bg-white rounded-2xl border p-5 relative overflow-hidden transition-all hover:-translate-y-0.5"
      style={{ borderColor: 'var(--border)', borderBottom: `3px solid ${accent}` }}>
      <span className="absolute top-4 right-4 text-2xl opacity-30">{icon}</span>
      <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#7A91B0' }}>{label}</p>
      <p className="text-3xl font-black" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--navy)' }}>{value}</p>
      <p className="text-xs mt-1" style={{ color: '#7A91B0' }}>{sub}</p>
    </div>
  );

  return (
    <AppShell role="provider" title="Mon espace" subtitle="Gérez vos missions et revenus">
      {/* Banner */}
      <div className="rounded-2xl p-6 mb-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0B3D2E, #0a5c3e, #0d7a52)' }}>
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, var(--gold), transparent)', transform: 'translate(30%,-30%)' }} />
        <h2 className="text-white text-xl font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>🛠️ Bonjour, Moussa !</h2>
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,.7)' }}>
          Vous avez <strong style={{ color: 'var(--gold)' }}>3 nouvelles demandes</strong> ce matin. Votre profil est vu par{' '}
          <strong style={{ color: '#6eefc0' }}>47 personnes</strong> aujourd'hui.
        </p>
        <Link href="/provider/missions"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold no-underline"
          style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
          📋 Voir les demandes →
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        <KPI icon="💰" label="Revenus ce mois" value={`${Math.round(rev).toLocaleString('fr-FR')} F`} sub="FCFA · +14% vs mois dernier" accent="var(--gold)" />
        <KPI icon="⭐" label="Note moyenne" value={rating.toFixed(1) + ' ★'} sub="Sur 32 évaluations" accent="var(--teal)" />
        <KPI icon="✅" label="Missions terminées" value={Math.round(missions)} sub="Ce mois · 3 en cours" accent="var(--success)" />
        <KPI icon="📩" label="Demandes en attente" value="3" sub="Répondre rapidement ↗" accent="var(--danger)" />
      </div>

      {/* Recent missions */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Missions récentes</h3>
        <Link href="/provider/missions" className="text-sm font-semibold no-underline" style={{ color: 'var(--navy-light)' }}>Voir toutes →</Link>
      </div>
      <div className="flex flex-col gap-3">
        {MISSIONS.map((m, i) => (
          <div key={i} className="bg-white rounded-xl border p-4 flex items-center gap-4"
            style={{ borderColor: 'var(--border)', borderLeft: `3px solid ${m.status === 'active' ? 'var(--success)' : m.status === 'pending' ? 'var(--warning)' : '#DDE3ED'}` }}>
            <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${m.status === 'active' ? 'animate-pulse' : ''}`}
              style={{ background: m.status === 'active' ? 'var(--success)' : m.status === 'pending' ? 'var(--warning)' : '#7A91B0' }} />
            <div className="flex-1">
              <h4 className="text-sm font-bold" style={{ color: 'var(--navy)' }}>{m.title}</h4>
              <p className="text-xs mt-0.5" style={{ color: '#7A91B0' }}>
                {m.client} {m.rating ? `· ⭐ ${m.rating}/5` : ''}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-bold text-sm" style={{ fontFamily: 'Syne, sans-serif', color: m.status === 'active' ? 'var(--success)' : m.status === 'pending' ? 'var(--warning)' : '#7A91B0' }}>
                {m.price.toLocaleString('fr-FR')} F
              </div>
              <div className="text-xs" style={{ color: '#7A91B0' }}>{m.date}</div>
            </div>
          </div>
        ))}
      </div>
      <Toast toast={toast} />
    </AppShell>
  );
}
