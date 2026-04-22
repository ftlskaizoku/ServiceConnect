'use client';

export default function ProviderCard({ provider, onContact, onClick }) {
  const { name, job, color, emoji, rating, missions, sat, price, dist, avail, badges = [] } = provider;

  const availLabel = avail === 'now'
    ? <span className="text-xs font-semibold" style={{ color: 'var(--success)' }}>● Disponible maintenant</span>
    : avail === 'today'
    ? <span className="text-xs font-semibold" style={{ color: 'var(--warning)' }}>● Disponible aujourd'hui</span>
    : <span className="text-xs" style={{ color: '#7A91B0' }}>● Cette semaine</span>;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 overflow-hidden"
      style={{ borderColor: 'var(--border)', boxShadow: '0 1px 4px rgba(11,31,58,.08)' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 40px rgba(11,31,58,.15)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(11,31,58,.08)'}
    >
      <div className="p-5 pb-0 flex gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ background: color }}>
          {emoji}
        </div>
        <div>
          <h4 className="font-bold text-sm" style={{ color: 'var(--navy)' }}>{name}</h4>
          <p className="text-xs mt-0.5" style={{ color: '#3D5275' }}>{job}</p>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {badges.includes('verified') && <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: '#E6F9F2', color: 'var(--success)' }}>✓ Vérifié</span>}
            {badges.includes('fast') && <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: '#FFF3E0', color: 'var(--warning)' }}>⚡ Rapide</span>}
            {badges.includes('top') && <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'var(--gold-pale)', color: '#B07510' }}>🏆 Top</span>}
          </div>
        </div>
      </div>

      <div className="p-5 pt-3">
        <div className="flex items-center gap-1">
          <span style={{ color: 'var(--gold)' }} className="text-sm">{'★'.repeat(Math.floor(rating))}</span>
          <span className="text-xs" style={{ color: '#3D5275' }}>{rating} · {sat}% satisfaction</span>
        </div>
        <div className="inline-flex items-center gap-1 mt-1.5 text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ color: 'var(--teal)', background: 'var(--teal-light)' }}>
          📍 {dist} km de vous
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="rounded-lg p-2 text-xs" style={{ background: 'var(--bg)' }}>
            <strong className="block text-sm font-bold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--navy)' }}>{missions}</strong>
            Missions
          </div>
          <div className="rounded-lg p-2 text-xs" style={{ background: 'var(--bg)', color: '#3D5275' }}>
            <strong className="block text-sm font-bold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--navy)' }}>{sat}%</strong>
            Satisfaction
          </div>
        </div>
        <div className="mt-2">{availLabel}</div>
      </div>

      <div className="px-5 py-3 flex items-center justify-between border-t" style={{ borderColor: 'var(--border)' }}>
        <div>
          <strong className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--navy)' }}>
            {price.toLocaleString('fr-FR')} F
          </strong>
          <span className="text-xs ml-0.5" style={{ color: '#7A91B0' }}> / jour</span>
        </div>
        <button
          onClick={e => { e.stopPropagation(); onContact && onContact(provider); }}
          className="px-4 py-2 text-white text-xs font-semibold rounded-lg transition-colors"
          style={{ background: 'var(--navy)' }}
          onMouseEnter={e => e.target.style.background = 'var(--navy-light)'}
          onMouseLeave={e => e.target.style.background = 'var(--navy)'}
        >
          Contacter
        </button>
      </div>
    </div>
  );
}
