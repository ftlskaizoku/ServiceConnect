'use client';
import { X, Star, MessageCircle } from 'lucide-react';
export default function ProviderModal({ provider, onClose, onContact }) {
  if (!provider) return null;
  return (
    <div className="af" style={{ position:'fixed', inset:0, zIndex:500, display:'flex', alignItems:'flex-end', justifyContent:'center', padding:'0 0', background:'rgba(13,17,23,.6)', backdropFilter:'blur(8px)' }} onClick={onClose}>
      <div className="as" style={{ background:'white', width:'100%', maxWidth:420, borderRadius:'20px 20px 0 0', overflow:'hidden', boxShadow:'0 32px 64px rgba(13,17,23,.2)' }} onClick={e=>e.stopPropagation()}>
        <div style={{ height:80, background:`linear-gradient(135deg,${provider.color}dd,${provider.color}88)`, position:'relative', flexShrink:0 }}>
          <button onClick={onClose} style={{ position:'absolute', top:12, right:12, width:32, height:32, borderRadius:'50%', background:'rgba(255,255,255,.2)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <X size={15} strokeWidth={2} style={{ color:'white' }} />
          </button>
          <div style={{ position:'absolute', bottom:-22, left:18, width:52, height:52, borderRadius:14, border:'2px solid white', display:'flex', alignItems:'center', justifyContent:'center', background:provider.color, color:'white', fontWeight:700, fontSize:'1.1rem' }}>{provider.emoji}</div>
        </div>
        <div style={{ padding:'30px 18px 12px', display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
          <div>
            <h3 style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'1.1rem', color:'var(--ink)', marginBottom:2 }}>{provider.name}</h3>
            <p style={{ fontSize:'.82rem', color:'var(--ink-muted)' }}>{provider.job}</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:3, fontSize:'.88rem', fontWeight:600, color:'#D97706' }}>
            <Star size={13} fill="#D97706" strokeWidth={0}/>{provider.rating}
          </div>
        </div>
        <div style={{ padding:'0 18px 14px', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
          {[[provider.missions,'Missions'],[provider.sat+'%','Satisfaction'],['4.8★','Note']].map(([v,l])=>(
            <div key={l} style={{ textAlign:'center', padding:'10px 6px', background:'var(--s2)', borderRadius:10 }}>
              <div style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'1rem', color:'var(--ink)', fontWeight:400 }}>{v}</div>
              <div style={{ fontSize:'.7rem', color:'var(--ink-faint)', marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ padding:'0 18px 10px' }}>
          <p style={{ fontSize:'.82rem', color:'var(--ink-muted)', lineHeight:1.6 }}>{provider.desc}</p>
        </div>
        <div style={{ padding:'12px 18px 20px', display:'grid', gridTemplateColumns:'1fr 2fr', gap:10 }}>
          <button onClick={onClose} className="btn btn-s" style={{ padding:12, fontSize:'.84rem' }}>Fermer</button>
          <button onClick={()=>{onContact(provider);onClose();}} className="btn btn-p" style={{ padding:12, fontSize:'.84rem', gap:8 }}>
            <MessageCircle size={14} strokeWidth={2}/>Contacter
          </button>
        </div>
      </div>
    </div>
  );
}
