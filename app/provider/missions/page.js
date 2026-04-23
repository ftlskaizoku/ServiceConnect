'use client';
import { useState } from 'react';
import { MessageCircle, Navigation, CheckCircle, Send, X } from 'lucide-react';
import AppShell from '@/components/AppShell';
import { Toast, useToast } from '@/components/Toast';
import { PROVIDER_MISSIONS } from '@/lib/data';
const ST={active:{label:'En cours',c:'#10B981',bg:'#D1FAE5',pulse:true},pending:{label:'Devis',c:'#D97706',bg:'#FEF3C7',pulse:false},done:{label:'Terminée',c:'#8496B0',bg:'#F4F6FA',pulse:false}};
export default function MissionsPage() {
  const [tab,setTab]=useState('all');const {toast,showToast}=useToast();
  const counts={active:PROVIDER_MISSIONS.filter(m=>m.status==='active').length,pending:PROVIDER_MISSIONS.filter(m=>m.status==='pending').length,done:PROVIDER_MISSIONS.filter(m=>m.status==='done').length};
  const tabs=[{id:'all',l:`Toutes (${PROVIDER_MISSIONS.length})`},{id:'active',l:`En cours (${counts.active})`},{id:'pending',l:`Devis (${counts.pending})`},{id:'done',l:`Terminées (${counts.done})`}];
  const filtered=tab==='all'?PROVIDER_MISSIONS:PROVIDER_MISSIONS.filter(m=>m.status===tab);
  return (
    <AppShell role="provider" title="Mes missions" subtitle="Gérez toutes vos interventions">
      <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:16 }}>
        {tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{ padding:'6px 12px', borderRadius:8, fontSize:'.78rem', fontWeight:500, border:`1.5px solid ${tab===t.id?'#0D1117':'var(--border)'}`, background:tab===t.id?'#0D1117':'white', color:tab===t.id?'white':'var(--ink-muted)', cursor:'pointer', fontFamily:'inherit' }}>{t.l}</button>)}
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {filtered.map(m=>{const st=ST[m.status];return(
          <div key={m.id} className="card" style={{ padding:16, display:'flex', gap:10, alignItems:'flex-start', borderLeft:`4px solid ${st.c}`, opacity:m.status==='done'?.8:1 }}>
            <span style={{ width:9, height:9, borderRadius:'50%', background:st.c, flexShrink:0, marginTop:5, animation:st.pulse?'pulse-dot 2s infinite':'none' }}/>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:8, marginBottom:4 }}>
                <h4 style={{ fontWeight:600, fontSize:'.86rem', color:'var(--ink)' }}>{m.title}</h4>
                <span style={{ padding:'2px 8px', borderRadius:99, fontSize:'.68rem', fontWeight:600, background:st.bg, color:st.c, flexShrink:0 }}>{st.label}</span>
              </div>
              <p style={{ fontSize:'.76rem', color:'var(--ink-muted)', marginBottom:2 }}>{m.client} · 📍 {m.location}</p>
              <p style={{ fontSize:'.72rem', color:'var(--ink-faint)', marginBottom:10 }}>{m.date}{m.rating?` · ⭐ ${m.rating}/5`:''}</p>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                {m.status==='active'&&<><button onClick={()=>showToast('Mission terminée')} className="btn btn-p" style={{ padding:'6px 12px', fontSize:'.76rem' }}><CheckCircle size={12} strokeWidth={2.5}/>Terminer</button><button onClick={()=>showToast('Chat ouvert')} className="btn btn-s" style={{ padding:'6px 12px', fontSize:'.76rem' }}><MessageCircle size={12} strokeWidth={1.8}/>Chat</button><button onClick={()=>showToast('Navigation lancée')} style={{ padding:'6px 12px', borderRadius:8, border:'1.5px solid #E0F2FE', background:'#E0F2FE', color:'#0369A1', cursor:'pointer', fontSize:'.76rem', fontWeight:600, display:'flex', alignItems:'center', gap:5, fontFamily:'inherit' }}><Navigation size={12} strokeWidth={2}/>Itinéraire</button></>}
                {m.status==='pending'&&<><button onClick={()=>showToast('Devis envoyé')} className="btn btn-p" style={{ padding:'6px 12px', fontSize:'.76rem' }}><Send size={12} strokeWidth={2}/>Envoyer devis</button><button onClick={()=>showToast('Refusée')} className="btn btn-s" style={{ padding:'6px 12px', fontSize:'.76rem' }}><X size={12} strokeWidth={2}/>Refuser</button></>}
              </div>
            </div>
            <div style={{ textAlign:'right', flexShrink:0 }}>
              <p style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'.9rem', color:m.status==='active'?'#10B981':m.status==='pending'?'#D97706':'#8496B0' }}>{m.price?`${m.price.toLocaleString('fr-FR')} F`:'—'}</p>
            </div>
          </div>
        );})}
      </div>
      <Toast toast={toast}/>
    </AppShell>
  );
}
