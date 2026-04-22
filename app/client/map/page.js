'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import AppShell from '@/components/AppShell';
import ProviderModal from '@/components/ProviderModal';
import { Toast, useToast } from '@/components/Toast';
import { PROVIDERS } from '@/lib/data';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false, loading: () => (
  <div className="flex-1 flex items-center justify-center" style={{ background: '#e8edf2' }}>
    <div className="text-center" style={{ color: '#7A91B0' }}>
      <div className="text-4xl mb-3">🗺️</div>
      <p className="font-semibold">Chargement de la carte…</p>
    </div>
  </div>
)});

const CATS = [['all','Tous'],['btp','🔨 BTP'],['it','💻 IT'],['sante','🏥 Santé'],['beaute','💄 Beauté'],['education','📚 Éducation']];

export default function MapPage() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [focusId, setFocusId] = useState(null);
  const { toast, showToast } = useToast();

  const filtered = PROVIDERS.filter(p => {
    if (cat !== 'all' && p.cat !== cat) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.job.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <AppShell role="client" title="Carte des prestataires" subtitle="Trouvez les pros près de vous">
      <div className="flex rounded-2xl overflow-hidden border -mx-4 lg:-mx-7 -mt-4 lg:-mt-7" style={{ borderColor: 'var(--border)', height: 'calc(100vh - 65px)' }}>
        {/* Sidebar list */}
        <div className="w-80 flex-shrink-0 bg-white flex flex-col border-r hidden md:flex" style={{ borderColor: 'var(--border)' }}>
          <div className="p-3 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 mb-3 border" style={{ borderColor: 'var(--border)' }}>
              <span>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Nom, service, quartier…"
                className="flex-1 text-sm border-none outline-none bg-transparent" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {CATS.map(([v, l]) => (
                <button key={v} onClick={() => setCat(v)}
                  className="px-3 py-1 rounded-full text-xs font-semibold border transition-all"
                  style={{ background: cat === v ? 'var(--navy)' : 'white', color: cat === v ? 'white' : '#7A91B0', borderColor: cat === v ? 'var(--navy)' : 'var(--border)' }}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <div className="text-3xl mb-2">🔍</div>
                <p className="text-sm">Aucun résultat</p>
              </div>
            ) : filtered.map(p => (
              <div key={p.id} onClick={() => { setFocusId(p.id); }}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors hover:bg-gray-50 mb-1 border border-transparent hover:border-gray-200">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: p.color }}>{p.emoji}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold truncate" style={{ color: 'var(--navy)' }}>{p.name}</h4>
                  <p className="text-xs truncate" style={{ color: '#7A91B0' }}>{p.job}</p>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--gold)' }}>{'⭐'.repeat(Math.floor(p.rating))} <span style={{ color: '#7A91B0' }}>{p.rating}</span></div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-semibold" style={{ color: 'var(--teal)' }}>📍 {p.dist} km</div>
                  <div className="text-xs font-bold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--navy)' }}>{(p.price/1000).toFixed(0)}k F</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <MapView providers={filtered} focusId={focusId} onProviderClick={p => setSelectedProvider(p)} />
        </div>
      </div>

      <ProviderModal provider={selectedProvider} onClose={() => setSelectedProvider(null)}
        onContact={p => showToast(`✅ Demande envoyée à ${p.name} !`)} />
      <Toast toast={toast} />
    </AppShell>
  );
}
