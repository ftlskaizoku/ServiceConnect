'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Bell, SlidersHorizontal, Menu, Home, Map, Search, ClipboardList, LayoutDashboard, Briefcase, Users, CreditCard } from 'lucide-react';
import Sidebar from './Sidebar';

export default function AppShell({ role, title, subtitle, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: 'var(--surface-2)' }}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar role={role} />
      </div>

      {/* Mobile overlay sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0" style={{ background: 'rgba(13,17,23,.6)', backdropFilter:'blur(4px)' }} onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10">
            <Sidebar role={role} />
          </div>
        </div>
      )}

      <div className="lg:ml-16">
        {/* Topbar */}
        <header className="sticky top-0 z-40 glass border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between px-4 lg:px-6 h-14">
            <div className="flex items-center gap-3">
              <button className="lg:hidden p-2 rounded-lg transition-colors hover:bg-surface-3"
                onClick={() => setSidebarOpen(true)}>
                <Menu size={18} strokeWidth={1.8} style={{ color: 'var(--ink-muted)' }} />
              </button>
              <div>
                <h1 className="text-base font-semibold leading-tight" style={{ fontFamily: 'DM Serif Display, serif', color: 'var(--ink)' }}>{title}</h1>
                {subtitle && <p className="text-xs hidden sm:block" style={{ color: 'var(--ink-faint)' }}>{subtitle}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-lg transition-colors hover:bg-[var(--surface-3)]">
                <Bell size={17} strokeWidth={1.8} style={{ color: 'var(--ink-muted)' }} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-white" style={{ background: 'var(--rose)' }} />
              </button>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg, var(--ink), var(--ink-soft))' }}>
                {role === 'client' ? 'FD' : 'MB'}
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="p-4 lg:p-6 pb-24 lg:pb-6">
          {children}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <MobileNav role={role} />
    </div>
  );
}

function MobileNav({ role }) {
  const clientItems = [
    { icon: Home,          label: 'Accueil',    href: '/client' },
    { icon: Map,           label: 'Carte',      href: '/client/map' },
    { icon: Search,        label: 'Rechercher', href: '/client/providers' },
    { icon: ClipboardList, label: 'Demandes',   href: '/client/requests' },
  ];
  const providerItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/provider' },
    { icon: Briefcase,       label: 'Missions',  href: '/provider/missions' },
    { icon: Users,           label: 'Clients',   href: '/provider/clients' },
    { icon: CreditCard,      label: 'Paiements', href: '/provider/payments' },
  ];
  const items = role === 'client' ? clientItems : providerItems;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="flex items-center px-2">
        {items.map(item => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}
              className="flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold transition-colors no-underline"
              style={{ color: 'var(--ink-faint)' }}>
              <Icon size={20} strokeWidth={1.8} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
