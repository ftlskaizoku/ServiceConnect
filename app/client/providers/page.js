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
  const [fo, setFo] = useState(false);
  const [filters, setFilters] = useState({ cat:'all', price:150000, stars:0, missions:'all', dist:50, avail:'all', sat:'all' });
  const [ac, setAc] = useState(0);
  const [sel, setSel] = useState(null);
  const { toast, showToast } = useToast();

  const filtered = useMemo(() => PROVIDERS.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.job.toLowerCase().includes(search.toLowerCase())) return false;
    if (filters.cat!=='all'&&p.cat!==filters.cat) return false;
    if (p.price>filters.price) return false;
    if (p.rating<filters.stars) return false;
    if (filters.missions!=='all'&&p.missions<parseInt(filters.missions)) return false;
    if (p.dist>filters.dist) return false;
    if (filters.avail!=='all'&&p.avail!==filters.avail) return false;
    if (filters.sat!=='all'&&p.sat<parseInt(filters.sat)) return false;
    return true;
  }), [search, filters]);

  function handleApply(f) {
    setFilters(f);
    let c=0;
    if(f.cat!=='all')c++;if(f.price<150000)c++;if(f.stars>0)c++;if(f.missions!=='all')c++;if(f.dist<50)c++;if(f.avail!=='all')c++;if(f.sat!=='all')c++;
    setAc(c);
    showToast(`${filtered.length} prestataire(s) trouvé(s)`);
  }

  return (
    <AppShell role="client" title="Prestataires" subtitle="Trouvez le professionnel qu'il vous faut">
      <div style={{ display:'flex', gap:10, marginBottom:16 }}>
        <div style={{ flex:1, display:'flex', alignItems:'center', gap:10, background:'white', border:'1.5px solid var(--border)', borderRadius:11, padding:'9px 14px' }}>
          <Search size={14} strokeWidth={1.8} style={{ color:'var(--ink-faint)', flexShrink:0 }}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Nom, service, quartier…" className="inp" style={{ border:'none', outline:'none', padding:0, flex:1, fontSize:'.86rem' }}/>
          {search&&<button onClick={()=>setSearch('')} style={{ background:'none', border:'none', cursor:'pointer' }}><X size={13} style={{ color:'var(--ink-faint)' }}/></button>}
        </div>
        <button onClick={()=>setFo(true)} style={{ display:'flex', alignItems:'center', gap:8, padding:'9px 16px', background:'white', border:`1.5px solid ${ac>0?'var(--ink)':'var(--border)'}`, borderRadius:11, cursor:'pointer', fontSize:'.84rem', fontWeight:500, fontFamily:'inherit', color:'var(--ink)' }}>
          <SlidersHorizontal size={14} strokeWidth={1.8}/>
          {ac>0&&<span style={{ width:20, height:20, borderRadius:'50%', background:'var(--ink)', color:'white', fontSize:'.66rem', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>{ac}</span>}
        </button>
      </div>
      <p style={{ fontSize:'.78rem', color:'var(--ink-faint)', marginBottom:14 }}><strong style={{ color:'var(--ink)' }}>{filtered.length}</strong> prestataire{filtered.length!==1?'s':''}</p>
      {filtered.length>0
        ? <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:12 }}>
            {filtered.map(p=><ProviderCard key={p.id} provider={p} onClick={()=>setSel(p)} onContact={()=>showToast(`Demande envoyée à ${p.name}`)}/>)}
          </div>
        : <div style={{ textAlign:'center', padding:'60px 20px', color:'var(--ink-faint)' }}>
            <Search size={40} strokeWidth={1} style={{ opacity:.3, display:'block', margin:'0 auto 12px' }}/>
            <p style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'1.1rem', color:'var(--ink-muted)' }}>Aucun résultat</p>
          </div>
      }
      <FilterDrawer isOpen={fo} onClose={()=>setFo(false)} onApply={handleApply}/>
      <ProviderModal provider={sel} onClose={()=>setSel(null)} onContact={p=>showToast(`Demande envoyée à ${p.name}`)}/>
      <Toast toast={toast}/>
    </AppShell>
  );
}
