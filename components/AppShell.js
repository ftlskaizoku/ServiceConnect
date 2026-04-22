'use client';
import { useState } from 'react';
import Link from 'next/link';
import Sidebar from './Sidebar';

export default function AppShell({ role, title, subtitle, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar role={role} />
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40" onClick={() => setSidebarOpen(false)}
          style={{ background: 'rgba(11,31,58,.5)' }}>
          <div onClick={e => e.stopPropagation()} className="w-[260px] h-full">
            <Sidebar role={role} />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="lg:ml-[260px] min-h-screen flex flex-col">
        {/* Topbar */}
        <header className="bg-white border-b sticky top-0 z-30 px-4 lg:px-7 py-3 flex items-center justify-between"
          style={{ borderColor: 'var(--border)', boxShadow: '0 1px 4px rgba(11,31,58,.06)' }}>
          <div className="flex items-center gap-3">
            <button className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center border text-sm"
              style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
              onClick={() => setSidebarOpen(true)}>
              ☰
            </button>
            <div>
              <h2 className="font-bold text-base lg:text-lg leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</h2>
              <p className="text-xs hidden sm:block" style={{ color: '#7A91B0' }}>{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 rounded-lg border text-sm flex items-center justify-center transition-colors"
              style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
              🔔
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--danger)' }}></span>
            </button>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer"
              style={{ background: 'linear-gradient(135deg, var(--navy), var(--teal))', color: 'white' }}>
              {role === 'client' ? 'FD' : 'MB'}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-7">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav role={role} />
    </div>
  );
}

function MobileNav({ role }) {
  const clientItems = [
    { icon: '🏠', label: 'Accueil', href: '/client' },
    { icon: '🗺️', label: 'Carte', href: '/client/map' },
    { icon: '🔍', label: 'Pros', href: '/client/providers' },
    { icon: '📋', label: 'Demandes', href: '/client/requests' },
  ];
  const providerItems = [
    { icon: '📊', label: 'Dashboard', href: '/provider' },
    { icon: '📋', label: 'Missions', href: '/provider/missions' },
    { icon: '👥', label: 'Clients', href: '/provider/clients' },
    { icon: '💳', label: 'Paiements', href: '/provider/payments' },
  ];
  const items = role === 'client' ? clientItems : providerItems;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-30 pb-safe"
      style={{ borderColor: 'var(--border)', boxShadow: '0 -4px 16px rgba(11,31,58,.08)' }}>
      <div className="flex">
        {items.map(item => (
          <Link key={item.href} href={item.href}
            className="flex-1 flex flex-col items-center gap-1 py-2 text-xs font-semibold transition-colors"
            style={{ color: '#7A91B0', textDecoration: 'none' }}>
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
