'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
const ADMIN_EMAIL='khalifadylla@gmail.com', ADMIN_PASS='ServiceConnect2024!';
export default function AdminLogin() {
  const router=useRouter();
  const [email,setEmail]=useState(''),  [pass,setPass]=useState(''), [show,setShow]=useState(false), [err,setErr]=useState(''), [loading,setLoading]=useState(false);
  async function handle(e) {
    e.preventDefault(); setErr(''); setLoading(true);
    await new Promise(r=>setTimeout(r,700));
    if(email===ADMIN_EMAIL && pass===ADMIN_PASS) { sessionStorage.setItem('sc_admin','1'); router.push('/admin/dashboard'); }
    else { setErr('Email ou mot de passe incorrect.'); }
    setLoading(false);
  }
  return (
    <div style={{ minHeight:'100vh', background:'#0D1117', display:'flex', alignItems:'center', justifyContent:'center', padding:24, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, opacity:.12, backgroundImage:'radial-gradient(circle at 1px 1px, rgba(255,255,255,.18) 1px, transparent 0)', backgroundSize:'28px 28px' }}/>
      <div style={{ position:'absolute', top:'-20%', left:'-10%', width:500, height:500, borderRadius:'50%', opacity:.08, background:'radial-gradient(circle,#F59E0B,transparent 70%)' }}/>
      <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:380 }} className="as">
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ width:52, height:52, borderRadius:16, background:'#F59E0B', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 14px' }}>
            <Zap size={26} strokeWidth={2.5} style={{ color:'#0D1117' }}/>
          </div>
          <h1 style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'1.5rem', fontWeight:400, color:'white', marginBottom:4 }}>Administration</h1>
          <p style={{ fontSize:'.82rem', color:'rgba(255,255,255,.35)' }}>ServiceConnect Sénégal</p>
        </div>
        <form onSubmit={handle} style={{ background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.1)', borderRadius:20, padding:28, backdropFilter:'blur(20px)' }}>
          <div style={{ marginBottom:14 }}>
            <label style={{ display:'block', fontSize:'.74rem', fontWeight:700, color:'rgba(255,255,255,.4)', marginBottom:7, textTransform:'uppercase', letterSpacing:'.06em' }}>Adresse email</label>
            <div style={{ position:'relative' }}>
              <Mail size={14} strokeWidth={1.8} style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', color:'rgba(255,255,255,.3)', pointerEvents:'none' }}/>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="khalifadylla@gmail.com" required style={{ width:'100%', padding:'11px 14px 11px 38px', borderRadius:10, border:'1.5px solid rgba(255,255,255,.12)', background:'rgba(255,255,255,.07)', color:'white', fontSize:'.88rem', outline:'none', fontFamily:'inherit', transition:'border-color .15s' }} onFocus={e=>e.target.style.borderColor='rgba(245,158,11,.6)'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,.12)'}/>
            </div>
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={{ display:'block', fontSize:'.74rem', fontWeight:700, color:'rgba(255,255,255,.4)', marginBottom:7, textTransform:'uppercase', letterSpacing:'.06em' }}>Mot de passe</label>
            <div style={{ position:'relative' }}>
              <Lock size={14} strokeWidth={1.8} style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', color:'rgba(255,255,255,.3)', pointerEvents:'none' }}/>
              <input type={show?'text':'password'} value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" required style={{ width:'100%', padding:'11px 40px 11px 38px', borderRadius:10, border:'1.5px solid rgba(255,255,255,.12)', background:'rgba(255,255,255,.07)', color:'white', fontSize:'.88rem', outline:'none', fontFamily:'inherit', transition:'border-color .15s' }} onFocus={e=>e.target.style.borderColor='rgba(245,158,11,.6)'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,.12)'}/>
              <button type="button" onClick={()=>setShow(!show)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,.3)' }}>{show?<EyeOff size={14} strokeWidth={1.8}/>:<Eye size={14} strokeWidth={1.8}/>}</button>
            </div>
          </div>
          {err&&<div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 14px', borderRadius:10, marginBottom:14, background:'rgba(244,63,94,.1)', border:'1px solid rgba(244,63,94,.3)', color:'#fca5a5', fontSize:'.82rem' }}><AlertCircle size={13} strokeWidth={2} style={{ flexShrink:0 }}/>{err}</div>}
          <button type="submit" disabled={loading} style={{ width:'100%', padding:12, borderRadius:10, background:'#F59E0B', color:'#0D1117', border:'none', cursor:'pointer', fontSize:'.9rem', fontWeight:700, fontFamily:'inherit', opacity:loading?.7:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            {loading?<><span style={{ width:14, height:14, borderRadius:'50%', border:'2px solid #0D1117', borderTopColor:'transparent', animation:'spin 0.7s linear infinite', display:'inline-block' }}/>Connexion…</>:'Se connecter'}
          </button>
        </form>
        <p style={{ textAlign:'center', marginTop:14, fontSize:'.74rem', color:'rgba(255,255,255,.2)' }}>Accès réservé aux administrateurs</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
