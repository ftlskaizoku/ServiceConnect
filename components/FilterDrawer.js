'use client';
import { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';

const CATS = [['all','Tous'],['btp','BTP'],['it','Informatique'],['sante','Santé'],['juridique','Juridique'],['beaute','Beauté'],['education','Éducation'],['evenement','Événement']];

export default function FilterDrawer({ isOpen, onClose, onApply }) {
  const [f, setF] = useState({ cat:'all', price:150000, stars:0, missions:'all', dist:50, avail:'all', sat:'all' });
  const set = (k,v) => setF(p => ({...p,[k]:v}));

  const Chip = ({ label, active, onClick }) => (
    <button onClick={onClick}
      className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
      style={{ background: active ? 'var(--ink)' : 'var(--surface)', color: active ? 'white' : 'var(--ink-muted)', borderColor: active ? 'var(--ink)' : 'var(--border)' }}>
      {label}
    </button>
  );

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 animate-fade-in"
          style={{ background: 'rgba(13,17,23,.5)', backdropFilter:'blur(4px)' }}
          onClick={onClose} />
      )}
      <aside className="fixed top-0 right-0 h-screen w-full max-w-sm bg-white z-50 flex flex-col transition-transform duration-300 shadow-2xl"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}>

        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor:'var(--border)' }}>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} strokeWidth={2} style={{ color:'var(--ink-muted)' }} />
            <h3 className="font-semibold" style={{ fontFamily:'DM Serif Display,serif' }}>Filtres avancés</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg transition-colors hover:bg-[var(--surface-3)]">
            <X size={16} strokeWidth={2} style={{ color:'var(--ink-muted)' }} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color:'var(--ink-faint)' }}>Catégorie</p>
            <div className="flex flex-wrap gap-1.5">
              {CATS.map(([v,l]) => <Chip key={v} label={l} active={f.cat===v} onClick={() => set('cat',v)} />)}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color:'var(--ink-faint)' }}>Tarif max / jour</p>
              <span className="text-sm font-semibold" style={{ fontFamily:'DM Serif Display,serif', color:'var(--ink)' }}>{f.price.toLocaleString('fr-FR')} F</span>
            </div>
            <input type="range" min={0} max={150000} step={5000} value={f.price}
              onChange={e => set('price',+e.target.value)}
              className="w-full h-1.5 rounded-full cursor-pointer"
              style={{ accentColor:'var(--ink)' }} />
            <div className="flex justify-between text-xs mt-1" style={{ color:'var(--ink-faint)' }}>
              <span>0 F</span><span>150 000 F</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color:'var(--ink-faint)' }}>Note minimale</p>
            <div className="grid grid-cols-4 gap-1.5">
              {[[0,'Toutes'],[3,'3+'],[4,'4+'],[4.5,'4.5+']].map(([v,l]) => (
                <button key={v} onClick={() => set('stars',v)}
                  className="py-2 text-xs font-medium rounded-lg border transition-all text-center"
                  style={{ borderColor: f.stars===v ? 'var(--amber)' : 'var(--border)', background: f.stars===v ? 'var(--amber-dim)' : 'var(--surface)', color: f.stars===v ? 'var(--amber-dark)' : 'var(--ink-muted)' }}>
                  {v > 0 && '★'} {l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color:'var(--ink-faint)' }}>Missions accomplies</p>
            <div className="flex flex-wrap gap-1.5">
              {[['all','Toutes'],['10','10+'],['25','25+'],['50','50+'],['100','100+']].map(([v,l]) => (
                <Chip key={v} label={l} active={f.missions===v} onClick={() => set('missions',v)} />
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color:'var(--ink-faint)' }}>Distance maximale</p>
            <div className="grid grid-cols-2 gap-2">
              {[[2,'2 km','Proximité'],[5,'5 km','Quartier'],[15,'15 km','Ville'],[50,'50 km+','Région']].map(([v,km,l]) => (
                <button key={v} onClick={() => set('dist',v)}
                  className="p-3 rounded-xl border text-center transition-all"
                  style={{ borderColor: f.dist===v ? 'var(--sky)' : 'var(--border)', background: f.dist===v ? 'var(--sky-dim)' : 'var(--surface)' }}>
                  <div className="font-bold text-sm" style={{ fontFamily:'DM Serif Display,serif', color: f.dist===v ? 'var(--sky)' : 'var(--ink)' }}>{km}</div>
                  <div className="text-xs mt-0.5" style={{ color:'var(--ink-faint)' }}>{l}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color:'var(--ink-faint)' }}>Disponibilité</p>
            <div className="flex flex-wrap gap-1.5">
              {[['all','Toutes'],['now','Maintenant'],['today',"Aujourd'hui"],['week','Semaine']].map(([v,l]) => (
                <Chip key={v} label={l} active={f.avail===v} onClick={() => set('avail',v)} />
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color:'var(--ink-faint)' }}>Satisfaction clients</p>
            <div className="flex flex-wrap gap-1.5">
              {[['all','Toutes'],['90','≥ 90%'],['95','≥ 95%'],['100','100%']].map(([v,l]) => (
                <Chip key={v} label={l} active={f.sat===v} onClick={() => set('sat',v)} />
              ))}
            </div>
          </div>

        </div>

        <div className="px-5 py-4 border-t grid grid-cols-5 gap-3" style={{ borderColor:'var(--border)' }}>
          <button onClick={() => setF({cat:'all',price:150000,stars:0,missions:'all',dist:50,avail:'all',sat:'all'})}
            className="btn-secondary col-span-2 py-3 text-sm">
            Réinitialiser
          </button>
          <button onClick={() => { onApply(f); onClose(); }}
            className="btn-primary col-span-3 py-3 text-sm">
            Appliquer
          </button>
        </div>
      </aside>
    </>
  );
}
