'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Menu, Home, Map, Search, ClipboardList, LayoutDashboard, Briefcase, Users, CreditCard } from 'lucide-react';
import Sidebar from './Sidebar';

const C_ITEMS = [
  {icon:Home, label:'Accueil', href:'/client'},
  {icon:Map, label:'Carte', href:'/client/map'},
  {icon:Search, label:'Rechercher', href:'/client/providers'},
  {icon:ClipboardList, label:'Demandes', href:'/client/requests'},
];
const P_ITEMS = [
  {icon:LayoutDashboard, label:'Dashboard', href:'/provider'},
  {icon:Briefcase, label:'Missions', href:'/provider/missions'},
  {icon:Users, label:'Clients', href:'/provider/clients'},
  {icon:CreditCard, label:'Paiements', href:'/provider/payments'},
];

export default function AppShell({ role, title, subtitle, children }) {
  const pathname = usePathname();
  const [mobOpen, setMobOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const items = role === 'client' ? C_ITEMS : P_ITEMS;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div style={{ minHeight:'100vh', background:'var(--s2)', display:'flex' }}>
      {/* Desktop sidebar */}
      {!isMobile && <Sidebar role={role} />}

      {/* Mobile overlay */}
      {isMobile && mobOpen && (
        <div style={{ position:'fixed', inset:0, zIndex:200 }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(13,17,23,.6)' }} onClick={() => setMobOpen(false)} />
          <div style={{ position:'relative', zIndex:1 }}><Sidebar role={role} /></div>
        </div>
      )}

      {/* Main content */}
      <div style={{ flex:1, minWidth:0, marginLeft: isMobile ? 0 : 64, display:'flex', flexDirection:'column', transition:'margin-left .25s' }}>
        {/* Topbar */}
        <header className="glass" style={{ position:'sticky', top:0, zIndex:50, borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', height:56, flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            {isMobile && (
              <button onClick={() => setMobOpen(true)} style={{ width:36, height:36, borderRadius:9, border:'1.5px solid var(--border)', background:'var(--s2)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Menu size={17} strokeWidth={1.8} style={{ color:'var(--ink-muted)' }} />
              </button>
            )}
            <div>
              <h1 style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'1.1rem', fontWeight:400, color:'var(--ink)', lineHeight:1.2 }}>{title}</h1>
              {subtitle && <p style={{ fontSize:'.75rem', color:'var(--ink-faint)', marginTop:1 }}>{subtitle}</p>}
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <button style={{ position:'relative', width:36, height:36, borderRadius:9, border:'1.5px solid var(--border)', background:'var(--s2)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Bell size={16} strokeWidth={1.8} style={{ color:'var(--ink-muted)' }} />
              <span style={{ position:'absolute', top:7, right:7, width:7, height:7, borderRadius:'50%', background:'var(--rose)', border:'1.5px solid white' }} />
            </button>
            <div style={{ width:34, height:34, borderRadius:'50%', background:'linear-gradient(135deg,var(--ink),var(--ink-soft))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.72rem', fontWeight:700, color:'white', cursor:'pointer' }}>
              {role==='client'?'FD':'MB'}
            </div>
          </div>
        </header>

        <main style={{ flex:1, padding:'24px 20px', paddingBottom: isMobile ? 80 : 24 }}>
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      {isMobile && (
        <nav style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:60, background:'rgba(255,255,255,.92)', backdropFilter:'blur(16px)', borderTop:'1px solid var(--border)', display:'flex' }}>
          {items.map(item => {
            const Icon = item.icon;
            const active = pathname === item.href || (item.href !== '/client' && item.href !== '/provider' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3, padding:'10px 4px', color: active ? 'var(--ink)' : 'var(--ink-faint)', fontSize:'.6rem', fontWeight:600, textDecoration:'none', transition:'color .15s' }}>
                <Icon size={20} strokeWidth={active?2.2:1.8} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
