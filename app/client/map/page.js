'use client';
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import AppShell from '@/components/AppShell';
import ProviderModal from '@/components/ProviderModal';
import { Toast, useToast } from '@/components/Toast';
import { PROVIDERS } from '@/lib/data';

const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center" style={{ background: '#e8edf2' }}>
      <div className="text-center" style={{ color: 'var(--ink-faint)' }}>
        <div className="text-4xl mb-3">🗺️</div>
        <p className="text-sm font-medium">Chargement de la carte…</p>
      </div>
    </div>
  ),
});

const CATS = [['all','Tous'],['btp','BTP'],['it','IT'],['sante','Santé'],['beaute','Beauté'],['education','Cours']];

export default function MapPage() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [selected, setSelected] = useState(null);
  const [focusId, setFocusId] = useState(null);
  const { toast, showToast } = useToast();

  const filtered = PROVIDERS.filter(p => {
    if (cat !== 'all' && p.cat !== cat) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.job.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const AVAIL_STYLE = {
    now:   { color: 'var(--emerald)' },
    today: { color: 'var(--amber)' },
    week:  { color: 'var(--ink-faint)' },
  };

  return (
    <AppShell role="client" title="Carte" subtitle="Prestataires autour de vous">
      {/* Full-bleed map layout */}
      <div className="-mx-4 lg:-mx-6 -mt-4 lg:-mt-6 flex rounded-none lg:rounded-2xl overflow-hidden border"
        style={{ borderColor:'var(--border)', height:'calc(100vh - 80px)' }}>

        {/* Sidebar list */}
        <div className="w-72 flex-shrink-0 bg-white flex-col border-r hidden md:flex" style={{ borderColor:'var(--border)' }}>
          {/* Search */}
          <div className="p-3 border-b space-y-2" style={{ borderColor:'var(--border)' }}>
            <div className="flex items-center gap-2 bg-[var(--surface-2)] border rounded-xl px-3 py-2"
              style={{ borderColor:'var(--border)' }}>
              <Search size={13} strokeWidth={1.8} style={{ color:'var(--ink-faint)', flexShrink:0 }} />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Nom, service…"
                className="flex-1 text-sm outline-none bg-transparent"
                style={{ fontFamily:'DM Sans,sans-serif' }} />
              {search && <button onClick={() => setSearch('')}><X size={12} style={{ color:'var(--ink-faint)' }} /></button>}
            </div>
            {/* Category chips */}
            <div className="flex gap-1 flex-wrap">
              {CATS.map(([v,l]) => (
                <button key={v} onClick={() => setCat(v)}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium border transition-all"
                  style={{ background:cat===v?'var(--ink)':'white', color:cat===v?'white':'var(--ink-muted)', borderColor:cat===v?'var(--ink)':'var(--border)' }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="px-4 py-2 border-b" style={{ borderColor:'var(--border)' }}>
            <p className="text-xs" style={{ color:'var(--ink-faint)' }}>
              <strong style={{ color:'var(--ink)' }}>{filtered.length}</strong> prestataire{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Provider list */}
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full pb-8" style={{ color:'var(--ink-faint)' }}>
                <Search size={32} strokeWidth={1} className="mb-2 opacity-30" />
                <p className="text-sm">Aucun résultat</p>
              </div>
            ) : filtered.map((p, i) => {
              const av = AVAIL_STYLE[p.avail] || AVAIL_STYLE.week;
              return (
                <div key={p.id}
                  onClick={() => { setFocusId(p.id); }}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-[var(--surface-2)] ${i < filtered.length-1 ? 'border-b' : ''}`}
                  style={{ borderColor:'var(--border)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background:p.color }}>{p.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:av.color }} />
                      <p className="font-medium text-sm truncate" style={{ color:'var(--ink)' }}>{p.name}</p>
                    </div>
                    <p className="text-xs truncate" style={{ color:'var(--ink-faint)' }}>{p.job}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-semibold" style={{ color:'var(--ink-muted)' }}>📍 {p.dist}km</p>
                    <p className="text-xs font-bold" style={{ fontFamily:'DM Serif Display,serif', color:'var(--ink)' }}>{(p.price/1000).toFixed(0)}k F</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <MapView providers={filtered} focusId={focusId} onProviderClick={p => setSelected(p)} />
        </div>
      </div>

      <ProviderModal provider={selected} onClose={() => setSelected(null)}
        onContact={p => showToast(`Demande envoyée à ${p.name}`)} />
      <Toast toast={toast} />
    </AppShell>
  );
}
