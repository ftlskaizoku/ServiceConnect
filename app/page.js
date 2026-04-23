'use client';
import Link from 'next/link';
import { Zap, ArrowRight, Star, Shield, Smartphone } from 'lucide-react';

export default function Home() {
  return (
    <div style={{ minHeight:'100vh', background:'#0D1117', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden', padding:'24px' }}>
      {/* Grid texture */}
      <div style={{ position:'absolute', inset:0, opacity:.15, backgroundImage:'radial-gradient(circle at 1px 1px, rgba(255,255,255,.15) 1px, transparent 0)', backgroundSize:'28px 28px' }} />
      <div style={{ position:'absolute', top:'-20%', left:'-10%', width:500, height:500, borderRadius:'50%', opacity:.07, background:'radial-gradient(circle, #F59E0B, transparent 70%)' }} />
      <div style={{ position:'absolute', bottom:'-15%', right:'-5%', width:400, height:400, borderRadius:'50%', opacity:.06, background:'radial-gradient(circle, #10B981, transparent 70%)' }} />

      <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:420, textAlign:'center' }} className="au">
        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, marginBottom:28 }}>
          <div style={{ width:44, height:44, borderRadius:14, background:'#F59E0B', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <Zap size={22} strokeWidth={2.5} style={{ color:'#0D1117' }} />
          </div>
          <span style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'1.4rem', color:'white' }}>ServiceConnect</span>
        </div>

        <h1 style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'clamp(1.8rem,5vw,2.6rem)', fontWeight:400, color:'white', lineHeight:1.2, marginBottom:14 }}>
          Le bon prestataire,{' '}
          <em style={{ fontStyle:'italic', color:'#F59E0B' }}>près de vous.</em>
        </h1>
        <p style={{ fontSize:'.9rem', color:'rgba(255,255,255,.5)', lineHeight:1.7, marginBottom:36 }}>
          Trouvez des professionnels vérifiés au Sénégal. Comparez, contactez et payez en toute sécurité via Mobile Money.
        </p>

        {/* Role cards */}
        <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:36 }}>
          {[
            { href:'/client', emoji:'🔍', title:'Je cherche un service', desc:'Trouvez et contactez des pros vérifiés', color:'rgba(245,158,11,' },
            { href:'/provider', emoji:'🛠️', title:'Je propose mes services', desc:'Développez votre activité en ligne', color:'rgba(16,185,129,' },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{ display:'flex', alignItems:'center', gap:14, padding:'16px 18px', borderRadius:16, border:'1px solid rgba(255,255,255,.1)', background:'rgba(255,255,255,.05)', textDecoration:'none', transition:'all .2s' }}
              onMouseEnter={e=>{e.currentTarget.style.background=`${item.color}.1)`;e.currentTarget.style.borderColor=`${item.color}.3)`;}}
              onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.05)';e.currentTarget.style.borderColor='rgba(255,255,255,.1)';}}>
              <div style={{ width:48, height:48, borderRadius:14, background:'rgba(255,255,255,.07)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem', flexShrink:0 }}>{item.emoji}</div>
              <div style={{ flex:1, textAlign:'left' }}>
                <div style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'1rem', color:'white', marginBottom:3 }}>{item.title}</div>
                <div style={{ fontSize:'.8rem', color:'rgba(255,255,255,.4)' }}>{item.desc}</div>
              </div>
              <ArrowRight size={16} strokeWidth={2} style={{ color:'rgba(255,255,255,.3)', flexShrink:0 }} />
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display:'flex', justifyContent:'center', gap:28 }}>
          {[[Star,'4.8','Note moy.'],[Shield,'1 200+','Prestataires'],[Smartphone,'8 500+','Missions']].map(([Icon,v,l]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <Icon size={14} strokeWidth={1.8} style={{ color:'rgba(255,255,255,.3)', display:'block', margin:'0 auto 4px' }} />
              <div style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'1rem', color:'white' }}>{v}</div>
              <div style={{ fontSize:'.72rem', color:'rgba(255,255,255,.3)' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
