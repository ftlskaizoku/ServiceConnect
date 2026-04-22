'use client';
import { MapPin, Star, CheckCircle, Zap, Trophy } from 'lucide-react';

const AVAIL = {
  now:   { label: 'Disponible', color: 'var(--emerald)',  bg: 'var(--emerald-dim)' },
  today: { label: "Auj'hui",    color: '#D97706',         bg: 'var(--amber-dim)' },
  week:  { label: 'Semaine',    color: 'var(--ink-faint)', bg: 'var(--surface-3)' },
};

export default function ProviderCard({ provider, onContact, onClick }) {
  const { name, job, color, emoji, rating, missions, sat, price, dist, avail, badges = [] } = provider;
  const av = AVAIL[avail] || AVAIL.week;

  return (
    <div onClick={onClick} className="card card-hover cursor-pointer overflow-hidden flex flex-col">
      {/* Top strip */}
      <div className="h-1 w-full" style={{ background: color }} />

      <div className="p-4 flex gap-3 items-start">
        <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-bold text-sm"
          style={{ background: color }}>{emoji}</div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm truncate" style={{ color: 'var(--ink)' }}>{name}</h4>
          <p className="text-xs truncate" style={{ color: 'var(--ink-muted)' }}>{job}</p>
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            {badges.includes('verified') && (
              <span className="badge badge-green flex items-center gap-1">
                <CheckCircle size={9} strokeWidth={2.5} /> Vérifié
              </span>
            )}
            {badges.includes('fast') && (
              <span className="badge badge-amber flex items-center gap-1">
                <Zap size={9} strokeWidth={2.5} /> Rapide
              </span>
            )}
            {badges.includes('top') && (
              <span className="badge badge-sky flex items-center gap-1">
                <Trophy size={9} strokeWidth={2.5} /> Top
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0 text-xs font-semibold" style={{ color: '#D97706' }}>
          <Star size={12} fill="#D97706" strokeWidth={0} />
          {rating}
        </div>
      </div>

      <div className="px-4 pb-3 grid grid-cols-3 gap-2 text-center">
        {[
          [missions, 'missions'],
          [sat + '%', 'satisf.'],
          [dist + ' km', 'distance'],
        ].map(([v, l]) => (
          <div key={l} className="rounded-lg py-2 px-1" style={{ background: 'var(--surface-2)' }}>
            <div className="font-semibold text-sm" style={{ fontFamily: 'DM Serif Display, serif', color: 'var(--ink)' }}>{v}</div>
            <div className="text-xs" style={{ color: 'var(--ink-faint)' }}>{l}</div>
          </div>
        ))}
      </div>

      <div className="mt-auto px-4 pb-4 flex items-center justify-between gap-3">
        <div>
          <div className="text-base font-bold" style={{ fontFamily: 'DM Serif Display, serif', color: 'var(--ink)' }}>
            {price.toLocaleString('fr-FR')} <span className="text-xs font-normal" style={{ color: 'var(--ink-faint)' }}>FCFA/j</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium" style={{ color: av.color }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: av.color }} />
            {av.label}
          </div>
        </div>
        <button
          onClick={e => { e.stopPropagation(); onContact && onContact(provider); }}
          className="btn-primary px-4 py-2 text-xs">
          Contacter
        </button>
      </div>
    </div>
  );
}
