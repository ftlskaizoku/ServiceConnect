'use client';
import { useState } from 'react';
import AppShell from '@/components/AppShell';
import { Toast, useToast } from '@/components/Toast';

const CLIENTS = [
  { id:1, name:'Amadou Diallo', initials:'AD', color:'#0B3D91', missions:3, location:'Almadies', total:108000, status:'active', loyal:true },
  { id:2, name:'Bineta Traoré', initials:'BT', color:'#C2185B', missions:1, location:'Ouakam', total:18000, status:'active', loyal:false },
  { id:3, name:'Aissatou Ndiaye', initials:'AN', color:'#1B5E20', missions:2, location:'Plateau', total:45000, status:'pending', loyal:true },
  { id:4, name:'Moussa Ba', initials:'MB', color:'#00695C', missions:1, location:'Ouakam', total:80000, status:'done', loyal:false, rating:5 },
  { id:5, name:'Ibrahima Sow', initials:'IS', color:'#0277BD', missions:1, location:'Grand Yoff', total:15000, status:'done', loyal:false, rating:4.5 },
];

export default function ClientsPage() {
  const [search, setSearch] = useState('');
  const { toast, showToast } = useToast();
  const filtered = CLIENTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <AppShell role="provider" title="Mes clients" subtitle="Votre base clients et historique">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[['👥','Clients total','24','Depuis le début'],['🔄','Clients fidèles','11','2+ missions'],['⭐','Satisfaction','4.8','Sur 32 avis']].map(([icon,label,val,sub]) => (
          <div key={label} className="bg-white rounded-2xl border p-4 text-center" style={{ borderColor:'var(--border)' }}>
            <span className="text-2xl mb-1 block">{icon}</span>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color:'#7A91B0' }}>{label}</p>
            <p className="text-2xl font-black" style={{ fontFamily:'Syne,sans-serif', color:'var(--navy)' }}>{val}</p>
            <p className="text-xs mt-0.5" style={{ color:'#7A91B0' }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border mb-4" style={{ borderColor:'var(--border)' }}>
        <span>🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un client…"
          className="flex-1 text-sm border-none outline-none" style={{ fontFamily:'Plus Jakarta Sans,sans-serif' }} />
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {filtered.map(c => (
          <div key={c.id} className="bg-white rounded-2xl border p-4 flex items-center gap-4"
            style={{ borderColor:'var(--border)', opacity: c.status==='done'?.8:1 }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background:c.color }}>{c.initials}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm" style={{ color:'var(--navy)' }}>{c.name}</h4>
                {c.loyal && <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background:'#E6F9F2', color:'var(--success)' }}>Client fidèle</span>}
              </div>
              <p className="text-xs mt-0.5" style={{ color:'#7A91B0' }}>
                {c.missions} mission{c.missions > 1 ? 's' : ''} · 📍 {c.location}
                {c.rating ? ` · ⭐ ${c.rating}/5` : ''}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-bold text-sm" style={{ fontFamily:'Syne,sans-serif', color: c.status==='done'?'#7A91B0':'var(--success)' }}>
                {c.total.toLocaleString('fr-FR')} F
              </div>
              <button onClick={() => showToast(`💬 Chat ouvert avec ${c.name}`)}
                className="mt-1 px-3 py-1 text-xs font-bold text-white rounded-lg"
                style={{ background:'var(--navy)' }}>💬 Chat</button>
            </div>
          </div>
        ))}
      </div>
      <Toast toast={toast} />
    </AppShell>
  );
}
