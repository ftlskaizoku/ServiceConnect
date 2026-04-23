'use client';
import { useState } from 'react';
import { Search, MessageCircle } from 'lucide-react';
import AppShell from '@/components/AppShell';
import { Toast, useToast } from '@/components/Toast';
const CLIENTS=[{id:1,name:'Amadou Diallo',initials:'AD',color:'#0B3D91',missions:3,location:'Almadies',total:108000,loyal:true},{id:2,name:'Bineta Traoré',initials:'BT',color:'#C2185B',missions:1,location:'Ouakam',total:18000},{id:3,name:'Aissatou Ndiaye',initials:'AN',color:'#1B5E20',missions:2,location:'Plateau',total:45000,loyal:true},{id:4,name:'Moussa Ba',initials:'MB',color:'#00695C',missions:1,location:'Ouakam',total:80000,rating:5},{id:5,name:'Ibrahima Sow',initials:'IS',color:'#0277BD',missions:1,location:'Grand Yoff',total:15000,rating:4.5}];
export default function ClientsPage() {
  const [search,setSearch]=useState('');
  const {toast,showToast}=useToast();
  const filtered=CLIENTS.filter(c=>c.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <AppShell role="provider" title="Mes clients" subtitle="Votre base clients">
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:16 }}>
        {[['24','Clients total'],['11','Fidèles'],['4.8★','Note']].map(([v,l])=>(
          <div key={l} className="card" style={{ padding:14, textAlign:'center' }}>
            <div style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'1.2rem', color:'var(--ink)' }}>{v}</div>
            <div style={{ fontSize:'.72rem', color:'var(--ink-faint)', marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:10, background:'white', border:'1.5px solid var(--border)', borderRadius:11, padding:'9px 14px', marginBottom:12 }}>
        <Search size={14} strokeWidth={1.8} style={{ color:'var(--ink-faint)', flexShrink:0 }}/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher un client…" className="inp" style={{ border:'none', outline:'none', padding:0, flex:1, fontSize:'.86rem' }}/>
      </div>
      <div className="card" style={{ overflow:'hidden' }}>
        {filtered.map((c,i)=>(
          <div key={c.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', borderBottom:i<filtered.length-1?'1px solid var(--border)':'none', opacity:c.rating&&c.missions<2?.75:1 }}>
            <div style={{ width:38, height:38, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', background:c.color, color:'white', fontSize:'.78rem', fontWeight:700, flexShrink:0 }}>{c.initials}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ fontWeight:600, fontSize:'.86rem', color:'var(--ink)' }}>{c.name}</span>
                {c.loyal&&<span className="badge bg">Fidèle</span>}
              </div>
              <p style={{ fontSize:'.72rem', color:'var(--ink-faint)' }}>{c.missions} mission{c.missions>1?'s':''} · {c.location}{c.rating?` · ★ ${c.rating}`:''}</p>
            </div>
            <div style={{ textAlign:'right', flexShrink:0 }}>
              <div style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'.88rem', color:'var(--ink)' }}>{c.total.toLocaleString('fr-FR')} F</div>
              <button onClick={()=>showToast(`Chat ouvert avec ${c.name}`)} style={{ background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:4, fontSize:'.72rem', color:'var(--ink-muted)', fontFamily:'inherit', marginLeft:'auto', marginTop:3 }}>
                <MessageCircle size={11} strokeWidth={1.8}/>Chat
              </button>
            </div>
          </div>
        ))}
      </div>
      <Toast toast={toast}/>
    </AppShell>
  );
}
