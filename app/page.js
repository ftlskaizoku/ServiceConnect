import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: 'var(--navy)' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 10%, rgba(232,160,32,.18) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 90%, rgba(0,180,160,.15) 0%, transparent 55%)' }} />
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      <div className="relative z-10 text-center px-6 py-10 max-w-lg w-full animate-fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)' }}>
          <span className="w-2 h-2 rounded-full dot-pulse" style={{ background: 'var(--teal)' }}></span>
          <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,.7)' }}>🇸🇳 ServiceConnect Sénégal — Bêta</span>
        </div>
        <h1 className="text-white font-black leading-tight mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 7vw, 3.4rem)' }}>
          Le service qu'il vous faut,{' '}
          <span style={{ color: 'var(--gold)' }}>à portée de main</span>
        </h1>
        <p className="mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,.65)', fontSize: '1rem' }}>
          Trouvez des prestataires vérifiés près de chez vous. Filtrez par prix, satisfaction client, distance. Payez en toute sécurité via Mobile Money.
        </p>
        <div className="grid grid-cols-2 gap-3 mb-8">
          <Link href="/client" className="rounded-2xl p-5 text-center transition-all duration-200 hover:-translate-y-1 block no-underline" style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)' }}>
            <span className="text-4xl block mb-3">🔍</span>
            <h3 className="text-white font-bold mb-1.5 text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>Je cherche un service</h3>
            <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,.5)' }}>Trouvez le bon prestataire rapidement.</p>
            <span className="inline-block px-4 py-2 rounded-full text-xs font-bold" style={{ background: 'var(--teal)', color: 'white' }}>Espace Client</span>
          </Link>
          <Link href="/provider" className="rounded-2xl p-5 text-center transition-all duration-200 hover:-translate-y-1 block no-underline" style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)' }}>
            <span className="text-4xl block mb-3">🛠️</span>
            <h3 className="text-white font-bold mb-1.5 text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>Je propose mes services</h3>
            <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,.5)' }}>Gérez vos missions en ligne.</p>
            <span className="inline-block px-4 py-2 rounded-full text-xs font-bold" style={{ background: 'var(--gold)', color: 'var(--navy)' }}>Espace Prestataire</span>
          </Link>
        </div>
        <div className="flex justify-center gap-8">
          {[['1 200+','Prestataires'],['8 500+','Missions'],['4.8 ★','Note moy.']].map(([v,l]) => (
            <div key={l} className="text-center">
              <strong className="block text-xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{v}</strong>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,.4)' }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
