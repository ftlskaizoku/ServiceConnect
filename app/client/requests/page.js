'use client';
import { useState } from 'react';
import { MessageCircle, Check, X, Star, Plus } from 'lucide-react';
import AppShell from '@/components/AppShell';
import { Toast, useToast } from '@/components/Toast';
import { CLIENT_REQUESTS } from '@/lib/data';
const ST = { active:{label:'En cours',c:'#10B981',bg:'#D1FAE5',pulse:true}, pending:{label:'En attente',c:'#D97706',bg:'#FEF3C7',pulse:false}, done:{label:'Terminée',c:'#8496B0',bg:'#F4F6FA',pulse:false} };
export default function RequestsPage() {
  const [tab,setTab]=useState('all');
  const {toast,showToast}=useToast();
  const counts={pending:CLIENT_REQUESTS.filter(r=>r.status==='pending').length,active:CLIENT_REQUESTS.filter(r=>r.status==='active').length,done:CLIENT_REQUESTS.filter(r=>r.status==='done').length};
  const tabs=[{id:'all',l:`Toutes (${CLIENT_REQUESTS.length})`},{id:'pending',l:`En attente (${counts.pending})`},{id:'active',l:`En cours (${counts.active})`},{id:'done',l:`Terminées (${counts.done})`}];
  const filtered=tab==='all'?CLIENT_REQUESTS:CLIENT_REQUESTS.filter(r=>r.status===tab);
  return (
    <AppShell role="client" title="Mes demandes" subtitle="Suivez vos demandes en temps réel">
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16, flexWrap:'wrap', gap:10 }}>
        <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
          {tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{ padding:'6px 12px', borderRadius:8, fontSize:'.78rem', fontWeight:500, border:`1.5px solid ${tab===t.id?'#0D1117':'var(--border)'}`, background:tab===t.id?'#0D1117':'white', color:tab===t.id?'white':'var(--ink-muted)', cursor:'pointer', fontFamily:'inherit' }}>{t.l}</button>)}
        </div>
        <button onClick={()=>showToast('Nouvelle demande créée')} className="btn btn-p" style={{ padding:'8px 14px', fontSize:'.78rem' }}><Plus size={13} strokeWidth={2.5}/>Nouvelle</button>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {filtered.map(req=>{
          const st=ST[req.status];
          return (
            <div key={req.id} className="card" style={{ padding:16, display:'flex', gap:12, alignItems:'flex-start', borderLeft:`4px solid ${st.c}`, opacity:req.status==='done'?.8:1 }}>
              <span style={{ width:10, height:10, borderRadius:'50%', background:st.c, flexShrink:0, marginTop:4, animation:st.pulse?'pulse-dot 2s infinite':'none' }}/>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:8, marginBottom:4 }}>
                  <h4 style={{ fontWeight:600, fontSize:'.86rem', color:'var(--ink)', flex:1 }}>{req.title}</h4>
                  <span style={{ padding:'2px 8px', borderRadius:99, fontSize:'.68rem', fontWeight:600, background:st.bg, color:st.c, flexShrink:0 }}>{st.label}</span>
                </div>
                <p style={{ fontSize:'.76rem', color:'var(--ink-muted)', marginBottom:2 }}>{req.provider?`${req.provider}${req.job?` · ${req.job}`:''}`:2+' prestataires contactés'}</p>
                <p style={{ fontSize:'.72rem', color:'var(--ink-faint)', marginBottom:10 }}>📍 {req.location} · {req.date}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  {req.status==='pending'&&req.provider&&<><button onClick={()=>showToast('Devis accepté')} className="btn btn-p" style={{ padding:'6px 12px', fontSize:'.76rem' }}><Check size={12} strokeWidth={2.5}/>Accepter</button><button onClick={()=>showToast('Devis refusé')} className="btn btn-s" style={{ padding:'6px 12px', fontSize:'.76rem' }}><X size={12} strokeWidth={2}/>Refuser</button></>}
                  {req.status==='active'&&<button onClick={()=>showToast('Chat ouvert')} className="btn btn-s" style={{ padding:'6px 12px', fontSize:'.76rem' }}><MessageCircle size={12} strokeWidth={1.8}/>Chat</button>}
                  {req.status==='done'&&<button onClick={()=>showToast('Avis publié')} style={{ padding:'6px 12px', borderRadius:8, border:'1.5px solid #F59E0B', background:'#FEF3C7', color:'#92400E', cursor:'pointer', fontSize:'.76rem', fontWeight:600, display:'flex', alignItems:'center', gap:5, fontFamily:'inherit' }}><Star size={11} strokeWidth={2} fill="#F59E0B"/>Avis</button>}
                </div>
              </div>
              <div style={{ textAlign:'right', flexShrink:0 }}>
                {req.price?<div style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'.9rem', color:req.status==='active'?'#10B981':req.status==='pending'?'#D97706':'#8496B0' }}>{req.price.toLocaleString('fr-FR')} F</div>:<div style={{ fontSize:'.75rem', fontWeight:600, color:'#D97706' }}>Devis attendu</div>}
              </div>
            </div>
          );
        })}
      </div>
      <Toast toast={toast}/>
    </AppShell>
  );
}
