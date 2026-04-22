'use client';
import { useState } from 'react';
import { Search, MessageCircle } from 'lucide-react';
import AppShell from '@/components/AppShell';
import { Toast, useToast } from '@/components/Toast';

const CLIENTS = [
  { id:1, name:'Amadou Diallo', initials:'AD', color:'#0B3D91', missions:3, location:'Almadies', total:108000, status:'active', loyal:true },
  { id:2, name:'Bineta Traoré', initials:'BT', color:'#C2185B', missions:1, location:'Ouakam', total:18000, status:'active' },
  { id:3, name:'Aissatou Ndiaye', initials:'AN', color:'#1B5E20', missions:2, location:'Plateau', total:45000, status:'pending', loyal:true },
  { id:4, name:'Moussa Ba', initials:'MB', color:'#00695C', missions:1, location:'Ouakam', total:80000, status:'done', rating:5 },
  { id:5, name:'Ibrahima Sow', initials:'IS', color:'#0277BD', missions:1, location:'Grand Yoff', total:15000, status:'done', rating:4.5 },
];

export default function ClientsPage() {
  const [search, setSearch] = useState('');
  const { toast, showToast } = useToast();
  const filtered = CLIENTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <AppShell role="provider" title="Mes clients" subtitle="Gérez votre base clients">
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[['24','Clients total'],['11','Clients fidèles'],['4.8','Note moy.']].map(([v,l])=>(
          <div key={l} className="card p-4 text-center">
            <div className="text-xl font-bold mb-0.5" style={{ fontFamily:'DM Serif Display,serif', color:'var(--ink)' }}>{v}</div>
            <div className="text-xs" style={{ color:'var(--ink-faint)' }}>{l}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 bg-white border rounded-xl px-3 py-2.5 mb-4" style={{ borderColor:'var(--border)' }}>
        <Search size={14} strokeWidth={1.8} style={{ color:'var(--ink-faint)' }} />
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher un client…"
          className="flex-1 text-sm outline-none bg-transparent" style={{ fontFamily:'DM Sans,sans-serif' }} />
      </div>

      <div className="card overflow-hidden">
        {filtered.map((c,i) => (
          <div key={c.id} className={`flex items-center gap-3 px-4 py-3.5 ${i<filtered.length-1?'border-b':''}`}
            style={{ borderColor:'var(--border)', opacity:c.status==='done'?.75:1 }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background:c.color }}>{c.initials}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm" style={{ color:'var(--ink)' }}>{c.name}</span>
                {c.loyal && <span className="badge badge-green">Fidèle</span>}
              </div>
              <p className="text-xs" style={{ color:'var(--ink-faint)' }}>{c.missions} mission{c.missions>1?'s':''} · {c.location}{c.rating?` · ★ ${c.rating}`:''}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-semibold text-sm" style={{ fontFamily:'DM Serif Display,serif', color:c.status==='done'?'var(--ink-faint)':'var(--ink)' }}>{c.total.toLocaleString('fr-FR')} F</div>
              <button onClick={()=>showToast(`Chat ouvert avec ${c.name}`)} className="mt-1 flex items-center gap-1 text-xs font-medium ml-auto" style={{ color:'var(--ink-muted)' }}>
                <MessageCircle size={12} strokeWidth={1.8} /> Chat
              </button>
            </div>
          </div>
        ))}
      </div>
      <Toast toast={toast} />
    </AppShell>
  );
}
