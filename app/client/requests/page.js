'use client';
import { useState } from 'react';
import { MessageCircle, Check, X, Star, Plus } from 'lucide-react';
import AppShell from '@/components/AppShell';
import { Toast, useToast } from '@/components/Toast';
import { CLIENT_REQUESTS } from '@/lib/data';

const ST = {
  active:  { label:'En cours',   color:'var(--emerald)', bg:'var(--emerald-dim)', pulse:true },
  pending: { label:'En attente', color:'var(--amber)',   bg:'var(--amber-dim)',   pulse:false },
  done:    { label:'Terminée',   color:'var(--ink-faint)', bg:'var(--surface-3)', pulse:false },
};

export default function RequestsPage() {
  const [tab, setTab] = useState('all');
  const { toast, showToast } = useToast();
  const counts = { pending: CLIENT_REQUESTS.filter(r=>r.status==='pending').length, active: CLIENT_REQUESTS.filter(r=>r.status==='active').length, done: CLIENT_REQUESTS.filter(r=>r.status==='done').length };
  const tabs = [
    { id:'all',     label:`Toutes (${CLIENT_REQUESTS.length})` },
    { id:'pending', label:`En attente (${counts.pending})` },
    { id:'active',  label:`En cours (${counts.active})` },
    { id:'done',    label:`Terminées (${counts.done})` },
  ];
  const filtered = tab === 'all' ? CLIENT_REQUESTS : CLIENT_REQUESTS.filter(r => r.status === tab);

  return (
    <AppShell role="client" title="Mes demandes" subtitle="Suivez vos demandes en temps réel">
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-2 flex-wrap">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
              style={{ background: tab===t.id?'var(--ink)':'var(--surface)', color: tab===t.id?'white':'var(--ink-muted)', borderColor: tab===t.id?'var(--ink)':'var(--border)' }}>
              {t.label}
            </button>
          ))}
        </div>
        <button onClick={() => showToast('Nouvelle demande créée')}
          className="btn-primary px-3 py-2 text-xs flex items-center gap-1.5 hidden sm:flex">
          <Plus size={13} strokeWidth={2.5} /> Nouvelle
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map(req => {
          const st = ST[req.status];
          return (
            <div key={req.id} className="card p-4 flex gap-3 items-start" style={{ opacity: req.status==='done' ? .8 : 1 }}>
              <span className={`mt-1 w-2.5 h-2.5 rounded-full flex-shrink-0 ${st.pulse?'animate-pulse':''}`} style={{ background:st.color }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-sm leading-snug" style={{ color:'var(--ink)' }}>{req.title}</h4>
                  <span className="badge flex-shrink-0" style={{ background:st.bg, color:st.color }}>{st.label}</span>
                </div>
                {req.provider
                  ? <p className="text-xs mb-0.5" style={{ color:'var(--ink-muted)' }}>{req.provider} {req.job && `· ${req.job}`}</p>
                  : <p className="text-xs mb-0.5" style={{ color:'var(--ink-muted)' }}>2 prestataires contactés</p>
                }
                <p className="text-xs mb-3" style={{ color:'var(--ink-faint)' }}>📍 {req.location} · {req.date}</p>
                <div className="flex gap-2 flex-wrap">
                  {req.status==='pending' && req.provider && <>
                    <button onClick={() => showToast('Devis accepté')} className="btn-primary px-3 py-1.5 text-xs flex items-center gap-1.5">
                      <Check size={12} strokeWidth={2.5} /> Accepter
                    </button>
                    <button onClick={() => showToast('Devis refusé')} className="btn-secondary px-3 py-1.5 text-xs flex items-center gap-1.5">
                      <X size={12} strokeWidth={2} /> Refuser
                    </button>
                  </>}
                  {req.status==='active' && (
                    <button onClick={() => showToast(`Chat ouvert avec ${req.provider}`)}
                      className="btn-secondary px-3 py-1.5 text-xs flex items-center gap-1.5">
                      <MessageCircle size={12} strokeWidth={1.8} /> Chat
                    </button>
                  )}
                  {req.status==='done' && (
                    <button onClick={() => showToast('Avis publié')}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 border transition-all"
                      style={{ background:'var(--amber-dim)', borderColor:'var(--amber)', color:'var(--amber-dark)' }}>
                      <Star size={12} strokeWidth={2} fill="var(--amber)" /> Laisser un avis
                    </button>
                  )}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                {req.price
                  ? <div className="font-semibold text-sm" style={{ fontFamily:'DM Serif Display,serif', color: req.status==='active'?'var(--emerald)':req.status==='pending'?'var(--amber)':'var(--ink-faint)' }}>
                      {req.price.toLocaleString('fr-FR')} F
                    </div>
                  : <div className="text-xs font-medium" style={{ color:'var(--amber)' }}>Devis attendu</div>
                }
              </div>
            </div>
          );
        })}
      </div>
      <Toast toast={toast} />
    </AppShell>
  );
}
