'use client';
import { useState } from 'react';
import { CheckCircle, Upload, LogOut } from 'lucide-react';
import AppShell from '@/components/AppShell';
import { Toast, useToast } from '@/components/Toast';
export default function ProfilePage() {
  const [avail,setAvail]=useState('now'); const {toast,showToast}=useToast();
  return (
    <AppShell role="provider" title="Mon profil" subtitle="Votre profil public">
      <div style={{ maxWidth:560 }}>
        <div style={{ borderRadius:16, overflow:'hidden', marginBottom:14 }}>
          <div style={{ height:60, background:'linear-gradient(135deg,#0D1117,#1C2333)', position:'relative' }}>
            <div style={{ position:'absolute', bottom:-20, left:16, width:50, height:50, borderRadius:13, border:'2.5px solid white', display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg,#F59E0B,#d97706)', color:'#0D1117', fontWeight:700, fontSize:'1rem' }}>MB</div>
          </div>
          <div className="card" style={{ borderRadius:'0 0 16px 16px', borderTop:'none', padding:'28px 16px 16px' }}>
            <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
              <div><h3 style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'1.05rem', fontWeight:400 }}>Moussa Badiane</h3><p style={{ fontSize:'.8rem', color:'var(--ink-muted)' }}>Électricien BT/MT · Dakar</p></div>
              <div style={{ textAlign:'right' }}><div style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'.95rem' }}>⭐ 4.8</div><div style={{ fontSize:'.7rem', color:'var(--ink-faint)' }}>87 missions</div></div>
            </div>
          </div>
        </div>
        <div className="card" style={{ padding:16, marginBottom:14 }}>
          <h3 style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'.95rem', fontWeight:400, marginBottom:12 }}>Informations</h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:10 }}>
            {[['Prénom','Moussa'],['Nom','Badiane'],['Téléphone','+221 76 456 78 90'],['Zone','Dakar & banlieue']].map(([l,v])=>(
              <div key={l}><label style={{ display:'block', fontSize:'.72rem', fontWeight:600, color:'var(--ink-faint)', marginBottom:5, textTransform:'uppercase', letterSpacing:'.05em' }}>{l}</label><input defaultValue={v} className="inp"/></div>
            ))}
          </div>
          <div style={{ marginBottom:10 }}>
            <label style={{ display:'block', fontSize:'.72rem', fontWeight:600, color:'var(--ink-faint)', marginBottom:5, textTransform:'uppercase', letterSpacing:'.05em' }}>Bio</label>
            <textarea defaultValue="Électricien diplômé. Spécialiste BT/MT. Certifié SENELEC. Intervention 7j/7." rows={3} className="inp" style={{ resize:'none' }}/>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            <div><label style={{ display:'block', fontSize:'.72rem', fontWeight:600, color:'var(--ink-faint)', marginBottom:5, textTransform:'uppercase', letterSpacing:'.05em' }}>Tarif (FCFA/j)</label><input type="number" defaultValue="20000" className="inp"/></div>
            <div><label style={{ display:'block', fontSize:'.72rem', fontWeight:600, color:'var(--ink-faint)', marginBottom:5, textTransform:'uppercase', letterSpacing:'.05em' }}>Disponibilité</label>
              <select value={avail} onChange={e=>setAvail(e.target.value)} className="inp" style={{ appearance:'auto' }}>
                <option value="now">Disponible maintenant</option><option value="today">Aujourd'hui</option><option value="week">Cette semaine</option><option value="unavailable">Indisponible</option>
              </select>
            </div>
          </div>
        </div>
        <div className="card" style={{ padding:16, marginBottom:14 }}>
          <h3 style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'.95rem', fontWeight:400, marginBottom:12 }}>Documents</h3>
          {[['Certificat SENELEC',true],["Pièce d'identité",true],['Assurance RC',false]].map(([n,ok])=>(
            <div key={n} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 12px', borderRadius:9, border:'1px solid var(--border)', background:'var(--s2)', marginBottom:6 }}>
              <span style={{ fontSize:'.84rem', fontWeight:500 }}>{n}</span>
              {ok?<span className="badge bg"><CheckCircle size={10} strokeWidth={2.5}/>Vérifié</span>:<button onClick={()=>showToast('Document uploadé')} style={{ display:'flex', alignItems:'center', gap:5, fontSize:'.76rem', fontWeight:600, color:'var(--ink-muted)', background:'none', border:'none', cursor:'pointer', fontFamily:'inherit' }}><Upload size={12} strokeWidth={2}/>Ajouter</button>}
            </div>
          ))}
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:8, paddingBottom:20 }}>
          <button onClick={()=>showToast('Profil publié')} className="btn btn-p" style={{ padding:12, fontSize:'.88rem', justifyContent:'center' }}>Enregistrer et publier</button>
          <button onClick={()=>showToast('Déconnexion…')} style={{ padding:12, borderRadius:9, border:'1.5px solid #fecdd3', background:'#FFF0F0', color:'#F43F5E', cursor:'pointer', fontSize:'.86rem', fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', gap:6, fontFamily:'inherit' }}><LogOut size={14} strokeWidth={1.8}/>Se déconnecter</button>
        </div>
      </div>
      <Toast toast={toast}/>
    </AppShell>
  );
}
