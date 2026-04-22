'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Search, ClipboardList, Settings, LayoutDashboard, Briefcase, Users, CreditCard, UserCircle, Zap, LogOut } from 'lucide-react';

const clientNav = [
  { icon: Home,          label: 'Accueil',        href: '/client' },
  { icon: Map,           label: 'Carte',          href: '/client/map',       badge: 'NEW' },
  { icon: Search,        label: 'Prestataires',   href: '/client/providers' },
  { icon: ClipboardList, label: 'Mes demandes',   href: '/client/requests',  badge: '2' },
  { icon: Settings,      label: 'Paramètres',     href: '/client/settings' },
];
const providerNav = [
  { icon: LayoutDashboard, label: 'Dashboard',   href: '/provider' },
  { icon: Briefcase,       label: 'Missions',    href: '/provider/missions', badge: '3' },
  { icon: Users,           label: 'Clients',     href: '/provider/clients' },
  { icon: CreditCard,      label: 'Paiements',   href: '/provider/payments' },
  { icon: UserCircle,      label: 'Mon profil',  href: '/provider/profile' },
];

export default function Sidebar({ role = 'client' }) {
  const pathname = usePathname();
  const nav = role === 'client' ? clientNav : providerNav;
  const name = role === 'client' ? 'Fatou Diallo' : 'Moussa Badiane';
  const initials = role === 'client' ? 'FD' : 'MB';

  return (
    <>
      <aside className="sc-sidebar">
        <div className="sc-logo">
          <div className="sc-logo-icon"><Zap size={15} strokeWidth={2.5} /></div>
          <span className="sc-logo-text">ServiceConnect</span>
        </div>
        <nav className="sc-nav">
          <p className="sc-nav-label">Menu</p>
          {nav.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/client' && item.href !== '/provider' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} className={`sc-nav-item${isActive ? ' active' : ''}`}>
                <span className="sc-nav-icon"><Icon size={17} strokeWidth={isActive ? 2.5 : 1.8} /></span>
                <span className="sc-nav-text">{item.label}</span>
                {item.badge && <span className={`sc-badge ${item.badge === 'NEW' ? 'green' : 'amber'}`}>{item.badge}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="sc-footer">
          <div className="sc-user">
            <div className="sc-av">{initials}</div>
            <div className="sc-user-info">
              <span className="sc-user-name">{name}</span>
              <span className="sc-user-role">{role === 'client' ? 'Client' : 'Prestataire'}</span>
            </div>
          </div>
          <Link href="/" className="sc-logout">
            <LogOut size={15} strokeWidth={1.8} />
            <span className="sc-nav-text">Changer de rôle</span>
          </Link>
        </div>
      </aside>
      <style>{`
        .sc-sidebar {
          position:fixed; top:0; left:0; height:100vh;
          width:64px; background:var(--ink); display:flex; flex-direction:column;
          z-index:50; transition:width .25s cubic-bezier(.16,1,.3,1); overflow:hidden;
        }
        .sc-sidebar:hover { width:252px; }
        .sc-logo {
          display:flex; align-items:center; gap:11px; padding:18px 18px 16px;
          border-bottom:1px solid rgba(255,255,255,.07); flex-shrink:0;
        }
        .sc-logo-icon {
          width:28px; height:28px; border-radius:8px; flex-shrink:0;
          background:var(--amber); color:var(--ink);
          display:flex; align-items:center; justify-content:center;
        }
        .sc-logo-text { font-family:'DM Serif Display',serif; font-size:.95rem; color:white; white-space:nowrap; opacity:0; transition:opacity .15s; }
        .sc-sidebar:hover .sc-logo-text { opacity:1; }
        .sc-nav { flex:1; padding:10px 8px; overflow-y:auto; overflow-x:hidden; }
        .sc-nav-label { font-size:.62rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:rgba(255,255,255,.2); padding:8px 12px 6px; white-space:nowrap; opacity:0; transition:opacity .15s; }
        .sc-sidebar:hover .sc-nav-label { opacity:1; }
        .sc-nav-item { display:flex; align-items:center; gap:12px; padding:9px 12px; border-radius:10px; color:rgba(255,255,255,.45); text-decoration:none; transition:all .15s; margin-bottom:2px; white-space:nowrap; }
        .sc-nav-item:hover { background:rgba(255,255,255,.07); color:rgba(255,255,255,.9); }
        .sc-nav-item.active { background:rgba(245,158,11,.13); color:var(--amber); }
        .sc-nav-icon { flex-shrink:0; width:20px; display:flex; align-items:center; justify-content:center; }
        .sc-nav-text { font-size:.86rem; font-weight:500; opacity:0; transition:opacity .15s; flex:1; }
        .sc-sidebar:hover .sc-nav-text { opacity:1; }
        .sc-badge { font-size:.62rem; font-weight:700; padding:2px 6px; border-radius:99px; opacity:0; transition:opacity .15s; }
        .sc-sidebar:hover .sc-badge { opacity:1; }
        .sc-badge.amber { background:var(--amber); color:var(--ink); }
        .sc-badge.green { background:var(--emerald); color:white; font-size:.6rem; }
        .sc-footer { padding:10px 8px; border-top:1px solid rgba(255,255,255,.07); flex-shrink:0; }
        .sc-user { display:flex; align-items:center; gap:10px; padding:8px 12px; margin-bottom:2px; }
        .sc-av { width:28px; height:28px; border-radius:8px; flex-shrink:0; background:linear-gradient(135deg,var(--amber),#d97706); display:flex; align-items:center; justify-content:center; font-size:.7rem; font-weight:700; color:var(--ink); }
        .sc-user-info { opacity:0; transition:opacity .15s; white-space:nowrap; }
        .sc-sidebar:hover .sc-user-info { opacity:1; }
        .sc-user-name { display:block; font-size:.8rem; font-weight:600; color:white; }
        .sc-user-role { font-size:.68rem; color:rgba(255,255,255,.3); }
        .sc-logout { display:flex; align-items:center; gap:12px; padding:9px 12px; border-radius:10px; color:rgba(255,255,255,.28); text-decoration:none; transition:all .15s; white-space:nowrap; }
        .sc-logout:hover { background:rgba(244,63,94,.1); color:#f87171; }
      `}</style>
    </>
  );
}
