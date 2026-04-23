'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Users, Briefcase, TrendingUp, Star, AlertCircle, LogOut, Shield, CheckCircle, XCircle, Search, BarChart3, Clock, CreditCard, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { PROVIDERS } from '@/lib/data';

const STATS={users:1247,newUsers:38,providers:312,active:198,missions:8542,missMonth:124,revenue:12450000,revGrowth:18,rating:4.7,sat:94};
const PENDING=[{id:101,name:'Ousmane Diallo',job:'Menuisier',location:'Pikine',submitted:'Il y a 2h',docs:2},{id:102,name:'Ndeye Sarr',job:'Nutritionniste',location:'Dakar',submitted:'Il y a 5h',docs:3},{id:103,name:'Samba Ndiaye',job:'Peintre',location:'Guédiawaye',submitted:'Hier',docs:1}];
const REPORTS=[{id:1,from:'Amadou D.',about:'Cheikh Diop',reason:'Prestataire absent au RDV',sev:'medium',date:'Auj.'},{id:2,from:'Nafi S.',about:'Aliou Ndiaye',reason:'Travail non conforme au devis',sev:'high',date:'Hier'}];
const MISSIONS=[{id:1,client:'Fatou D.',provider:'Mamadou Fall',service:'Plomberie',amount:25000,status:'active',date:'Auj.'},{id:2,client:'Ibou B.',provider:'Awa Diallo',service:'Dev Web',amount:150000,status:'done',date:'Hier'},{id:3,client:'Aissatou N.',provider:'Ibrahima Seck',service:'Électricité',amount:20000,status:'pending',date:'Hier'},{id:4,client:'Moussa K.',provider:'Mariama Cissé',service:'Cours',amount:12000,status:'done',date:'–2j'}];
const ST_STYLE={active:{label:'En cours',bg:'#D1FAE5',c:'#065F46'},pending:{label:'En attente',bg:'#FEF3C7',c:'#92400E'},done:{label:'Terminée',bg:'#F4F6FA',c:'#3D4F6B'}};

const TABS=[{id:'overview',label:'Vue d\'ensemble',icon:BarChart3},{id:'providers',label:'Prestataires',icon:Users},{id:'missions',label:'Missions',icon:Briefcase},{id:'pending',label:'Validations',icon:Clock},{id:'reports',label:'Signalements',icon:AlertCircle}];

export default function AdminDashboard() {
  const router=useRouter();
  const [tab,setTab]=useState('overview');
  const [search,setSearch]=useState('');
  const [pending,setPending]=useState(PENDING);
  const [reports,setReports]=useState(REPORTS);
  const [actions,setActions]=useState({});

  useEffect(()=>{ if(typeof window!=='undefined'&&!sessionStorage.getItem('sc_admin')) router.replace('/admin'); },[]);

  const logout=()=>{ sessionStorage.removeItem('sc_admin'); router.replace('/admin'); };
  const approve=(id)=>{ setActions(a=>({...a,[id]:'approved'})); setTimeout(()=>setPending(l=>l.filter(p=>p.id!==id)),700); };
  const reject=(id)=>{ setActions(a=>({...a,[id]:'rejected'})); setTimeout(()=>setPending(l=>l.filter(p=>p.id!==id)),700); };
  const resolve=(id)=>setReports(l=>l.filter(r=>r.id!==id));
  const filtered=PROVIDERS.filter(p=>!search||p.name.toLowerCase().includes(search.toLowerCase())||p.job.toLowerCase().includes(search.toLowerCase()));

  const S={
    header:{ background:'#0D1117', borderBottom:'1px solid rgba(255,255,255,.08)', padding:'0 20px', height:52, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:50 },
    aside:{ width:200, background:'white', borderRight:'1px solid var(--border)', padding:'14px 10px', flexShrink:0 },
    main:{ flex:1, padding:20, overflowY:'auto', paddingBottom:80 },
    card:{ background:'white', border:'1px solid var(--border)', borderRadius:12 },
    th:{ fontSize:'.68rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', color:'var(--ink-faint)', padding:'9px 12px', textAlign:'left', background:'var(--s2)', borderBottom:'1px solid var(--border)' },
    td:{ padding:'11px 12px', fontSize:'.82rem', color:'var(--ink-muted)', borderBottom:'1px solid var(--border)' },
  };

  return (
    <div style={{ minHeight:'100vh', background:'var(--s2)', display:'flex', flexDirection:'column' }}>
      <header style={S.header}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:26, height:26, borderRadius:7, background:'#F59E0B', display:'flex', alignItems:'center', justifyContent:'center' }}><Zap size={14} strokeWidth={2.5} style={{ color:'#0D1117' }}/></div>
          <span style={{ fontFamily:'"DM Serif Display",Georgia,serif', color:'white', fontSize:'.95rem' }}>ServiceConnect</span>
          <div style={{ display:'flex', alignItems:'center', gap:5, padding:'3px 9px', borderRadius:99, background:'rgba(245,158,11,.15)', border:'1px solid rgba(245,158,11,.3)' }}>
            <Shield size={10} strokeWidth={2} style={{ color:'#F59E0B' }}/>
            <span style={{ fontSize:'.65rem', fontWeight:700, color:'#F59E0B', letterSpacing:'.05em' }}>ADMIN</span>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:'.78rem', color:'rgba(255,255,255,.35)' }}>khalifadylla@gmail.com</span>
          <button onClick={logout} style={{ display:'flex', alignItems:'center', gap:5, padding:'6px 12px', borderRadius:8, border:'1px solid rgba(255,255,255,.12)', background:'transparent', color:'rgba(255,255,255,.5)', cursor:'pointer', fontSize:'.78rem', fontFamily:'inherit' }}>
            <LogOut size={12} strokeWidth={1.8}/>Déconnexion
          </button>
        </div>
      </header>

      <div style={{ display:'flex', flex:1, overflow:'hidden' }}>
        {/* Side nav - hidden on mobile via max-width media */}
        <aside style={{ ...S.aside, display:'flex', flexDirection:'column' }}>
          {TABS.map(t=>{ const Icon=t.icon; return(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{ display:'flex', alignItems:'center', gap:9, padding:'8px 11px', borderRadius:9, marginBottom:2, background:tab===t.id?'var(--s2)':'transparent', border:`1px solid ${tab===t.id?'var(--border)':'transparent'}`, color:tab===t.id?'var(--ink)':'var(--ink-muted)', cursor:'pointer', fontSize:'.82rem', fontWeight:tab===t.id?600:400, fontFamily:'inherit', textAlign:'left', transition:'all .15s' }}>
              <Icon size={15} strokeWidth={tab===t.id?2.2:1.8}/>{t.label}{(t.id==='pending'&&pending.length>0||t.id==='reports'&&reports.length>0)?<span style={{ marginLeft:'auto', background:'#F59E0B', color:'#0D1117', fontSize:'.62rem', fontWeight:700, padding:'1px 6px', borderRadius:99 }}>{t.id==='pending'?pending.length:reports.length}</span>:null}
            </button>
          );})}
        </aside>

        <main style={S.main}>

          {tab==='overview'&&(
            <div className="au">
              <h2 style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'1.2rem', fontWeight:400, marginBottom:16 }}>Vue d'ensemble</h2>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:10, marginBottom:20 }}>
                {[[Users,'Utilisateurs',STATS.users.toLocaleString(),`+${STATS.newUsers} / semaine`,'#F59E0B'],[Briefcase,'Prestataires',STATS.providers,`${STATS.active} actifs`,'#10B981'],[TrendingUp,'Missions',STATS.missions.toLocaleString(),`${STATS.missMonth} ce mois`,'#0EA5E9'],[CreditCard,'Revenus (M F)',(STATS.revenue/1000000).toFixed(1),`+${STATS.revGrowth}%`,'#8B5CF6'],[Star,'Note',STATS.rating,'1 200+ avis','#D97706'],[CheckCircle,'Satisfaction',STATS.sat+'%','Clients satisfaits','#10B981']].map(([Icon,l,v,sub,accent])=>(
                  <div key={l} style={{ ...S.card, padding:14, position:'relative', overflow:'hidden' }}>
                    <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:accent }}/>
                    <Icon size={16} strokeWidth={1.8} style={{ color:accent, marginBottom:8, display:'block' }}/>
                    <p style={{ fontSize:'.68rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color:'var(--ink-faint)', marginBottom:4 }}>{l}</p>
                    <p style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'1.4rem', color:'var(--ink)', lineHeight:1 }}>{v}</p>
                    <p style={{ fontSize:'.7rem', color:'var(--ink-faint)', marginTop:3 }}>{sub}</p>
                  </div>
                ))}
              </div>
              {(pending.length>0||reports.length>0)&&(
                <div style={{ ...S.card, padding:14, marginBottom:16, borderLeft:'3px solid #F59E0B' }}>
                  <h3 style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'.95rem', fontWeight:400, marginBottom:10 }}>🔔 Actions requises</h3>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                    {pending.length>0&&<button onClick={()=>setTab('pending')} style={{ display:'flex', alignItems:'center', gap:7, padding:'8px 14px', borderRadius:9, border:'1px solid #FEF3C7', background:'#FEF3C7', color:'#92400E', cursor:'pointer', fontSize:'.8rem', fontWeight:600, fontFamily:'inherit' }}><Clock size={13} strokeWidth={2}/>{pending.length} validation{pending.length>1?'s':''} en attente</button>}
                    {reports.length>0&&<button onClick={()=>setTab('reports')} style={{ display:'flex', alignItems:'center', gap:7, padding:'8px 14px', borderRadius:9, border:'1px solid #FFE4E6', background:'#FFE4E6', color:'#9F1239', cursor:'pointer', fontSize:'.8rem', fontWeight:600, fontFamily:'inherit' }}><AlertCircle size={13} strokeWidth={2}/>{reports.length} signalement{reports.length>1?'s':''}</button>}
                  </div>
                </div>
              )}
              <h3 style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'.95rem', fontWeight:400, marginBottom:10 }}>Missions récentes</h3>
              <div style={{ ...S.card, overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse' }}>
                  <thead><tr>{['Client','Prestataire','Service','Montant','Statut','Date'].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
                  <tbody>{MISSIONS.map(m=>{ const st=ST_STYLE[m.status]; return <tr key={m.id}><td style={S.td}>{m.client}</td><td style={S.td}>{m.provider}</td><td style={S.td}>{m.service}</td><td style={{ ...S.td, fontWeight:600, color:'var(--ink)' }}>{m.amount.toLocaleString('fr-FR')} F</td><td style={S.td}><span style={{ padding:'2px 8px', borderRadius:99, fontSize:'.7rem', fontWeight:600, background:st.bg, color:st.c }}>{st.label}</span></td><td style={S.td}>{m.date}</td></tr>; })}</tbody>
                </table>
              </div>
            </div>
          )}

          {tab==='providers'&&(
            <div className="au">
              <h2 style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'1.2rem', fontWeight:400, marginBottom:14 }}>Prestataires ({PROVIDERS.length})</h2>
              <div style={{ display:'flex', alignItems:'center', gap:10, background:'white', border:'1.5px solid var(--border)', borderRadius:11, padding:'9px 14px', marginBottom:12 }}>
                <Search size={14} strokeWidth={1.8} style={{ color:'var(--ink-faint)', flexShrink:0 }}/>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher…" style={{ flex:1, border:'none', outline:'none', fontSize:'.86rem', fontFamily:'inherit', color:'var(--ink)', background:'transparent' }}/>
              </div>
              <div style={{ ...S.card, overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse' }}>
                  <thead><tr>{['Prestataire','Service','Note','Missions','Satisf.','Tarif/j','Statut','Actions'].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
                  <tbody>{filtered.map(p=>(
                    <tr key={p.id} onMouseEnter={e=>e.currentTarget.style.background='var(--s2)'} onMouseLeave={e=>e.currentTarget.style.background=''}>
                      <td style={S.td}><div style={{ display:'flex', alignItems:'center', gap:8 }}><div style={{ width:28, height:28, borderRadius:8, background:p.color, display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:'.68rem', fontWeight:700, flexShrink:0 }}>{p.emoji}</div><div><div style={{ fontWeight:600, fontSize:'.82rem' }}>{p.name}</div><div style={{ fontSize:'.7rem', color:'var(--ink-faint)' }}>📍{p.dist}km</div></div></div></td>
                      <td style={S.td}>{p.job}</td>
                      <td style={{ ...S.td, fontWeight:600, color:'#D97706' }}>⭐{p.rating}</td>
                      <td style={S.td}>{p.missions}</td>
                      <td style={S.td}>{p.sat}%</td>
                      <td style={{ ...S.td, fontWeight:600 }}>{p.price.toLocaleString('fr-FR')} F</td>
                      <td style={S.td}><span style={{ padding:'2px 8px', borderRadius:99, fontSize:'.7rem', fontWeight:600, background:p.avail==='now'?'#D1FAE5':p.avail==='today'?'#FEF3C7':'#F4F6FA', color:p.avail==='now'?'#065F46':p.avail==='today'?'#92400E':'#3D4F6B' }}>{p.avail==='now'?'Actif':p.avail==='today'?"Auj'hui":'Semaine'}</span></td>
                      <td style={S.td}><div style={{ display:'flex', gap:5 }}><button onClick={()=>alert(`Profil: ${p.name}`)} style={{ padding:'4px 9px', borderRadius:7, border:'1px solid var(--border)', background:'var(--s2)', cursor:'pointer', fontSize:'.72rem', color:'var(--ink-muted)', fontFamily:'inherit' }}>Voir</button><button onClick={()=>alert(`Suspension: ${p.name}`)} style={{ padding:'4px 9px', borderRadius:7, border:'1px solid #fecdd3', background:'#FFF0F0', cursor:'pointer', fontSize:'.72rem', color:'#F43F5E', fontFamily:'inherit' }}>Susp.</button></div></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          )}

          {tab==='missions'&&(
            <div className="au">
              <h2 style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'1.2rem', fontWeight:400, marginBottom:14 }}>Missions récentes</h2>
              <div style={{ ...S.card, overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse' }}>
                  <thead><tr>{['Client','Prestataire','Service','Montant','Statut','Date'].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
                  <tbody>{MISSIONS.map(m=>{ const st=ST_STYLE[m.status]; return <tr key={m.id}><td style={S.td}>{m.client}</td><td style={S.td}>{m.provider}</td><td style={S.td}>{m.service}</td><td style={{ ...S.td, fontWeight:600 }}>{m.amount.toLocaleString('fr-FR')} F</td><td style={S.td}><span style={{ padding:'2px 8px', borderRadius:99, fontSize:'.7rem', fontWeight:600, background:st.bg, color:st.c }}>{st.label}</span></td><td style={S.td}>{m.date}</td></tr>; })}</tbody>
                </table>
              </div>
            </div>
          )}

          {tab==='pending'&&(
            <div className="au">
              <h2 style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'1.2rem', fontWeight:400, marginBottom:14 }}>Validations en attente {pending.length>0&&<span style={{ fontSize:'1rem', color:'var(--ink-faint)' }}>({pending.length})</span>}</h2>
              {pending.length===0?<div style={{ ...S.card, textAlign:'center', padding:48 }}><CheckCircle size={36} strokeWidth={1} style={{ color:'var(--border)', margin:'0 auto 10px', display:'block' }}/><p style={{ fontFamily:'"DM Serif Display",Georgia,serif', color:'var(--ink-muted)' }}>Tout est à jour</p></div>:
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {pending.map(p=>(
                  <div key={p.id} style={{ ...S.card, padding:14, display:'flex', alignItems:'center', gap:14, opacity:actions[p.id]?.5:1, transition:'opacity .3s' }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:'var(--s2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', flexShrink:0 }}>🧑‍🔧</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontWeight:600, fontSize:'.88rem', marginBottom:2 }}>{p.name}</p>
                      <p style={{ fontSize:'.76rem', color:'var(--ink-muted)' }}>{p.job} · 📍{p.location}</p>
                      <p style={{ fontSize:'.7rem', color:'var(--ink-faint)', marginTop:2 }}>Soumis {p.submitted} · {p.docs} doc{p.docs>1?'s':''}</p>
                    </div>
                    {actions[p.id]?<span style={{ fontSize:'.82rem', fontWeight:600, color:actions[p.id]==='approved'?'#065F46':'#9F1239' }}>{actions[p.id]==='approved'?'✓ Approuvé':'✗ Refusé'}</span>:
                    <div style={{ display:'flex', gap:8, flexShrink:0 }}>
                      <button onClick={()=>approve(p.id)} style={{ display:'flex', alignItems:'center', gap:5, padding:'8px 14px', borderRadius:9, border:'none', background:'#D1FAE5', color:'#065F46', cursor:'pointer', fontSize:'.8rem', fontWeight:600, fontFamily:'inherit' }}><CheckCircle size={13} strokeWidth={2.5}/>Approuver</button>
                      <button onClick={()=>reject(p.id)} style={{ display:'flex', alignItems:'center', gap:5, padding:'8px 14px', borderRadius:9, border:'none', background:'#FFE4E6', color:'#9F1239', cursor:'pointer', fontSize:'.8rem', fontWeight:600, fontFamily:'inherit' }}><XCircle size={13} strokeWidth={2.5}/>Refuser</button>
                    </div>}
                  </div>
                ))}
              </div>}
            </div>
          )}

          {tab==='reports'&&(
            <div className="au">
              <h2 style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:'1.2rem', fontWeight:400, marginBottom:14 }}>Signalements {reports.length>0&&<span style={{ fontSize:'1rem', color:'var(--ink-faint)' }}>({reports.length})</span>}</h2>
              {reports.length===0?<div style={{ ...S.card, textAlign:'center', padding:48 }}><CheckCircle size={36} strokeWidth={1} style={{ color:'var(--border)', margin:'0 auto 10px', display:'block' }}/><p style={{ fontFamily:'"DM Serif Display",Georgia,serif', color:'var(--ink-muted)' }}>Aucun signalement</p></div>:
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {reports.map(r=>(
                  <div key={r.id} style={{ ...S.card, padding:14, borderLeft:`4px solid ${r.sev==='high'?'#F43F5E':'#F59E0B'}` }}>
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:10 }}>
                      <div style={{ flex:1 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                          <span style={{ padding:'2px 8px', borderRadius:99, fontSize:'.68rem', fontWeight:700, background:r.sev==='high'?'#FFE4E6':'#FEF3C7', color:r.sev==='high'?'#9F1239':'#92400E' }}>{r.sev==='high'?'URGENT':'MOYEN'}</span>
                          <span style={{ fontSize:'.72rem', color:'var(--ink-faint)' }}>{r.date}</span>
                        </div>
                        <p style={{ fontWeight:600, fontSize:'.86rem', marginBottom:3 }}>{r.reason}</p>
                        <p style={{ fontSize:'.76rem', color:'var(--ink-muted)' }}>Signalé par <strong>{r.from}</strong> contre <strong>{r.about}</strong></p>
                      </div>
                      <div style={{ display:'flex', gap:8, flexShrink:0 }}>
                        <button onClick={()=>alert(`Profil: ${r.about}`)} style={{ padding:'6px 12px', borderRadius:8, border:'1px solid var(--border)', background:'var(--s2)', cursor:'pointer', fontSize:'.76rem', color:'var(--ink-muted)', fontFamily:'inherit' }}>Voir</button>
                        <button onClick={()=>resolve(r.id)} style={{ padding:'6px 12px', borderRadius:8, border:'none', background:'#D1FAE5', color:'#065F46', cursor:'pointer', fontSize:'.76rem', fontWeight:600, fontFamily:'inherit' }}>Résoudre</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
