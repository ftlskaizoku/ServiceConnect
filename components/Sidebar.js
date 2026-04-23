'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Search, ClipboardList, Settings, LayoutDashboard, Briefcase, Users, CreditCard, UserCircle, Zap, LogOut, Shield } from 'lucide-react';

const C_NAV = [
  { icon:Home,          label:'Accueil',       href:'/client',           badge:null },
  { icon:Map,           label:'Carte',         href:'/client/map',       badge:'NEW', badgeBg:'#10B981', badgeC:'#fff' },
  { icon:Search,        label:'Prestataires',  href:'/client/providers', badge:null },
  { icon:ClipboardList, label:'Mes demandes',  href:'/client/requests',  badge:'2',   badgeBg:'#F59E0B', badgeC:'#0D1117' },
  { icon:Settings,      label:'Paramètres',    href:'/client/settings',  badge:null },
];
const P_NAV = [
  { icon:LayoutDashboard, label:'Dashboard',  href:'/provider',           badge:null },
  { icon:Briefcase,       label:'Missions',   href:'/provider/missions',  badge:'3', badgeBg:'#F59E0B', badgeC:'#0D1117' },
  { icon:Users,           label:'Clients',    href:'/provider/clients',   badge:null },
  { icon:CreditCard,      label:'Paiements',  href:'/provider/payments',  badge:null },
  { icon:UserCircle,      label:'Mon profil', href:'/provider/profile',   badge:null },
];

function SidebarInner({ role }) {
  const pathname = usePathname();
  const nav = role === 'client' ? C_NAV : P_NAV;
  const name = role === 'client' ? 'Fatou Diallo' : 'Moussa Badiane';
  const initials = role === 'client' ? 'FD' : 'MB';
  const [hov, setHov] = useState(false);

  const W = hov ? 252 : 64;

  return (
    <div style={{ position:'fixed', top:0, left:0, height:'100vh', width:W, background:'#0D1117', display:'flex', flexDirection:'column', zIndex:100, overflow:'hidden', transition:'width .25s cubic-bezier(.16,1,.3,1)', flexShrink:0 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {/* Logo */}
      <div style={{ display:'flex', alignItems:'center', gap:12, padding:'18px 18px 16px', borderBottom:'1px solid rgba(255,255,255,.07)', flexShrink:0 }}>
        <div style={{ width:28, height:28, borderRadius:8, background:'#F59E0B', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <Zap size={15} strokeWidth={2.5} style={{ color:'#0D1117' }} />
        </div>
        <span style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'.95rem', color:'white', whiteSpace:'nowrap', opacity: hov?1:0, transition:'opacity .15s' }}>ServiceConnect</span>
      </div>
      {/* Nav */}
      <nav style={{ flex:1, padding:'10px 8px', overflowY:'auto', overflowX:'hidden' }}>
        <p style={{ fontSize:'.62rem', fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.2)', padding:'8px 12px 6px', whiteSpace:'nowrap', opacity:hov?1:0, transition:'opacity .15s' }}>Menu</p>
        {nav.map(item => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href !== '/client' && item.href !== '/provider' && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} style={{ display:'flex', alignItems:'center', gap:12, padding:'9px 12px', borderRadius:10, color: active?'#F59E0B':'rgba(255,255,255,.5)', textDecoration:'none', marginBottom:2, whiteSpace:'nowrap', background: active?'rgba(245,158,11,.12)':'transparent', transition:'all .15s' }}
              onMouseEnter={e => { if(!active){e.currentTarget.style.background='rgba(255,255,255,.06)'; e.currentTarget.style.color='rgba(255,255,255,.9)'; }}}
              onMouseLeave={e => { if(!active){e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(255,255,255,.5)'; }}}>
              <span style={{ flexShrink:0, width:20, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon size={17} strokeWidth={active?2.5:1.8} />
              </span>
              <span style={{ fontSize:'.86rem', fontWeight:500, opacity:hov?1:0, transition:'opacity .15s', flex:1 }}>{item.label}</span>
              {item.badge && <span style={{ fontSize:'.62rem', fontWeight:700, padding:'2px 6px', borderRadius:99, background:item.badgeBg, color:item.badgeC, opacity:hov?1:0, transition:'opacity .15s' }}>{item.badge}</span>}
            </Link>
          );
        })}
        <Link href="/admin" style={{ display:'flex', alignItems:'center', gap:12, padding:'9px 12px', borderRadius:10, color:'rgba(255,255,255,.25)', textDecoration:'none', marginTop:8, whiteSpace:'nowrap', transition:'all .15s' }}
          onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,.05)'; e.currentTarget.style.color='rgba(255,255,255,.6)'; }}
          onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(255,255,255,.25)'; }}>
          <span style={{ flexShrink:0, width:20, display:'flex', alignItems:'center', justifyContent:'center' }}><Shield size={15} strokeWidth={1.8} /></span>
          <span style={{ fontSize:'.8rem', fontWeight:500, opacity:hov?1:0, transition:'opacity .15s' }}>Admin</span>
        </Link>
      </nav>
      {/* Footer */}
      <div style={{ padding:'10px 8px', borderTop:'1px solid rgba(255,255,255,.07)', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 12px', marginBottom:4 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg,#F59E0B,#d97706)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.7rem', fontWeight:700, color:'#0D1117', flexShrink:0 }}>{initials}</div>
          <div style={{ opacity:hov?1:0, transition:'opacity .15s', whiteSpace:'nowrap' }}>
            <div style={{ fontSize:'.8rem', fontWeight:600, color:'white' }}>{name}</div>
            <div style={{ fontSize:'.68rem', color:'rgba(255,255,255,.35)' }}>{role==='client'?'Client':'Prestataire'}</div>
          </div>
        </div>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:12, padding:'9px 12px', borderRadius:10, color:'rgba(255,255,255,.28)', textDecoration:'none', whiteSpace:'nowrap', transition:'all .15s' }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(244,63,94,.1)';e.currentTarget.style.color='#f87171';}}
          onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='rgba(255,255,255,.28)';}}>
          <span style={{ flexShrink:0, width:20, display:'flex', alignItems:'center', justifyContent:'center' }}><LogOut size={15} strokeWidth={1.8} /></span>
          <span style={{ fontSize:'.82rem', fontWeight:500, opacity:hov?1:0, transition:'opacity .15s' }}>Changer de rôle</span>
        </Link>
      </div>
    </div>
  );
}

export default SidebarInner;
