'use client';
import { useState } from 'react';
import { CheckCircle, Upload } from 'lucide-react';
import AppShell from '@/components/AppShell';
import { Toast, useToast } from '@/components/Toast';

export default function ProfilePage() {
  const [avail, setAvail] = useState('now');
  const { toast, showToast } = useToast();

  const F = ({ label, dv, type='text', fullWidth=false }) => (
    <div className={fullWidth ? 'col-span-2' : ''}>
      <label className="block text-xs font-semibold mb-1" style={{ color:'var(--ink-faint)' }}>{label}</label>
      <input type={type} defaultValue={dv}
        className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-colors"
        style={{ borderColor:'var(--border)', fontFamily:'DM Sans,sans-serif' }} />
    </div>
  );

  return (
    <AppShell role="provider" title="Mon profil" subtitle="Votre profil public visible par les clients">
      <div className="max-w-lg space-y-4">

        {/* Public card preview */}
        <div className="rounded-2xl overflow-hidden">
          <div className="h-16 relative" style={{ background:'linear-gradient(135deg,var(--ink),var(--ink-soft))' }}>
            <div className="absolute -bottom-7 left-5 w-14 h-14 rounded-2xl border-2 border-white flex items-center justify-center text-white font-bold text-lg"
              style={{ background:'linear-gradient(135deg,var(--amber),#d97706)' }}>MB</div>
          </div>
          <div className="bg-white px-5 pt-10 pb-5 border border-t-0 rounded-b-2xl" style={{ borderColor:'var(--border)' }}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-base" style={{ fontFamily:'DM Serif Display,serif' }}>Moussa Badiane</h3>
                <p className="text-sm" style={{ color:'var(--ink-muted)' }}>Électricien BT/MT · Dakar</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-base" style={{ fontFamily:'DM Serif Display,serif' }}>⭐ 4.8</div>
                <div className="text-xs" style={{ color:'var(--ink-faint)' }}>87 missions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Basic info */}
        <div className="card p-5">
          <h4 className="font-semibold mb-4 text-sm" style={{ fontFamily:'DM Serif Display,serif' }}>Informations</h4>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <F label="Prénom" dv="Moussa" />
            <F label="Nom" dv="Badiane" />
            <F label="Téléphone" dv="+221 76 456 78 90" />
            <F label="Zone d'intervention" dv="Dakar & banlieue" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1" style={{ color:'var(--ink-faint)' }}>Bio</label>
            <textarea rows={3} defaultValue="Électricien diplômé avec 8 ans d'expérience. Spécialiste BT/MT. Certifié SENELEC. Intervention 7j/7."
              className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none resize-none"
              style={{ borderColor:'var(--border)', fontFamily:'DM Sans,sans-serif' }} />
          </div>
        </div>

        {/* Tarifs */}
        <div className="card p-5">
          <h4 className="font-semibold mb-4 text-sm" style={{ fontFamily:'DM Serif Display,serif' }}>Tarifs & Disponibilité</h4>
          <div className="grid grid-cols-2 gap-3">
            <F label="Tarif journalier (FCFA)" dv="20000" type="number" />
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color:'var(--ink-faint)' }}>Disponibilité</label>
              <select value={avail} onChange={e=>setAvail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none"
                style={{ borderColor:'var(--border)', fontFamily:'DM Sans,sans-serif', background:'white' }}>
                <option value="now">Disponible maintenant</option>
                <option value="today">Aujourd'hui</option>
                <option value="week">Cette semaine</option>
                <option value="unavailable">Indisponible</option>
              </select>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="card p-5">
          <h4 className="font-semibold mb-4 text-sm" style={{ fontFamily:'DM Serif Display,serif' }}>Documents & Certifications</h4>
          <div className="space-y-2">
            {[['Certificat SENELEC',true],["Pièce d'identité (CNI)",true],['Assurance RC',false]].map(([name,ok])=>(
              <div key={name} className="flex items-center justify-between p-3 rounded-xl border" style={{ background:'var(--surface-2)', borderColor:'var(--border)' }}>
                <span className="text-sm font-medium" style={{ color:'var(--ink)' }}>{name}</span>
                {ok
                  ? <span className="badge badge-green flex items-center gap-1"><CheckCircle size={10} strokeWidth={2.5}/>Vérifié</span>
                  : <button onClick={()=>showToast('Document uploadé')} className="flex items-center gap-1.5 text-xs font-semibold" style={{ color:'var(--ink-muted)' }}>
                      <Upload size={12} strokeWidth={2} /> Ajouter
                    </button>
                }
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 pb-4">
          <button onClick={()=>showToast('Profil mis à jour et publié')} className="btn-primary w-full py-3 text-sm">Enregistrer et publier</button>
          <button onClick={()=>showToast('Déconnexion…')} className="btn-secondary w-full py-3 text-sm" style={{ color:'var(--rose)', borderColor:'var(--rose-dim)' }}>Se déconnecter</button>
        </div>
      </div>
      <Toast toast={toast} />
    </AppShell>
  );
}
