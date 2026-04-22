'use client';
import { useState } from 'react';
import { MessageCircle, Navigation, CheckCircle, Send, X } from 'lucide-react';
import AppShell from '@/components/AppShell';
import { Toast, useToast } from '@/components/Toast';
import { PROVIDER_MISSIONS } from '@/lib/data';

const ST = {
  active:  { label:'En cours', color:'var(--emerald)', bg:'var(--emerald-dim)', pulse:true },
  pending: { label:'Devis',    color:'var(--amber)',   bg:'var(--amber-dim)',   pulse:false },
  done:    { label:'Terminée', color:'var(--ink-faint)', bg:'var(--surface-3)', pulse:false },
};

export default function MissionsPage() {
  const [tab, setTab] = useState('all');
  const { toast, showToast } = useToast();
  const counts = { active:PROVIDER_MISSIONS.filter(m=>m.status==='active').length, pending:PROVIDER_MISSIONS.filter(m=>m.status==='pending').length, done:PROVIDER_MISSIONS.filter(m=>m.status==='done').length };
  const tabs = [{id:'all',label:`Toutes (${PROVIDER_MISSIONS.length})`},{id:'active',label:`En cours (${counts.active})`},{id:'pending',label:`Devis (${counts.pending})`},{id:'done',label:`Terminées (${counts.done})`}];
  const filtered = tab==='all' ? PROVIDER_MISSIONS : PROVIDER_MISSIONS.filter(m=>m.status===tab);

  return (
    <AppShell role="provider" title="Mes missions" subtitle="Gérez toutes vos interventions">
      <div className="flex gap-2 flex-wrap mb-5">
        {tabs.map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
            style={{ background:tab===t.id?'var(--ink)':'var(--surface)', color:tab===t.id?'white':'var(--ink-muted)', borderColor:tab===t.id?'var(--ink)':'var(--border)' }}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map(m => {
          const st = ST[m.status];
          return (
            <div key={m.id} className="card p-4 flex gap-3 items-start" style={{ opacity:m.status==='done'?.8:1 }}>
              <div className="mt-1">
                <span className={`block w-2.5 h-2.5 rounded-full ${st.pulse?'animate-pulse':''}`} style={{ background:st.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h4 className="font-semibold text-sm leading-snug" style={{ color:'var(--ink)' }}>{m.title}</h4>
                  <span className="badge flex-shrink-0" style={{ background:st.bg, color:st.color }}>{st.label}</span>
                </div>
                <p className="text-xs mb-0.5" style={{ color:'var(--ink-muted)' }}>{m.client} · 📍 {m.location}</p>
                <p className="text-xs mb-3" style={{ color:'var(--ink-faint)' }}>{m.date}{m.rating?` · ⭐ ${m.rating}/5`:''}</p>
                <div className="flex gap-2 flex-wrap">
                  {m.status==='active' && <>
                    <button onClick={()=>showToast('Mission terminée !')} className="btn-primary px-3 py-1.5 text-xs flex items-center gap-1.5"><CheckCircle size={12} strokeWidth={2.5}/>Terminer</button>
                    <button onClick={()=>showToast('Chat ouvert')} className="btn-secondary px-3 py-1.5 text-xs flex items-center gap-1.5"><MessageCircle size={12} strokeWidth={1.8}/>Chat</button>
                    <button onClick={()=>showToast('Navigation lancée')} className="px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5" style={{ background:'var(--sky-dim)', color:'var(--sky)' }}><Navigation size={12} strokeWidth={2}/>Itinéraire</button>
                  </>}
                  {m.status==='pending' && <>
                    <button onClick={()=>showToast('Devis envoyé')} className="btn-primary px-3 py-1.5 text-xs flex items-center gap-1.5"><Send size={12} strokeWidth={2}/>Envoyer devis</button>
                    <button onClick={()=>showToast('Demande refusée')} className="btn-secondary px-3 py-1.5 text-xs flex items-center gap-1.5"><X size={12} strokeWidth={2}/>Refuser</button>
                  </>}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-semibold text-sm" style={{ fontFamily:'DM Serif Display,serif', color: m.status==='active'?'var(--emerald)':m.status==='pending'?'var(--amber)':'var(--ink-faint)' }}>
                  {m.price?`${m.price.toLocaleString('fr-FR')} F`:'—'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Toast toast={toast} />
    </AppShell>
  );
}
