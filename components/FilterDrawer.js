'use client';
import { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';

export default function FilterDrawer({ isOpen, onClose, onApply }) {
  const [f, setF] = useState({ cat:'all', price:150000, stars:0, missions:'all', dist:50, avail:'all', sat:'all' });
  const set = (k,v) => setF(p=>({...p,[k]:v}));

  const Chip = ({ label, active, onClick }) => (
    <button onClick={onClick} style={{ padding:'6px 12px', borderRadius:8, fontSize:'.78rem', fontWeight:500, border:`1.5px solid ${active?'#0D1117':'var(--border)'}`, background:active?'#0D1117':'white', color:active?'white':'var(--ink-muted)', cursor:'pointer', transition:'all .15s', fontFamily:'inherit' }}>
      {label}
    </button>
  );

  return (
    <>
      {isOpen && <div className="af" style={{ position:'fixed', inset:0, zIndex:400, background:'rgba(13,17,23,.5)', backdropFilter:'blur(4px)' }} onClick={onClose}/>}
      <aside style={{ position:'fixed', top:0, right:0, height:'100vh', width:'100%', maxWidth:360, background:'white', zIndex:500, display:'flex', flexDirection:'column', transition:'transform .3s', transform:isOpen?'translateX(0)':'translateX(100%)', boxShadow:'-8px 0 40px rgba(13,17,23,.15)' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 20px', borderBottom:'1px solid var(--border)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <SlidersHorizontal size={15} strokeWidth={2} style={{ color:'var(--ink-muted)' }}/>
            <h3 style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'1rem', color:'var(--ink)', fontWeight:400 }}>Filtres avancés</h3>
          </div>
          <button onClick={onClose} style={{ width:32, height:32, borderRadius:8, border:'1px solid var(--border)', background:'var(--s2)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <X size={15} strokeWidth={2} style={{ color:'var(--ink-muted)' }}/>
          </button>
        </div>

        <div style={{ flex:1, overflowY:'auto', padding:'18px 20px' }}>
          {[
            ['Catégorie', 'cat', [['all','Tous'],['btp','BTP'],['it','IT'],['sante','Santé'],['juridique','Juridique'],['beaute','Beauté'],['education','Éducation']]],
            ['Disponibilité', 'avail', [['all','Toutes'],['now','Maintenant'],['today',"Auj'hui"],['week','Semaine']]],
            ['Missions', 'missions', [['all','Toutes'],['10','10+'],['25','25+'],['50','50+'],['100','100+']]],
            ['Satisfaction', 'sat', [['all','Toutes'],['90','≥90%'],['95','≥95%'],['100','100%']]],
          ].map(([label, key, opts]) => (
            <div key={key} style={{ marginBottom:20 }}>
              <p style={{ fontSize:'.72rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', color:'var(--ink-faint)', marginBottom:8 }}>{label}</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {opts.map(([v,l]) => <Chip key={v} label={l} active={f[key]===v} onClick={() => set(key,v)} />)}
              </div>
            </div>
          ))}

          <div style={{ marginBottom:20 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
              <p style={{ fontSize:'.72rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', color:'var(--ink-faint)' }}>Tarif max / jour</p>
              <span style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'.9rem', color:'var(--ink)' }}>{f.price.toLocaleString('fr-FR')} F</span>
            </div>
            <input type="range" min={0} max={150000} step={5000} value={f.price} onChange={e=>set('price',+e.target.value)}
              style={{ width:'100%', accentColor:'var(--ink)', height:4, borderRadius:4, cursor:'pointer' }}/>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'.7rem', color:'var(--ink-faint)', marginTop:4 }}><span>0</span><span>150 000 F</span></div>
          </div>

          <div style={{ marginBottom:20 }}>
            <p style={{ fontSize:'.72rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', color:'var(--ink-faint)', marginBottom:8 }}>Note minimale</p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:6 }}>
              {[[0,'Toutes'],[3,'3+'],[4,'4+'],[4.5,'4.5+']].map(([v,l])=>(
                <button key={v} onClick={() => set('stars',v)} style={{ padding:'8px 4px', borderRadius:9, border:`1.5px solid ${f.stars===v?'#F59E0B':'var(--border)'}`, background:f.stars===v?'#FEF3C7':'white', fontSize:'.78rem', cursor:'pointer', fontFamily:'inherit', color:f.stars===v?'#92400E':'var(--ink-muted)' }}>
                  {v>0&&'★'} {l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize:'.72rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', color:'var(--ink-faint)', marginBottom:8 }}>Distance max</p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
              {[[2,'2 km','Proximité'],[5,'5 km','Quartier'],[15,'15 km','Ville'],[50,'50 km+','Région']].map(([v,km,l])=>(
                <button key={v} onClick={()=>set('dist',v)} style={{ padding:'10px', borderRadius:10, border:`1.5px solid ${f.dist===v?'#0EA5E9':'var(--border)'}`, background:f.dist===v?'#E0F2FE':'white', cursor:'pointer', textAlign:'center', fontFamily:'inherit' }}>
                  <div style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'.95rem', color:f.dist===v?'#0369A1':'var(--ink)' }}>{km}</div>
                  <div style={{ fontSize:'.7rem', color:'var(--ink-faint)', marginTop:2 }}>{l}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding:'14px 20px', borderTop:'1px solid var(--border)', display:'grid', gridTemplateColumns:'1fr 2fr', gap:10 }}>
          <button onClick={()=>setF({cat:'all',price:150000,stars:0,missions:'all',dist:50,avail:'all',sat:'all'})} className="btn btn-s" style={{ padding:12, fontSize:'.84rem' }}>Réinitialiser</button>
          <button onClick={()=>{onApply(f);onClose();}} className="btn btn-p" style={{ padding:12, fontSize:'.84rem' }}>Appliquer</button>
        </div>
      </aside>
    </>
  );
}
