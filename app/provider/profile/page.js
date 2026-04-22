'use client';
import { useState } from 'react';
import AppShell from '@/components/AppShell';
import { Toast, useToast } from '@/components/Toast';

export default function ProfilePage() {
  const [avail, setAvail] = useState('now');
  const { toast, showToast } = useToast();

  const Field = ({ label, defaultValue, type = 'text' }) => (
    <div>
      <label className="block text-xs font-bold mb-1" style={{ color:'#7A91B0' }}>{label}</label>
      <input type={type} defaultValue={defaultValue}
        className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all focus:border-[var(--navy)]"
        style={{ borderColor:'var(--border)', fontFamily:'Plus Jakarta Sans,sans-serif' }} />
    </div>
  );

  const Card = ({ children, className='' }) => (
    <div className={`bg-white rounded-2xl border p-5 mb-4 ${className}`} style={{ borderColor:'var(--border)' }}>
      {children}
    </div>
  );

  return (
    <AppShell role="provider" title="Mon profil" subtitle="Gérez votre profil public visible par les clients">
      <div className="max-w-xl">

        {/* Public preview */}
        <div className="rounded-2xl p-5 mb-4 relative overflow-hidden" style={{ background:'linear-gradient(135deg, var(--navy), var(--navy-mid))' }}>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background:'radial-gradient(var(--gold), transparent)', transform:'translate(30%,-30%)' }} />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
              style={{ background:'linear-gradient(135deg, var(--gold), #cc8800)' }}>MB</div>
            <div>
              <h3 className="text-white font-bold text-lg" style={{ fontFamily:'Syne,sans-serif' }}>Moussa Badiane</h3>
              <p className="text-sm" style={{ color:'rgba(255,255,255,.6)' }}>Électricien BT/MT · Dakar</p>
              <p className="text-xs mt-1" style={{ color:'var(--gold)' }}>⭐ 4.8 · 87 missions · 97% satisfaction</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[['87','Missions'],['4.8★','Note'],['97%','Satisfaction']].map(([v,l]) => (
              <div key={l} className="rounded-xl py-2" style={{ background:'rgba(255,255,255,.08)' }}>
                <strong className="block text-lg font-bold text-white" style={{ fontFamily:'Syne,sans-serif' }}>{v}</strong>
                <span className="text-xs" style={{ color:'rgba(255,255,255,.5)' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Basic info */}
        <Card>
          <h4 className="font-bold mb-4" style={{ fontFamily:'Syne,sans-serif' }}>📝 Informations de base</h4>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Field label="Prénom" defaultValue="Moussa" />
            <Field label="Nom" defaultValue="Badiane" />
            <Field label="Téléphone" defaultValue="+221 76 456 78 90" />
            <Field label="Zone d'intervention" defaultValue="Dakar & banlieue" />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1" style={{ color:'#7A91B0' }}>Bio / Description</label>
            <textarea rows={3} defaultValue="Électricien diplômé avec 8 ans d'expérience. Spécialiste en BT/MT, installation, dépannage et mise en conformité. Certifié SENELEC. Intervention 7j/7."
              className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none resize-y"
              style={{ borderColor:'var(--border)', fontFamily:'Plus Jakarta Sans,sans-serif' }} />
          </div>
        </Card>

        {/* Tarifs */}
        <Card>
          <h4 className="font-bold mb-4" style={{ fontFamily:'Syne,sans-serif' }}>💰 Tarifs & Disponibilité</h4>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tarif journalier (FCFA)" defaultValue="20000" type="number" />
            <div>
              <label className="block text-xs font-bold mb-1" style={{ color:'#7A91B0' }}>Disponibilité</label>
              <select value={avail} onChange={e => setAvail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none"
                style={{ borderColor:'var(--border)', fontFamily:'Plus Jakarta Sans,sans-serif', background:'white' }}>
                <option value="now">Disponible maintenant</option>
                <option value="today">Disponible aujourd'hui</option>
                <option value="week">Cette semaine</option>
                <option value="unavailable">Indisponible</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Certifications */}
        <Card>
          <h4 className="font-bold mb-4" style={{ fontFamily:'Syne,sans-serif' }}>🏅 Certifications & Documents</h4>
          <div className="space-y-2">
            {[
              { name:'Certificat SENELEC', verified:true },
              { name:"Pièce d'identité (CNI)", verified:true },
              { name:'Assurance responsabilité civile', verified:false },
            ].map(doc => (
              <div key={doc.name} className="flex items-center justify-between p-3 rounded-xl border" style={{ background:'var(--bg)', borderColor:'var(--border)' }}>
                <div className="flex items-center gap-2">
                  <span>📄</span>
                  <span className="text-sm font-semibold" style={{ color:'var(--navy)' }}>{doc.name}</span>
                </div>
                {doc.verified
                  ? <span className="text-xs px-2 py-1 rounded-full font-semibold" style={{ background:'#E6F9F2', color:'var(--success)' }}>✓ Vérifié</span>
                  : <button onClick={() => showToast('📄 Document uploadé !')} className="px-3 py-1 text-xs font-bold text-white rounded-lg" style={{ background:'var(--navy)' }}>+ Ajouter</button>
                }
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-2">
          <button onClick={() => showToast('✅ Profil mis à jour et publié !')}
            className="w-full py-3 rounded-xl text-white font-bold text-sm"
            style={{ background:'var(--navy)' }}>
            💾 Enregistrer et publier
          </button>
          <button onClick={() => showToast('🚪 Déconnexion…')}
            className="w-full py-3 rounded-xl text-sm font-semibold border"
            style={{ background:'#FFF0F0', borderColor:'#FFCDD2', color:'var(--danger)' }}>
            🚪 Se déconnecter
          </button>
        </div>
      </div>
      <Toast toast={toast} />
    </AppShell>
  );
}
