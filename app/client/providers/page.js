'use client';
import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
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
  const [selected, setSelected] = useState(null);
  const { toast, showToast } = useToast();

  const filtered = useMemo(() => PROVIDERS.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.job.toLowerCase().includes(search.toLowerCase())) return false;
    if (filters.cat !== 'all' && p.cat !== filters.cat) return false;
    if (p.price > filters.price) return false;
    if (p.rating < filters.stars) return false;
    if (filters.missions !== 'all' && p.missions < parseInt(filters.missions)) return false;
    if (p.dist > filters.dist) return false;
    if (filters.avail !== 'all' && p.avail !== filters.avail) return false;
    if (filters.sat !== 'all' && p.sat < parseInt(filters.sat)) return false;
    return true;
  }), [search, filters]);

  function handleApply(f) {
    setFilters(f);
    let c = 0;
    if (f.cat !== 'all') c++; if (f.price < 150000) c++; if (f.stars > 0) c++;
    if (f.missions !== 'all') c++; if (f.dist < 50) c++; if (f.avail !== 'all') c++; if (f.sat !== 'all') c++;
    setActiveCount(c);
    showToast(`${PROVIDERS.filter(p => {
      if (f.cat !== 'all' && p.cat !== f.cat) return false;
      if (p.price > f.price) return false; if (p.rating < f.stars) return false;
      if (f.missions !== 'all' && p.missions < parseInt(f.missions)) return false;
      if (p.dist > f.dist) return false; if (f.avail !== 'all' && p.avail !== f.avail) return false;
      if (f.sat !== 'all' && p.sat < parseInt(f.sat)) return false; return true;
    }).length} prestataire(s) trouvé(s)`);
  }

  return (
    <AppShell role="client" title="Prestataires" subtitle="Trouvez le professionnel qu'il vous faut">
      {/* Search + filter bar */}
      <div className="flex gap-2 mb-5">
        <div className="flex-1 flex items-center gap-2 bg-white border rounded-xl px-3 py-2.5" style={{ borderColor:'var(--border)' }}>
          <Search size={15} strokeWidth={1.8} style={{ color:'var(--ink-faint)', flexShrink:0 }} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Nom, service, quartier…"
            className="flex-1 text-sm outline-none bg-transparent"
            style={{ fontFamily:'DM Sans,sans-serif', color:'var(--ink)' }} />
          {search && <button onClick={() => setSearch('')}><X size={14} style={{ color:'var(--ink-faint)' }} /></button>}
        </div>
        <button onClick={() => setFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border rounded-xl text-sm font-medium transition-colors"
          style={{ borderColor: activeCount > 0 ? 'var(--ink)' : 'var(--border)', color:'var(--ink)' }}>
          <SlidersHorizontal size={15} strokeWidth={1.8} />
          {activeCount > 0 && <span className="w-5 h-5 rounded-full text-xs font-bold text-white flex items-center justify-center" style={{ background:'var(--ink)' }}>{activeCount}</span>}
        </button>
      </div>

      <p className="text-xs mb-4" style={{ color:'var(--ink-faint)' }}>
        <strong style={{ color:'var(--ink)' }}>{filtered.length}</strong> prestataire{filtered.length !== 1 ? 's' : ''}
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {filtered.map(p => (
            <ProviderCard key={p.id} provider={p} onClick={() => setSelected(p)}
              onContact={() => showToast(`Demande envoyée à ${p.name}`)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <Search size={40} strokeWidth={1} className="mx-auto mb-4" style={{ color:'var(--border)' }} />
          <p className="font-semibold" style={{ fontFamily:'DM Serif Display,serif', color:'var(--ink-muted)' }}>Aucun résultat</p>
          <p className="text-sm mt-1" style={{ color:'var(--ink-faint)' }}>Élargissez vos critères de recherche</p>
        </div>
      )}

      <FilterDrawer isOpen={filterOpen} onClose={() => setFilterOpen(false)} onApply={handleApply} />
      <ProviderModal provider={selected} onClose={() => setSelected(null)}
        onContact={p => showToast(`Demande envoyée à ${p.name}`)} />
      <Toast toast={toast} />
    </AppShell>
  );
}
