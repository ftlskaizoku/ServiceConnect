'use client';
import { useState, useMemo } from 'react';
import AppShell from '@/components/AppShell';
import ProviderCard from '@/components/ProviderCard';
import FilterDrawer from '@/components/FilterDrawer';
import ProviderModal from '@/components/ProviderModal';
import { Toast, useToast } from '@/components/Toast';
import { PROVIDERS } from '@/lib/data';

export default function ProvidersPage() {
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ cat:'all', price:150000, stars:0, missions:'all', dist:50, avail:'all', sat:'all' });
  const [activeCount, setActiveCount] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const { toast, showToast } = useToast();

  const filtered = useMemo(() => {
    return PROVIDERS.filter(p => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.job.toLowerCase().includes(search.toLowerCase())) return false;
      if (filters.cat !== 'all' && p.cat !== filters.cat) return false;
      if (p.price > filters.price) return false;
      if (p.rating < filters.stars) return false;
      if (filters.missions !== 'all' && p.missions < parseInt(filters.missions)) return false;
      if (p.dist > filters.dist) return false;
      if (filters.avail !== 'all' && p.avail !== filters.avail) return false;
      if (filters.sat !== 'all' && p.sat < parseInt(filters.sat)) return false;
      return true;
    });
  }, [search, filters]);

  function handleApply(f) {
    setFilters(f);
    let count = 0;
    if (f.cat !== 'all') count++;
    if (f.price < 150000) count++;
    if (f.stars > 0) count++;
    if (f.missions !== 'all') count++;
    if (f.dist < 50) count++;
    if (f.avail !== 'all') count++;
    if (f.sat !== 'all') count++;
    setActiveCount(count);
    showToast(`${PROVIDERS.filter(p => {
      if (f.cat !== 'all' && p.cat !== f.cat) return false;
      if (p.price > f.price) return false;
      if (p.rating < f.stars) return false;
      if (f.missions !== 'all' && p.missions < parseInt(f.missions)) return false;
      if (p.dist > f.dist) return false;
      if (f.avail !== 'all' && p.avail !== f.avail) return false;
      if (f.sat !== 'all' && p.sat < parseInt(f.sat)) return false;
      return true;
    }).length} prestataire(s) trouvé(s)`);
  }

  return (
    <AppShell role="client" title="Prestataires" subtitle="Filtrez et trouvez le meilleur pro">
      {/* Search bar */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3 border min-w-[200px]" style={{ borderColor: 'var(--border)' }}>
          <span className="text-lg">🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un service, un nom…"
            className="flex-1 border-none outline-none bg-transparent text-sm" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} />
          {search && <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600">✕</button>}
        </div>
        <button onClick={() => setFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border text-sm font-semibold transition-colors hover:border-[var(--navy)]"
          style={{ borderColor: 'var(--border)', color: 'var(--navy)' }}>
          🎛️ Filtres
          {activeCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: 'var(--navy)' }}>{activeCount}</span>
          )}
        </button>
      </div>

      {/* Results count */}
      <p className="text-sm mb-4" style={{ color: '#7A91B0' }}>
        <strong style={{ color: 'var(--navy)' }}>{filtered.length}</strong> prestataire{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(p => (
            <ProviderCard key={p.id} provider={p}
              onClick={() => setSelectedProvider(p)}
              onContact={() => showToast(`✅ Demande envoyée à ${p.name} !`)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20" style={{ color: '#7A91B0' }}>
          <div className="text-5xl mb-4">🔍</div>
          <p className="font-semibold mb-1">Aucun prestataire trouvé</p>
          <p className="text-sm">Essayez d'élargir vos critères de recherche</p>
        </div>
      )}

      <FilterDrawer isOpen={filterOpen} onClose={() => setFilterOpen(false)} onApply={handleApply} />
      <ProviderModal provider={selectedProvider} onClose={() => setSelectedProvider(null)}
        onContact={p => showToast(`✅ Demande envoyée à ${p.name} !`)} />
      <Toast toast={toast} />
    </AppShell>
  );
}
