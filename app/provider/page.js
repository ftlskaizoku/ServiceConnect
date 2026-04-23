'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import AppShell from '@/components/AppShell';
import { Toast, useToast } from '@/components/Toast';
import InstallPrompt from '@/components/InstallPrompt';

function useCount(target, dur=1400) {
  const [v,setV]=useState(0);
  useEffect(()=>{ const s=performance.now(); const tick=n=>{ const p=Math.min((n-s)/dur,1),e=p<.5?2*p*p:-1+(4-2*p)*p; setV(target*e); if(p<1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); },[target]);
  return v;
}

const MISSIONS=[
  {title:'Installation électrique — Almadies',client:'Amadou Diallo',price:45000,status:'active',date:"Auj."},
  {title:'Réparation plomberie — Plateau',client:'Aissatou Ndiaye',price:30000,status:'pending',date:"Auj."},
  {title:'Peinture intérieure — Ouakam',client:'Moussa Ba',price:80000,status:'done',date:'Hier',rating:5},
  {title:'Maintenance PC — Grand Yoff',client:'Ibrahima Sow',price:15000,status:'done',date:'–2j',rating:4.5},
];

export default function ProviderDashboard() {
  const {toast,showToast}=useToast();
  const rev=useCount(155000), rat=useCount(4.8), mis=useCount(12);
  const KPIS=[['💰','Revenus',`${Math.round(rev).toLocaleString('fr-FR')} F`,'+14%','#F59E0B'],['⭐','Note',rat.toFixed(1)+' ★','32 avis','#0EA5E9'],['✅','Missions',Math.round(mis),'Ce mois','#10B981'],['📩','Attente','3','Répondre','#F43F5E']];
  const SC={active:{c:'#10B981',pulse:true},pending:{c:'#D97706',pulse:false},done:{c:'#8496B0',pulse:false}};
  return (
    <AppShell role="provider" title="Bonjour, Moussa 👋" subtitle="Vue d'ensemble de votre activité">
      <div className="au" style={{ borderRadius:16, padding:'20px 22px', marginBottom:20, background:'linear-gradient(135deg,#0f2519,#0a5c3e)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'-30%', right:'-5%', width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle,#F59E0B22,transparent 70%)' }}/>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
          <span style={{ width:7, height:7, borderRadius:'50%', background:'#10B981' }}/>
          <span style={{ fontSize:'.78rem', color:'rgba(255,255,255,.5)' }}>Profil vu par <strong style={{ color:'rgba(255,255,255,.8)' }}>47 personnes</strong> aujourd'hui</span>
        </div>
        <p style={{ fontSize:'.84rem', color:'rgba(255,255,255,.65)', marginBottom:14 }}><strong style={{ color:'#F59E0B' }}>3 nouvelles demandes</strong> ce matin</p>
        <Link href="/provider/missions" style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px', borderRadius:10, background:'#F59E0B', color:'#0D1117', fontSize:'.8rem', fontWeight:600, textDecoration:'none' }}>
          Voir les demandes <ArrowRight size={13} strokeWidth={2.5}/>
        </Link>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, marginBottom:20 }}>
        {KPIS.map(([icon,label,value,sub,accent])=>(
          <div key={label} className="card" style={{ padding:16, position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:accent }}/>
            <p style={{ fontSize:'.68rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color:'var(--ink-faint)', marginBottom:6 }}>{label}</p>
            <p style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'1.4rem', color:'var(--ink)' }}>{value}</p>
            <p style={{ fontSize:'.7rem', color:'var(--ink-faint)', marginTop:3 }}>{sub}</p>
          </div>
        ))}
      </div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
          <TrendingUp size={13} strokeWidth={2} style={{ color:'#F59E0B' }}/>
          <h2 style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'1rem', fontWeight:400 }}>Missions récentes</h2>
        </div>
        <Link href="/provider/missions" style={{ fontSize:'.76rem', color:'var(--ink-faint)', textDecoration:'none', display:'flex', alignItems:'center', gap:3 }}>Toutes<ArrowRight size={11}/></Link>
      </div>
      <div className="card" style={{ overflow:'hidden' }}>
        {MISSIONS.map((m,i)=>{
          const sc=SC[m.status];
          return <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 16px', borderBottom:i<MISSIONS.length-1?'1px solid var(--border)':'none', opacity:m.status==='done'?.7:1 }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:sc.c, flexShrink:0, animation:sc.pulse?'pulse-dot 2s infinite':'none' }}/>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:'.84rem', fontWeight:500, color:'var(--ink)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{m.title}</p>
              <p style={{ fontSize:'.72rem', color:'var(--ink-faint)' }}>{m.client}{m.rating?` · ⭐ ${m.rating}`:''}</p>
            </div>
            <div style={{ textAlign:'right', flexShrink:0 }}>
              <p style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'.88rem', color:m.status==='active'?'#10B981':m.status==='pending'?'#D97706':'#8496B0' }}>{m.price.toLocaleString('fr-FR')} F</p>
              <p style={{ fontSize:'.7rem', color:'var(--ink-faint)' }}>{m.date}</p>
            </div>
          </div>;
        })}
      </div>
      <Toast toast={toast}/>
      <InstallPrompt />
    </AppShell>
  );
}
