'use client';
import { useState } from 'react';
import AppShell from '@/components/AppShell';
import { Toast, useToast } from '@/components/Toast';
import { CLIENT_REQUESTS } from '@/lib/data';

const STATUS_MAP = {
  active: { label: 'En cours', color: 'var(--success)', dot: 'bg-green-500' },
  pending: { label: 'En attente', color: 'var(--warning)', dot: 'bg-yellow-500' },
  done: { label: 'Terminée', color: '#7A91B0', dot: 'bg-gray-400' },
};

export default function RequestsPage() {
  const [tab, setTab] = useState('all');
  const { toast, showToast } = useToast();

  const tabs = [
    { id: 'all', label: `Toutes (${CLIENT_REQUESTS.length})` },
    { id: 'pending', label: `⏳ En attente (${CLIENT_REQUESTS.filter(r => r.status === 'pending').length})` },
    { id: 'active', label: `🔵 En cours (${CLIENT_REQUESTS.filter(r => r.status === 'active').length})` },
    { id: 'done', label: `✅ Terminées (${CLIENT_REQUESTS.filter(r => r.status === 'done').length})` },
  ];

  const filtered = tab === 'all' ? CLIENT_REQUESTS : CLIENT_REQUESTS.filter(r => r.status === tab);

  return (
    <AppShell role="client" title="Mes demandes" subtitle="Suivez vos demandes en temps réel">
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-2 flex-wrap">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
              style={{ background: tab === t.id ? 'var(--navy)' : 'white', color: tab === t.id ? 'white' : '#7A91B0', borderColor: tab === t.id ? 'var(--navy)' : 'var(--border)' }}>
              {t.label}
            </button>
          ))}
        </div>
        <button onClick={() => showToast('✅ Nouvelle demande créée !')}
          className="px-4 py-2 rounded-xl text-sm font-bold text-white hidden sm:block"
          style={{ background: 'var(--navy)' }}>
          + Nouvelle demande
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map(req => {
          const st = STATUS_MAP[req.status];
          return (
            <div key={req.id} className="bg-white rounded-2xl border p-5 flex gap-4 items-start"
              style={{ borderColor: 'var(--border)', borderLeft: `4px solid ${st.color}` }}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full ${req.status === 'active' ? 'animate-pulse' : ''}`} style={{ background: st.color }}></span>
                  <h4 className="font-bold text-sm" style={{ color: 'var(--navy)' }}>{req.title}</h4>
                </div>
                {req.provider ? (
                  <p className="text-xs mb-1" style={{ color: '#3D5275' }}>Prestataire : <strong>{req.provider}</strong>{req.job && ` · ${req.job}`}</p>
                ) : (
                  <p className="text-xs mb-1" style={{ color: '#3D5275' }}>En attente de réponse · <strong>2 prestataires contactés</strong></p>
                )}
                <p className="text-xs mb-3" style={{ color: '#7A91B0' }}>📍 {req.location} · {req.date}</p>

                {req.status === 'pending' && req.provider && (
                  <div className="flex gap-2">
                    <button onClick={() => showToast('✅ Devis accepté !')} className="px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background: 'var(--success)' }}>Accepter</button>
                    <button onClick={() => showToast('Devis refusé.')} className="px-3 py-1.5 rounded-lg text-xs font-semibold border" style={{ borderColor: 'var(--border)', color: '#7A91B0' }}>Refuser</button>
                  </div>
                )}
                {req.status === 'active' && (
                  <button onClick={() => showToast(`💬 Chat ouvert avec ${req.provider}`)} className="px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background: 'var(--navy)' }}>💬 Chat</button>
                )}
                {req.status === 'done' && (
                  <button onClick={() => showToast('⭐ Avis publié !')} className="px-3 py-1.5 rounded-lg text-xs font-bold border" style={{ background: 'var(--gold-pale)', borderColor: 'var(--gold)', color: 'var(--navy)' }}>⭐ Laisser un avis</button>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                {req.price ? (
                  <div className="font-bold text-base" style={{ fontFamily: 'Syne, sans-serif', color: req.status === 'done' ? '#7A91B0' : req.status === 'active' ? 'var(--success)' : 'var(--warning)' }}>
                    {req.price.toLocaleString('fr-FR')} F
                  </div>
                ) : (
                  <div className="text-xs font-semibold" style={{ color: 'var(--warning)' }}>Devis attendu</div>
                )}
                <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: req.status === 'done' ? '#F5F7FA' : req.status === 'active' ? '#E6F9F2' : '#FFF3E0', color: st.color }}>
                  {st.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <Toast toast={toast} />
    </AppShell>
  );
}
