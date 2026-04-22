'use client';
import { useState } from 'react';
import AppShell from '@/components/AppShell';
import { Toast, useToast } from '@/components/Toast';
import { TRANSACTIONS } from '@/lib/data';

export default function PaymentsPage() {
  const [payMethod, setPayMethod] = useState('wave');
  const [amount, setAmount] = useState('');
  const { toast, showToast } = useToast();

  return (
    <AppShell role="provider" title="Paiements" subtitle="Suivez vos revenus et retraits">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          ['💰','Solde disponible','87 500 F','var(--success)','Prêt à retirer'],
          ['📈','Ce mois','155 000 F','var(--navy)','FCFA · +14%'],
          ['✅','Total encaissé','1.2M F','var(--teal)','Depuis le début'],
          ['⏳','En attente','63 000 F','var(--warning)','Missions en cours'],
        ].map(([icon,label,val,color,sub]) => (
          <div key={label} className="bg-white rounded-2xl border p-5 relative overflow-hidden" style={{ borderColor:'var(--border)', borderBottom:`3px solid ${color}` }}>
            <span className="absolute top-4 right-4 text-xl opacity-25">{icon}</span>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'#7A91B0' }}>{label}</p>
            <p className="text-2xl font-black" style={{ fontFamily:'Syne,sans-serif', color }}>{val}</p>
            <p className="text-xs mt-1" style={{ color:'#7A91B0' }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Withdrawal */}
      <div className="bg-white rounded-2xl border p-5 mb-5" style={{ borderColor:'var(--border)' }}>
        <h4 className="font-bold mb-4" style={{ fontFamily:'Syne,sans-serif' }}>💸 Retirer des fonds</h4>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[['wave','📱','Wave','77 *** ** 67'],['om','🟠','Orange Money','77 *** ** 89']].map(([id,icon,name,num]) => (
            <button key={id} onClick={() => setPayMethod(id)}
              className="p-4 rounded-xl border text-center transition-all"
              style={{ borderColor: payMethod===id ? 'var(--teal)' : 'var(--border)', background: payMethod===id ? 'var(--teal-light)' : 'white' }}>
              <div className="text-2xl mb-1">{icon}</div>
              <div className="font-bold text-sm" style={{ color: payMethod===id ? 'var(--teal)' : 'var(--navy)' }}>{name}</div>
              <div className="text-xs" style={{ color:'#7A91B0' }}>{num}</div>
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
            placeholder="Montant en FCFA"
            className="flex-1 px-4 py-3 rounded-xl border text-sm outline-none"
            style={{ borderColor:'var(--border)', fontFamily:'Plus Jakarta Sans,sans-serif' }} />
          <button onClick={() => { showToast(`✅ Retrait de ${Number(amount||0).toLocaleString('fr-FR')} F initié via ${payMethod === 'wave' ? 'Wave' : 'Orange Money'} !`); setAmount(''); }}
            className="px-5 py-3 rounded-xl text-sm font-bold text-white whitespace-nowrap"
            style={{ background:'var(--navy)' }}>
            Retirer
          </button>
        </div>
      </div>

      {/* History */}
      <h4 className="font-bold mb-4" style={{ fontFamily:'Syne,sans-serif' }}>Historique des transactions</h4>
      <div className="flex flex-col gap-3">
        {TRANSACTIONS.map(t => (
          <div key={t.id} className="bg-white rounded-xl border p-4 flex items-center gap-4" style={{ borderColor:'var(--border)' }}>
            <span className="text-2xl">{t.type === 'in' ? '📥' : '📤'}</span>
            <div className="flex-1">
              <h4 className="font-bold text-sm" style={{ color:'var(--navy)' }}>{t.label}</h4>
              <p className="text-xs mt-0.5" style={{ color:'#7A91B0' }}>{t.sub}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-bold text-sm" style={{ fontFamily:'Syne,sans-serif', color: t.type==='in'?'var(--success)':'var(--danger)' }}>
                {t.type === 'in' ? '+' : '-'} {t.amount.toLocaleString('fr-FR')} F
              </div>
              <div className="text-xs" style={{ color:'#7A91B0' }}>{t.date}</div>
            </div>
          </div>
        ))}
      </div>
      <Toast toast={toast} />
    </AppShell>
  );
}
