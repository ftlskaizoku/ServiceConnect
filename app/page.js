'use client';
import Link from 'next/link';
import { Zap, ArrowRight, Star, Shield, Smartphone } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: 'var(--ink)' }}>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,.12) 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, var(--amber), transparent 70%)', transform: 'translate(-30%,-30%)' }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-8"
        style={{ background: 'radial-gradient(circle, var(--emerald), transparent 70%)', transform: 'translate(20%,20%)' }} />

      <div className="relative z-10 text-center px-6 py-12 max-w-md w-full animate-slide-up">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'var(--amber)' }}>
            <Zap size={20} strokeWidth={2.5} style={{ color: 'var(--ink)' }} />
          </div>
          <span className="text-white text-xl" style={{ fontFamily: 'DM Serif Display, serif' }}>ServiceConnect</span>
        </div>

        <h1 className="text-white leading-tight mb-4" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(2rem, 6vw, 3rem)' }}>
          Le bon prestataire,{' '}
          <em className="not-italic" style={{ color: 'var(--amber)' }}>près de vous.</em>
        </h1>
        <p className="mb-10 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.55)' }}>
          Trouvez des professionnels vérifiés au Sénégal. Comparez, contactez et payez en toute sécurité via Mobile Money.
        </p>

        <div className="grid grid-cols-1 gap-3 mb-8">
          <RoleCard href="/client" emoji="🔍" title="Je cherche un service" desc="Trouvez et contactez des pros vérifiés" accentColor="rgba(245,158,11,.1)" accentBorder="rgba(245,158,11,.3)" />
          <RoleCard href="/provider" emoji="🛠️" title="Je propose mes services" desc="Développez votre activité en ligne" accentColor="rgba(16,185,129,.1)" accentBorder="rgba(16,185,129,.3)" />
        </div>

        <div className="flex justify-center gap-6">
          {[[Star,'4.8','Note moy.'],[Shield,'1 200+','Prestataires'],[Smartphone,'8 500+','Missions']].map(([Icon,v,l]) => (
            <div key={l} className="text-center">
              <Icon size={14} strokeWidth={1.8} className="mx-auto mb-1" style={{ color: 'rgba(255,255,255,.3)' }} />
              <div className="text-white font-semibold text-sm" style={{ fontFamily: 'DM Serif Display, serif' }}>{v}</div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,.3)' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RoleCard({ href, emoji, title, desc, accentColor, accentBorder }) {
  return (
    <Link href={href}
      className="group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 no-underline"
      style={{ background: 'rgba(255,255,255,.05)', borderColor: 'rgba(255,255,255,.1)' }}
      onMouseEnter={e => { e.currentTarget.style.background=accentColor; e.currentTarget.style.borderColor=accentBorder; }}
      onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,.05)'; e.currentTarget.style.borderColor='rgba(255,255,255,.1)'; }}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
        style={{ background: 'rgba(255,255,255,.06)' }}>{emoji}</div>
      <div className="flex-1 text-left">
        <div className="text-white font-semibold text-sm" style={{ fontFamily: 'DM Serif Display, serif' }}>{title}</div>
        <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,.4)' }}>{desc}</div>
      </div>
      <ArrowRight size={16} strokeWidth={2} style={{ color: 'rgba(255,255,255,.3)' }} />
    </Link>
  );
}
