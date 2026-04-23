'use client';
import { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import AppShell from '@/components/AppShell';
import { Toast, useToast } from '@/components/Toast';
import { TRANSACTIONS } from '@/lib/data';
export default function PaymentsPage() {
  const [pay,setPay]=useState('wave'); const [amt,setAmt]=useState('');
  const {toast,showToast}=useToast();
  return (
    <AppShell role="provider" title="Paiements" subtitle="Revenus et retraits">
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, marginBottom:16 }}>
        {[['Solde dispo','87 500 F','#10B981'],['Ce mois','155 000 F','#F59E0B'],['Total','1.2M F','#0EA5E9'],['En attente','63 000 F','#8496B0']].map(([l,v,c])=>(
          <div key={l} className="card" style={{ padding:14, position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:c }}/>
            <p style={{ fontSize:'.7rem', color:'var(--ink-faint)', marginBottom:4 }}>{l}</p>
            <p style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'1.1rem', color:c }}>{v}</p>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding:16, marginBottom:14 }}>
        <h3 style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'.95rem', fontWeight:400, marginBottom:12 }}>Retirer des fonds</h3>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:12 }}>
          {[['wave','Wave','77 *** 67'],['om','Orange Money','77 *** 89']].map(([id,name,num])=>(
            <button key={id} onClick={()=>setPay(id)} style={{ padding:'10px 12px', borderRadius:10, border:`1.5px solid ${pay===id?'#0D1117':'var(--border)'}`, background:pay===id?'var(--s2)':'white', cursor:'pointer', textAlign:'left', fontFamily:'inherit' }}>
              <div style={{ fontWeight:600, fontSize:'.84rem', color:'var(--ink)' }}>{name}</div>
              <div style={{ fontSize:'.72rem', color:'var(--ink-faint)', marginTop:2 }}>{num}</div>
            </button>
          ))}
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <input type="number" value={amt} onChange={e=>setAmt(e.target.value)} placeholder="Montant en FCFA" className="inp"/>
          <button onClick={()=>{showToast(`Retrait de ${Number(amt||0).toLocaleString('fr-FR')} F initié`);setAmt('');}} className="btn btn-p" style={{ padding:'10px 16px', fontSize:'.84rem', flexShrink:0 }}>Retirer</button>
        </div>
      </div>
      <h3 style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'.95rem', fontWeight:400, marginBottom:10 }}>Transactions récentes</h3>
      <div className="card" style={{ overflow:'hidden' }}>
        {TRANSACTIONS.map((t,i)=>(
          <div key={t.id} style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 16px', borderBottom:i<TRANSACTIONS.length-1?'1px solid var(--border)':'none' }}>
            <div style={{ width:34, height:34, borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', background:t.type==='in'?'#D1FAE5':'#FFE4E6', flexShrink:0 }}>
              {t.type==='in'?<ArrowDownLeft size={14} strokeWidth={2.5} style={{ color:'#10B981' }}/>:<ArrowUpRight size={14} strokeWidth={2.5} style={{ color:'#F43F5E' }}/>}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontWeight:500, fontSize:'.84rem', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{t.label}</p>
              <p style={{ fontSize:'.72rem', color:'var(--ink-faint)' }}>{t.sub}</p>
            </div>
            <div style={{ textAlign:'right', flexShrink:0 }}>
              <p style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'.88rem', color:t.type==='in'?'#10B981':'#F43F5E' }}>{t.type==='in'?'+':'-'} {t.amount.toLocaleString('fr-FR')} F</p>
              <p style={{ fontSize:'.7rem', color:'var(--ink-faint)' }}>{t.date}</p>
            </div>
          </div>
        ))}
      </div>
      <Toast toast={toast}/>
    </AppShell>
  );
}
