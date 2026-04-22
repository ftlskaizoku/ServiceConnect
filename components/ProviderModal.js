'use client';

export default function ProviderModal({ provider, onClose, onContact }) {
  if (!provider) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(11,31,58,.55)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden" onClick={e => e.stopPropagation()}
        style={{ boxShadow: '0 24px 60px rgba(11,31,58,.25)' }}>
        <div className="p-6 text-center text-white" style={{ background: 'linear-gradient(135deg, var(--navy), #1e4080)' }}>
          <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold border-2"
            style={{ background: provider.color, borderColor: 'rgba(255,255,255,.3)' }}>
            {provider.emoji}
          </div>
          <h3 className="text-lg font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>{provider.name}</h3>
          <p className="text-sm mt-0.5 opacity-70">{provider.job}</p>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[['⭐ '+provider.rating,'Note'],[''+provider.missions,'Missions'],[''+provider.sat+'%','Satisfaction']].map(([v,l]) => (
              <div key={l} className="text-center p-3 rounded-xl" style={{ background: 'var(--bg)' }}>
                <strong className="block text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--navy)' }}>{v}</strong>
                <span className="text-xs" style={{ color: '#7A91B0' }}>{l}</span>
              </div>
            ))}
          </div>
          <p className="text-sm leading-relaxed" style={{ color: '#3D5275' }}>{provider.desc}</p>
        </div>
        <div className="px-5 pb-5 grid grid-cols-5 gap-3">
          <button onClick={onClose} className="col-span-2 py-3 rounded-xl border text-sm font-semibold"
            style={{ borderColor: 'var(--border)', color: '#3D5275' }}>Fermer</button>
          <button onClick={() => { onContact(provider); onClose(); }}
            className="col-span-3 py-3 rounded-xl text-white text-sm font-bold"
            style={{ background: 'var(--navy)' }}>
            📩 Contacter
          </button>
        </div>
      </div>
    </div>
  );
}
