'use client';
import { useState } from 'react';

export default function FilterDrawer({ isOpen, onClose, onApply }) {
  const [filters, setFilters] = useState({ cat: 'all', price: 75000, stars: 0, missions: 'all', dist: 50, avail: 'all', sat: 'all' });

  const set = (key, val) => setFilters(f => ({ ...f, [key]: val }));

  const Chip = ({ label, active, onClick }) => (
    <button onClick={onClick}
      className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
      style={{ background: active ? 'var(--navy)' : 'white', color: active ? 'white' : '#7A91B0', borderColor: active ? 'var(--navy)' : 'var(--border)' }}>
      {label}
    </button>
  );

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40" style={{ background: 'rgba(11,31,58,.5)' }} onClick={onClose} />}
      <aside className="fixed top-0 right-0 h-screen w-full max-w-sm bg-white z-50 flex flex-col transition-transform duration-300"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)', boxShadow: '0 0 40px rgba(11,31,58,.2)' }}>

        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <h3 className="text-lg font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>🎛️ Filtres avancés</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg border flex items-center justify-center text-sm"
            style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>✕</button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {/* Catégorie */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#7A91B0' }}>Catégorie</p>
            <div className="flex flex-wrap gap-2">
              {[['all','Tous'],['btp','🔨 BTP'],['it','💻 IT'],['sante','🏥 Santé'],['juridique','⚖️ Juridique'],['beaute','💄 Beauté'],['education','📚 Éducation'],['evenement','🎉 Événement']].map(([v,l]) => (
                <Chip key={v} label={l} active={filters.cat === v} onClick={() => set('cat', v)} />
              ))}
            </div>
          </div>

          {/* Prix */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#7A91B0' }}>Tarif max (FCFA)</p>
            <div className="flex justify-between text-sm font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--navy)' }}>
              <span>0 F</span><span>{filters.price.toLocaleString('fr-FR')} F</span>
            </div>
            <input type="range" min={0} max={150000} step={5000} value={filters.price}
              onChange={e => set('price', +e.target.value)}
              className="w-full h-1.5 rounded-full outline-none cursor-pointer"
              style={{ accentColor: 'var(--navy)' }} />
            <div className="flex justify-between text-xs mt-1" style={{ color: '#7A91B0' }}><span>0</span><span>150 000</span></div>
          </div>

          {/* Note */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#7A91B0' }}>Note minimale</p>
            <div className="grid grid-cols-4 gap-2">
              {[[0,'Toutes'],[3,'⭐ 3+'],[4,'⭐ 4+'],[4.5,'⭐ 4.5+']].map(([v,l]) => (
                <button key={v} onClick={() => set('stars', v)}
                  className="py-2 text-xs rounded-lg border text-center transition-all"
                  style={{ borderColor: filters.stars === v ? 'var(--gold)' : 'var(--border)', background: filters.stars === v ? 'var(--gold-pale)' : 'white', fontWeight: filters.stars === v ? 700 : 400 }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Missions accomplies */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#7A91B0' }}>Missions accomplies</p>
            <div className="flex flex-wrap gap-2">
              {[['all','Toutes'],['10','10+'],['25','25+'],['50','50+'],['100','100+']].map(([v,l]) => (
                <Chip key={v} label={l} active={filters.missions === v} onClick={() => set('missions', v)} />
              ))}
            </div>
          </div>

          {/* Distance */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#7A91B0' }}>Distance maximale</p>
            <div className="grid grid-cols-2 gap-2">
              {[[2,'2 km','À proximité'],[5,'5 km','Dans le quartier'],[15,'15 km','Dans la ville'],[50,'50 km+','Toute la région']].map(([v,km,label]) => (
                <button key={v} onClick={() => set('dist', v)}
                  className="p-3 rounded-xl border text-center transition-all"
                  style={{ borderColor: filters.dist === v ? 'var(--teal)' : 'var(--border)', background: filters.dist === v ? 'var(--teal-light)' : 'white' }}>
                  <div className="font-bold" style={{ fontFamily: 'Syne, sans-serif', color: filters.dist === v ? 'var(--teal)' : 'var(--navy)' }}>{km}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#7A91B0' }}>{label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Disponibilité */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#7A91B0' }}>Disponibilité</p>
            <div className="flex flex-wrap gap-2">
              {[['all','Tous'],['now','Disponible maintenant'],['today',"Aujourd'hui"],['week','Cette semaine']].map(([v,l]) => (
                <Chip key={v} label={l} active={filters.avail === v} onClick={() => set('avail', v)} />
              ))}
            </div>
          </div>

          {/* Satisfaction */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#7A91B0' }}>Satisfaction clients</p>
            <div className="flex flex-wrap gap-2">
              {[['all','Toutes'],['90','≥ 90%'],['95','≥ 95%'],['100','100%']].map(([v,l]) => (
                <Chip key={v} label={l} active={filters.sat === v} onClick={() => set('sat', v)} />
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t grid grid-cols-5 gap-3" style={{ borderColor: 'var(--border)' }}>
          <button onClick={() => setFilters({ cat:'all', price:75000, stars:0, missions:'all', dist:50, avail:'all', sat:'all' })}
            className="col-span-2 py-3 rounded-xl border text-sm font-semibold transition-colors"
            style={{ borderColor: 'var(--border)', color: '#7A91B0' }}>
            Réinitialiser
          </button>
          <button onClick={() => { onApply(filters); onClose(); }}
            className="col-span-3 py-3 rounded-xl text-sm font-bold text-white"
            style={{ background: 'var(--navy)' }}>
            ✓ Appliquer
          </button>
        </div>
      </aside>
    </>
  );
}
