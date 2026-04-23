'use client';
import { Star, CheckCircle, Zap, Trophy } from 'lucide-react';

const AVAIL = {
  now:   { label:'Disponible', color:'#10B981' },
  today: { label:"Auj'hui",   color:'#D97706' },
  week:  { label:'Semaine',   color:'#8496B0' },
};

export default function ProviderCard({ provider, onContact, onClick }) {
  const { name, job, color, emoji, rating, missions, sat, price, dist, avail, badges=[] } = provider;
  const av = AVAIL[avail] || AVAIL.week;
  return (
    <div onClick={onClick} className="card card-h" style={{ display:'flex', flexDirection:'column', overflow:'hidden', cursor:'pointer' }}>
      <div style={{ height:3, background:color }} />
      <div style={{ padding:'14px 14px 0', display:'flex', gap:10, alignItems:'flex-start' }}>
        <div style={{ width:42, height:42, borderRadius:12, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', background:color, color:'white', fontWeight:700, fontSize:'.82rem' }}>{emoji}</div>
        <div style={{ flex:1, minWidth:0 }}>
          <p style={{ fontWeight:600, fontSize:'.88rem', color:'var(--ink)', marginBottom:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{name}</p>
          <p style={{ fontSize:'.76rem', color:'var(--ink-muted)', marginBottom:6, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{job}</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
            {badges.includes('verified')&&<span className="badge bg"><CheckCircle size={9} strokeWidth={2.5}/>Vérifié</span>}
            {badges.includes('fast')&&<span className="badge ba"><Zap size={9} strokeWidth={2.5}/>Rapide</span>}
            {badges.includes('top')&&<span className="badge bs"><Trophy size={9} strokeWidth={2.5}/>Top</span>}
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:3, flexShrink:0, fontSize:'.8rem', fontWeight:600, color:'#D97706' }}>
          <Star size={11} fill="#D97706" strokeWidth={0}/>{rating}
        </div>
      </div>
      <div style={{ padding:'10px 14px', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6 }}>
        {[[missions,'missions'],[sat+'%','satisf.'],[dist+'km','dist.']].map(([v,l])=>(
          <div key={l} style={{ background:'var(--s2)', borderRadius:9, padding:'8px 6px', textAlign:'center' }}>
            <div style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'.92rem', color:'var(--ink)' }}>{v}</div>
            <div style={{ fontSize:'.66rem', color:'var(--ink-faint)', marginTop:1 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop:'auto', padding:'10px 14px', borderTop:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }}>
        <div>
          <div style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'.92rem', color:'var(--ink)' }}>
            {price.toLocaleString('fr-FR')} <span style={{ fontSize:'.7rem', color:'var(--ink-faint)', fontFamily:'inherit' }}>F/j</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:'.7rem', fontWeight:600, color:av.color, marginTop:2 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:av.color, flexShrink:0 }}/>
            {av.label}
          </div>
        </div>
        <button onClick={e=>{e.stopPropagation();onContact&&onContact(provider);}} className="btn btn-p" style={{ padding:'8px 14px', fontSize:'.76rem' }}>Contacter</button>
      </div>
    </div>
  );
}
