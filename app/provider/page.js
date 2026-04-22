'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendingUp, ArrowRight, Circle } from 'lucide-react';
import AppShell from '@/components/AppShell';
import { Toast, useToast } from '@/components/Toast';

function useCount(target, dur=1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const s = performance.now();
    const tick = n => {
      const p = Math.min((n-s)/dur,1), e=p<.5?2*p*p:-1+(4-2*p)*p;
      setV(target*e); if(p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);
  return v;
}

const MISSIONS = [
  { title:'Installation électrique — Almadies', client:'Amadou Diallo', price:45000, status:'active', date:"Auj." },
  { title:'Réparation plomberie — Plateau', client:'Aissatou Ndiaye', price:30000, status:'pending', date:"Auj." },
  { title:'Peinture intérieure — Ouakam', client:'Moussa Ba', price:80000, status:'done', date:'Hier' },
  { title:'Maintenance PC — Grand Yoff', client:'Ibrahima Sow', price:15000, status:'done', date:'–2j' },
];

const STATUS_STYLE = {
  active:  { dot:'var(--emerald)', label:'En cours',  pulse: true },
  pending: { dot:'var(--amber)',   label:'Devis',     pulse: false },
  done:    { dot:'var(--border)',  label:'Terminée',  pulse: false },
};

export default function ProviderDashboard() {
  const { toast, showToast } = useToast();
  const rev = useCount(155000); const rat = useCount(4.8); const mis = useCount(12);

  const KPI = ({ label, value, sub, accent }) => (
    <div className="card p-5 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: accent }} />
      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color:'var(--ink-faint)' }}>{label}</p>
      <p className="text-2xl font-bold" style={{ fontFamily:'DM Serif Display,serif', color:'var(--ink)' }}>{value}</p>
      <p className="text-xs mt-1" style={{ color:'var(--ink-faint)' }}>{sub}</p>
    </div>
  );

  return (
    <AppShell role="provider" title="Bonjour, Moussa 👋" subtitle="Vue d'ensemble de votre activité">
      {/* Banner */}
      <div className="rounded-2xl p-5 mb-6 relative overflow-hidden animate-slide-up"
        style={{ background:'linear-gradient(135deg,#0f2519,#0d4a2a,#0a7040)' }}>
        <div className="absolute top-0 right-0 w-48 h-48 opacity-10 rounded-full"
          style={{ background:'radial-gradient(circle,var(--amber),transparent)', transform:'translate(20%,-20%)' }} />
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background:'var(--emerald)' }} />
          <span className="text-xs" style={{ color:'rgba(255,255,255,.5)' }}>Profil vu par <strong style={{ color:'rgba(255,255,255,.8)' }}>47 personnes</strong> aujourd'hui</span>
        </div>
        <p className="text-white text-sm mb-1" style={{ color:'rgba(255,255,255,.7)' }}>
          <strong style={{ color:'var(--amber)' }}>3 nouvelles demandes</strong> ce matin
        </p>
        <Link href="/provider/missions"
          className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-xl text-xs font-semibold no-underline"
          style={{ background:'var(--amber)', color:'var(--ink)' }}>
          Voir les demandes <ArrowRight size={13} strokeWidth={2.5} />
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6 animate-slide-up stagger-1">
        <KPI label="Revenus ce mois" value={`${Math.round(rev).toLocaleString('fr-FR')} F`} sub="+14% vs mois dernier" accent="var(--amber)" />
        <KPI label="Note moyenne" value={rat.toFixed(1)} sub="32 évaluations" accent="var(--sky)" />
        <KPI label="Missions" value={Math.round(mis)} sub="Ce mois · 3 en cours" accent="var(--emerald)" />
        <KPI label="En attente" value="3" sub="Répondez rapidement" accent="var(--rose)" />
      </div>

      {/* Recent */}
      <div className="animate-slide-up stagger-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={14} strokeWidth={2} style={{ color:'var(--amber)' }} />
            <h2 className="font-semibold text-sm" style={{ fontFamily:'DM Serif Display,serif' }}>Missions récentes</h2>
          </div>
          <Link href="/provider/missions" className="text-xs no-underline flex items-center gap-1" style={{ color:'var(--ink-faint)' }}>
            Toutes <ArrowRight size={12} />
          </Link>
        </div>
        <div className="card overflow-hidden">
          {MISSIONS.map((m, i) => {
            const st = STATUS_STYLE[m.status];
            return (
              <div key={i} className={`flex items-center gap-3 px-5 py-3.5 ${i < MISSIONS.length-1 ? 'border-b' : ''}`}
                style={{ borderColor:'var(--border)', opacity: m.status==='done'?.7:1 }}>
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${st.pulse?'animate-pulse':''}`} style={{ background:st.dot }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color:'var(--ink)' }}>{m.title}</p>
                  <p className="text-xs truncate" style={{ color:'var(--ink-faint)' }}>{m.client}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold" style={{ fontFamily:'DM Serif Display,serif', color: m.status==='active'?'var(--emerald)':m.status==='pending'?'var(--amber)':'var(--ink-faint)' }}>
                    {m.price.toLocaleString('fr-FR')} F
                  </p>
                  <p className="text-xs" style={{ color:'var(--ink-faint)' }}>{m.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Toast toast={toast} />
    </AppShell>
  );
}
