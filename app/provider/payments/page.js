'use client';
import { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import AppShell from '@/components/AppShell';
import { Toast, useToast } from '@/components/Toast';
import { TRANSACTIONS } from '@/lib/data';

export default function PaymentsPage() {
  const [payMethod, setPayMethod] = useState('wave');
  const [amount, setAmount] = useState('');
  const { toast, showToast } = useToast();

  return (
    <AppShell role="provider" title="Paiements" subtitle="Revenus et retraits">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          ['Solde disponible','87 500 F','Prêt à retirer','var(--emerald)'],
          ['Ce mois','155 000 F','+14% vs avril','var(--amber)'],
          ['Total encaissé','1.2M F','Depuis le début','var(--sky)'],
          ['En attente','63 000 F','Missions en cours','var(--ink-faint)'],
        ].map(([l,v,s,c])=>(
          <div key={l} className="card p-4 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background:c }} />
            <p className="text-xs font-medium mb-2" style={{ color:'var(--ink-faint)' }}>{l}</p>
            <p className="text-xl font-bold" style={{ fontFamily:'DM Serif Display,serif', color:c }}>{v}</p>
            <p className="text-xs mt-0.5" style={{ color:'var(--ink-faint)' }}>{s}</p>
          </div>
        ))}
      </div>

      {/* Withdrawal */}
      <div className="card p-5 mb-5">
        <h3 className="font-semibold mb-4" style={{ fontFamily:'DM Serif Display,serif' }}>Retirer des fonds</h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[['wave','Wave','77 *** ** 67'],['om','Orange Money','77 *** ** 89']].map(([id,name,num])=>(
            <button key={id} onClick={()=>setPayMethod(id)}
              className="p-3 rounded-xl border text-left transition-all"
              style={{ borderColor:payMethod===id?'var(--ink)':'var(--border)', background:payMethod===id?'var(--surface-2)':'var(--surface)' }}>
              <div className="font-semibold text-sm mb-0.5" style={{ color:payMethod===id?'var(--ink)':'var(--ink-muted)' }}>{name}</div>
              <div className="text-xs" style={{ color:'var(--ink-faint)' }}>{num}</div>
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <input type="number" value={amount} onChange={e=>setAmount(e.target.value)}
            placeholder="Montant en FCFA"
            className="flex-1 px-4 py-2.5 rounded-xl border text-sm outline-none"
            style={{ borderColor:'var(--border)', fontFamily:'DM Sans,sans-serif' }} />
          <button onClick={()=>{ showToast(`Retrait de ${Number(amount||0).toLocaleString('fr-FR')} F initié`); setAmount(''); }}
            className="btn-primary px-5 py-2.5 text-sm whitespace-nowrap">
            Retirer
          </button>
        </div>
      </div>

      {/* History */}
      <h3 className="font-semibold mb-3 text-sm" style={{ fontFamily:'DM Serif Display,serif' }}>Transactions récentes</h3>
      <div className="card overflow-hidden">
        {TRANSACTIONS.map((t,i)=>(
          <div key={t.id} className={`flex items-center gap-3 px-4 py-3.5 ${i<TRANSACTIONS.length-1?'border-b':''}`} style={{ borderColor:'var(--border)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: t.type==='in'?'var(--emerald-dim)':'var(--rose-dim)' }}>
              {t.type==='in'
                ? <ArrowDownLeft size={14} strokeWidth={2.5} style={{ color:'var(--emerald)' }} />
                : <ArrowUpRight size={14} strokeWidth={2.5} style={{ color:'var(--rose)' }} />
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate" style={{ color:'var(--ink)' }}>{t.label}</p>
              <p className="text-xs truncate" style={{ color:'var(--ink-faint)' }}>{t.sub}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-semibold text-sm" style={{ color:t.type==='in'?'var(--emerald)':'var(--rose)' }}>
                {t.type==='in'?'+':'-'} {t.amount.toLocaleString('fr-FR')} F
              </p>
              <p className="text-xs" style={{ color:'var(--ink-faint)' }}>{t.date}</p>
            </div>
          </div>
        ))}
      </div>
      <Toast toast={toast} />
    </AppShell>
  );
}
