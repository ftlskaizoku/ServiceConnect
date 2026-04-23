'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, MapPin, TrendingUp } from 'lucide-react';
import AppShell from '@/components/AppShell';
import ProviderCard from '@/components/ProviderCard';
import ProviderModal from '@/components/ProviderModal';
import { Toast, useToast } from '@/components/Toast';
import InstallPrompt from '@/components/InstallPrompt';
import { PROVIDERS, SERVICES } from '@/lib/data';

export default function ClientHome() {
  const [sel, setSel] = useState(null);
  const { toast, showToast } = useToast();
  const featured = [...PROVIDERS].sort((a,b)=>b.rating-a.rating).slice(0,4);

  return (
    <AppShell role="client" title="Bonjour, Fatou 👋" subtitle="Que cherchez-vous aujourd'hui ?">
      {/* Hero banner */}
      <div className="au" style={{ borderRadius:16, padding:'20px 22px', marginBottom:20, background:'linear-gradient(135deg,#0D1117 0%,#1C2333 100%)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'-30%', right:'-5%', width:220, height:220, borderRadius:'50%', background:'radial-gradient(circle,#F59E0B22,transparent 70%)' }}/>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
          <span style={{ width:7, height:7, borderRadius:'50%', background:'#10B981', animation:'pulse-dot 2s infinite' }}/>
          <span style={{ fontSize:'.78rem', color:'rgba(255,255,255,.55)' }}>
            <strong style={{ color:'#10B981' }}>1 prestataire</strong> disponible à 1.2 km
          </span>
        </div>
        <p style={{ fontSize:'.84rem', color:'rgba(255,255,255,.65)', marginBottom:14 }}>
          <strong style={{ color:'#F59E0B' }}>2 devis</strong> en attente de réponse
        </p>
        <Link href="/client/map" style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px', borderRadius:10, background:'#F59E0B', color:'#0D1117', fontSize:'.8rem', fontWeight:600, textDecoration:'none' }}>
          <MapPin size={13} strokeWidth={2.5}/> Voir sur la carte <ArrowRight size={13} strokeWidth={2.5}/>
        </Link>
      </div>

      {/* Services */}
      <h2 className="au" style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'1rem', fontWeight:400, marginBottom:12 }}>Services</h2>
      <div className="au" style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:8, marginBottom:24 }}>
        {SERVICES.map(s => (
          <Link key={s.label} href={`/client/providers?cat=${s.cat}`} style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'12px 6px', background:'white', border:'1px solid var(--border)', borderRadius:12, textDecoration:'none', transition:'all .2s', cursor:'pointer' }}
            onMouseEnter={e=>{e.currentTarget.style.background='#0D1117';e.currentTarget.style.borderColor='#0D1117';e.currentTarget.querySelectorAll('span,p').forEach(el=>{el.style.color='rgba(255,255,255,.7)';});e.currentTarget.querySelector('h4').style.color='white';}}
            onMouseLeave={e=>{e.currentTarget.style.background='white';e.currentTarget.style.borderColor='var(--border)';e.currentTarget.querySelectorAll('span,p').forEach(el=>{el.style.color='';});e.currentTarget.querySelector('h4').style.color='var(--ink)';}}>
            <span style={{ fontSize:'1.4rem', marginBottom:5, display:'block' }}>{s.icon}</span>
            <h4 style={{ fontSize:'.72rem', fontWeight:600, color:'var(--ink)', fontFamily:'inherit', textAlign:'center' }}>{s.label}</h4>
            <p style={{ fontSize:'.65rem', color:'var(--ink-faint)', marginTop:1 }}>{s.count}</p>
          </Link>
        ))}
      </div>

      {/* Top providers */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
          <TrendingUp size={14} strokeWidth={2} style={{ color:'#F59E0B' }}/>
          <h2 style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'1rem', fontWeight:400 }}>Meilleurs prestataires</h2>
        </div>
        <Link href="/client/providers" style={{ fontSize:'.78rem', color:'var(--ink-muted)', textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
          Voir tous <ArrowRight size={12} strokeWidth={2}/>
        </Link>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:12 }}>
        {featured.map(p => (
          <ProviderCard key={p.id} provider={p} onClick={()=>setSel(p)} onContact={()=>showToast(`Demande envoyée à ${p.name}`)}/>
        ))}
      </div>

      <ProviderModal provider={sel} onClose={()=>setSel(null)} onContact={p=>showToast(`Demande envoyée à ${p.name}`)}/>
      <Toast toast={toast}/>
      <InstallPrompt />
    </AppShell>
  );
}
