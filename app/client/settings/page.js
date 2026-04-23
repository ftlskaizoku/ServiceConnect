'use client';
import { useState } from 'react';
import { Camera, Key, LogOut, Bell, CreditCard, User } from 'lucide-react';
import AppShell from '@/components/AppShell';
import { Toast, useToast } from '@/components/Toast';

function Toggle({value,onChange}){
  return <button onClick={()=>onChange(!value)} style={{ position:'relative', width:44, height:24, borderRadius:12, background:value?'#0D1117':'var(--border)', border:'none', cursor:'pointer', transition:'background .2s', flexShrink:0 }}>
    <span style={{ position:'absolute', top:3, left:value?22:3, width:18, height:18, borderRadius:'50%', background:'white', boxShadow:'0 1px 4px rgba(0,0,0,.2)', transition:'left .2s' }}/>
  </button>;
}
function Field({label,defaultValue,type='text'}){
  return <div>
    <label style={{ display:'block', fontSize:'.72rem', fontWeight:600, color:'var(--ink-faint)', marginBottom:5, textTransform:'uppercase', letterSpacing:'.05em' }}>{label}</label>
    <input type={type} defaultValue={defaultValue} className="inp"/>
  </div>;
}
function Card({title,icon:Icon,children}){
  return <div className="card" style={{ padding:20, marginBottom:14 }}>
    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
      <Icon size={15} strokeWidth={2} style={{ color:'var(--ink-muted)' }}/>
      <h3 style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'.95rem', fontWeight:400 }}>{title}</h3>
    </div>
    {children}
  </div>;
}

export default function SettingsPage() {
  const [n1,setN1]=useState(true); const [n2,setN2]=useState(false);
  const {toast,showToast}=useToast();
  return (
    <AppShell role="client" title="Paramètres" subtitle="Compte et préférences">
      <div style={{ maxWidth:560 }}>
        <Card title="Profil" icon={User}>
          <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:18 }}>
            <div style={{ position:'relative' }}>
              <div style={{ width:60, height:60, borderRadius:16, background:'linear-gradient(135deg,#0D1117,#1C2333)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', fontWeight:700, color:'white' }}>FD</div>
              <button onClick={()=>showToast('Photo modifiée')} style={{ position:'absolute', bottom:-3, right:-3, width:22, height:22, borderRadius:'50%', background:'#0D1117', border:'2px solid white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Camera size={10} strokeWidth={2} style={{ color:'white' }}/></button>
            </div>
            <div><p style={{ fontWeight:600, fontSize:'.9rem' }}>Fatou Diallo</p><p style={{ fontSize:'.76rem', color:'var(--ink-faint)' }}>fatou.diallo@gmail.com · Client depuis janv. 2024</p></div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            <Field label="Prénom" defaultValue="Fatou"/><Field label="Nom" defaultValue="Diallo"/>
            <Field label="Téléphone" defaultValue="+221 77 123 45 67"/><Field label="Quartier" defaultValue="Plateau, Dakar"/>
          </div>
          <button onClick={()=>showToast('Profil mis à jour')} className="btn btn-p" style={{ marginTop:14, padding:'9px 18px', fontSize:'.84rem' }}>Enregistrer</button>
        </Card>
        <Card title="Notifications" icon={Bell}>
          {[['Réponses aux demandes','SMS quand un prestataire répond',n1,setN1],['Promotions','Offres spéciales',n2,setN2]].map(([t,d,v,s])=>(
            <div key={t} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, marginBottom:14, paddingBottom:14, borderBottom:'1px solid var(--border)' }}>
              <div><p style={{ fontSize:'.84rem', fontWeight:500 }}>{t}</p><p style={{ fontSize:'.74rem', color:'var(--ink-faint)', marginTop:2 }}>{d}</p></div>
              <Toggle value={v} onChange={s}/>
            </div>
          ))}
        </Card>
        <Card title="Paiements" icon={CreditCard}>
          {[{name:'Wave',num:'77 *** ** 67',active:true},{name:'Orange Money',num:'Non configuré',active:false}].map(item=>(
            <div key={item.name} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 12px', borderRadius:10, border:'1px solid var(--border)', background:'var(--s2)', marginBottom:8 }}>
              <div><p style={{ fontSize:'.84rem', fontWeight:500 }}>{item.name}</p><p style={{ fontSize:'.72rem', color:'var(--ink-faint)' }}>{item.num}</p></div>
              {item.active?<span className="badge bg">Actif</span>:<button onClick={()=>showToast(`${item.name} ajouté`)} className="btn btn-p" style={{ padding:'5px 10px', fontSize:'.74rem' }}>+ Ajouter</button>}
            </div>
          ))}
        </Card>
        <Card title="Sécurité" icon={Key}>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            <button onClick={()=>showToast('Email de réinitialisation envoyé')} className="btn btn-s" style={{ padding:'11px', fontSize:'.84rem', justifyContent:'center' }}><Key size={14} strokeWidth={1.8}/>Changer de mot de passe</button>
            <button onClick={()=>showToast('Déconnexion…')} style={{ padding:11, borderRadius:9, border:'1.5px solid #fecdd3', background:'#FFF0F0', color:'var(--rose)', cursor:'pointer', fontSize:'.84rem', fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', gap:6, fontFamily:'inherit' }}><LogOut size={14} strokeWidth={1.8}/>Se déconnecter</button>
          </div>
        </Card>
      </div>
      <Toast toast={toast}/>
    </AppShell>
  );
}
