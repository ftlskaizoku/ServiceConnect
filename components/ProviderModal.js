'use client';
import { X, Star, MapPin, CheckCircle, MessageCircle } from 'lucide-react';

export default function ProviderModal({ provider, onClose, onContact }) {
  if (!provider) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      style={{ background: 'rgba(13,17,23,.6)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}>
      <div className="bg-white w-full sm:max-w-sm rounded-t-3xl sm:rounded-2xl overflow-hidden animate-scale-in"
        style={{ boxShadow: '0 32px 64px rgba(13,17,23,.2)' }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="relative h-24 flex-shrink-0" style={{ background: `linear-gradient(135deg, ${provider.color}dd, ${provider.color}88)` }}>
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,.2)', color: 'white' }}>
            <X size={16} strokeWidth={2} />
          </button>
          <div className="absolute -bottom-6 left-5 w-14 h-14 rounded-2xl border-2 border-white flex items-center justify-center text-white font-bold text-lg"
            style={{ background: provider.color }}>
            {provider.emoji}
          </div>
        </div>

        <div className="px-5 pt-9 pb-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold" style={{ fontFamily: 'DM Serif Display, serif', color: 'var(--ink)' }}>{provider.name}</h3>
              <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>{provider.job}</p>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: '#D97706' }}>
              <Star size={14} fill="#D97706" strokeWidth={0} />{provider.rating}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="px-5 py-3 grid grid-cols-3 gap-3">
          {[[provider.missions, 'Missions'],[provider.sat+'%','Satisfaction'],['4.8','Note moy.']].map(([v,l]) => (
            <div key={l} className="text-center p-3 rounded-xl" style={{ background: 'var(--surface-2)' }}>
              <div className="font-bold text-base" style={{ fontFamily:'DM Serif Display,serif', color:'var(--ink)' }}>{v}</div>
              <div className="text-xs mt-0.5" style={{ color:'var(--ink-faint)' }}>{l}</div>
            </div>
          ))}
        </div>

        <div className="px-5 pb-3">
          <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-muted)' }}>{provider.desc}</p>
        </div>

        <div className="px-5 pb-5 grid grid-cols-2 gap-3">
          <button onClick={onClose} className="btn-secondary py-3 text-sm">Fermer</button>
          <button onClick={() => { onContact(provider); onClose(); }}
            className="btn-primary py-3 text-sm flex items-center justify-center gap-2">
            <MessageCircle size={15} strokeWidth={2} /> Contacter
          </button>
        </div>
      </div>
    </div>
  );
}
