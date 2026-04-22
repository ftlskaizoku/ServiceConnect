'use client';
import { useState } from 'react';
import AppShell from '@/components/AppShell';
import { Toast, useToast } from '@/components/Toast';
import { PROVIDER_MISSIONS } from '@/lib/data';

const STATUS = {
  active: { label:'En cours', color:'var(--success)' },
  pending: { label:'Devis', color:'var(--warning)' },
  done: { label:'Terminée', color:'#7A91B0' },
};

export default function MissionsPage() {
  const [tab, setTab] = useState('all');
  const { toast, showToast } = useToast();

  const counts = { active: PROVIDER_MISSIONS.filter(m=>m.status==='active').length, pending: PROVIDER_MISSIONS.filter(m=>m.status==='pending').length, done: PROVIDER_MISSIONS.filter(m=>m.status==='done').length };
  const tabs = [
    { id:'all', label:`Toutes (${PROVIDER_MISSIONS.length})` },
    { id:'active', label:`🔵 En cours (${counts.active})` },
    { id:'pending', label:`⏳ Devis (${counts.pending})` },
    { id:'done', label:`✅ Terminées (${counts.done})` },
  ];
  const filtered = tab === 'all' ? PROVIDER_MISSIONS : PROVIDER_MISSIONS.filter(m => m.status === tab);

  return (
    <AppShell role="provider" title="Mes missions" subtitle="Gérez toutes vos missions">
      <div className="flex gap-2 flex-wrap mb-5">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
            style={{ background: tab===t.id?'var(--navy)':'white', color: tab===t.id?'white':'#7A91B0', borderColor: tab===t.id?'var(--navy)':'var(--border)' }}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map(m => {
          const st = STATUS[m.status];
          return (
            <div key={m.id} className="bg-white rounded-2xl border p-5 flex gap-4 items-start"
              style={{ borderColor:'var(--border)', borderLeft:`4px solid ${st.color}`, opacity: m.status==='done'?.85:1 }}>
              <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1 ${m.status==='active'?'animate-pulse':''}`}
                style={{ background: st.color }} />
              <div className="flex-1">
                <h4 className="font-bold text-sm mb-1" style={{ color:'var(--navy)' }}>{m.title}</h4>
                <p className="text-xs mb-0.5" style={{ color:'#3D5275' }}>Client : <strong>{m.client}</strong></p>
                <p className="text-xs mb-3" style={{ color:'#7A91B0' }}>📍 {m.location} · {m.date}{m.rating ? ` · ⭐ ${m.rating}/5` : ''}</p>
                <div className="flex gap-2 flex-wrap">
                  {m.status === 'active' && <>
                    <button onClick={() => showToast('✅ Mission marquée terminée !')} className="px-3 py-1.5 text-xs font-bold text-white rounded-lg" style={{ background:'var(--success)' }}>✔ Terminer</button>
                    <button onClick={() => showToast('💬 Chat ouvert')} className="px-3 py-1.5 text-xs font-semibold rounded-lg border" style={{ borderColor:'var(--border)', color:'#3D5275' }}>💬 Chat</button>
                    <button onClick={() => showToast('🗺️ Navigation lancée !')} className="px-3 py-1.5 text-xs font-semibold rounded-lg" style={{ background:'var(--teal)', color:'white' }}>🗺️ Itinéraire</button>
                  </>}
                  {m.status === 'pending' && <>
                    <button onClick={() => showToast('📤 Devis envoyé !')} className="px-3 py-1.5 text-xs font-bold text-white rounded-lg" style={{ background:'var(--navy)' }}>📤 Envoyer devis</button>
                    <button onClick={() => showToast('✏️ Devis modifié !')} className="px-3 py-1.5 text-xs font-semibold rounded-lg border" style={{ borderColor:'var(--border)', color:'#3D5275' }}>✏️ Modifier</button>
                    <button onClick={() => showToast('Demande refusée')} className="px-3 py-1.5 text-xs font-semibold rounded-lg border" style={{ borderColor:'#FFCDD2', color:'var(--danger)', background:'#FFF0F0' }}>✕ Refuser</button>
                  </>}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-bold text-sm" style={{ fontFamily:'Syne,sans-serif', color: m.status==='done'?'#7A91B0': m.status==='active'?'var(--success)':'var(--warning)' }}>
                  {m.price ? `${m.price.toLocaleString('fr-FR')} F` : '?'}
                </div>
                <span className="text-xs font-semibold" style={{ color: st.color }}>{st.label}</span>
              </div>
            </div>
          );
        })}
      </div>
      <Toast toast={toast} />
    </AppShell>
  );
}
