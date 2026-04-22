'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const clientNav = [
  { icon: '🏠', label: 'Accueil', href: '/client' },
  { icon: '🗺️', label: 'Carte', href: '/client/map', badge: 'Nouveau' },
  { icon: '🔍', label: 'Prestataires', href: '/client/providers' },
  { icon: '📋', label: 'Mes demandes', href: '/client/requests', badge: '2' },
  { icon: '⚙️', label: 'Paramètres', href: '/client/settings' },
];

const providerNav = [
  { icon: '📊', label: 'Dashboard', href: '/provider' },
  { icon: '📋', label: 'Missions', href: '/provider/missions', badge: '3' },
  { icon: '👥', label: 'Clients', href: '/provider/clients' },
  { icon: '💳', label: 'Paiements', href: '/provider/payments' },
  { icon: '👤', label: 'Mon profil', href: '/provider/profile' },
];

export default function Sidebar({ role = 'client' }) {
  const pathname = usePathname();
  const nav = role === 'client' ? clientNav : providerNav;
  const name = role === 'client' ? 'Fatou Diallo' : 'Moussa Badiane';
  const initials = role === 'client' ? 'FD' : 'MB';
  const roleLabel = role === 'client' ? 'Client' : 'Prestataire';

  return (
    <aside className="fixed top-0 left-0 h-screen w-[260px] flex flex-col z-50" style={{ background: 'var(--navy)' }}>
      {/* Logo */}
      <div className="px-5 py-6 border-b" style={{ borderColor: 'rgba(255,255,255,.07)' }}>
        <h1 className="text-white text-xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
          Service<span style={{ color: 'var(--gold)' }}>Connect</span>
        </h1>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,.4)' }}>Sénégal · Plateforme de services</p>
      </div>

      {/* User */}
      <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,.07)' }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, var(--gold), var(--teal))', color: 'var(--navy)' }}>
          {initials}
        </div>
        <div>
          <strong className="block text-sm text-white">{name}</strong>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,.4)' }}>{roleLabel}</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        <p className="px-5 py-2 text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,.3)' }}>
          Menu principal
        </p>
        {nav.map(item => {
          const isActive = pathname === item.href || (item.href !== '/client' && item.href !== '/provider' && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium transition-all duration-150 border-l-[3px]"
              style={{
                color: isActive ? 'white' : 'rgba(255,255,255,.6)',
                background: isActive ? 'rgba(232,160,32,.1)' : 'transparent',
                borderLeftColor: isActive ? 'var(--gold)' : 'transparent',
                textDecoration: 'none',
              }}>
              <span className="w-5 text-center">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                  style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,.07)' }}>
        <Link href="/" className="text-sm flex items-center gap-2" style={{ color: 'rgba(255,255,255,.4)', textDecoration: 'none' }}>
          ← Changer de rôle
        </Link>
      </div>
    </aside>
  );
}
