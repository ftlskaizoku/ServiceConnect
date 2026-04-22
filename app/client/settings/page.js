'use client';
import { useState } from 'react';
import AppShell from '@/components/AppShell';
import { Toast, useToast } from '@/components/Toast';

export default function SettingsPage() {
  const { toast, showToast } = useToast();
  const [notifReponses, setNotifReponses] = useState(true);
  const [notifPromos, setNotifPromos] = useState(false);

  const Toggle = ({ value, onChange }) => (
    <button onClick={() => onChange(!value)}
      className="relative w-11 h-6 rounded-full transition-colors"
      style={{ background: value ? 'var(--navy)' : 'var(--border)' }}>
      <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
        style={{ transform: value ? 'translateX(22px)' : 'translateX(2px)' }} />
    </button>
  );

  const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-2xl border p-5 mb-4 ${className}`} style={{ borderColor: 'var(--border)' }}>
      {children}
    </div>
  );

  return (
    <AppShell role="client" title="Paramètres" subtitle="Gérez votre compte et vos préférences">
      <div className="max-w-xl">

        <Card>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
              style={{ background: 'linear-gradient(135deg, var(--navy), var(--teal))' }}>FD</div>
            <div>
              <h3 className="font-bold text-base" style={{ fontFamily: 'Syne, sans-serif' }}>Fatou Diallo</h3>
              <p className="text-xs" style={{ color: '#7A91B0' }}>fatou.diallo@gmail.com · Client depuis janv. 2024</p>
              <button onClick={() => showToast('📷 Photo modifiée !')} className="mt-1.5 px-3 py-1 text-xs font-semibold rounded-lg border transition-colors"
                style={{ borderColor: 'var(--border)', color: '#7A91B0' }}>📷 Changer la photo</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[['Prénom','Fatou'],['Nom','Diallo'],['Téléphone','+221 77 123 45 67'],['Quartier','Plateau, Dakar']].map(([label, val]) => (
              <div key={label}>
                <label className="block text-xs font-bold mb-1" style={{ color: '#7A91B0' }}>{label}</label>
                <input defaultValue={val} className="w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors focus:border-[var(--navy)]"
                  style={{ borderColor: 'var(--border)', fontFamily: 'Plus Jakarta Sans, sans-serif' }} />
              </div>
            ))}
          </div>
          <button onClick={() => showToast('✅ Profil mis à jour !')}
            className="mt-4 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-colors"
            style={{ background: 'var(--navy)' }}>
            Enregistrer les modifications
          </button>
        </Card>

        <Card>
          <h4 className="font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>🔔 Notifications</h4>
          <div className="space-y-4">
            {[
              ['Réponses aux demandes', 'Recevez un SMS quand un prestataire répond', notifReponses, setNotifReponses],
              ['Promotions et offres', 'Recevez les offres spéciales des prestataires', notifPromos, setNotifPromos],
            ].map(([title, desc, val, setter]) => (
              <div key={title} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>{title}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#7A91B0' }}>{desc}</p>
                </div>
                <Toggle value={val} onChange={setter} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h4 className="font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>💳 Moyens de paiement</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-xl border" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="text-sm font-bold" style={{ color: 'var(--navy)' }}>Wave</p>
                  <p className="text-xs" style={{ color: '#7A91B0' }}>77 *** ** 67 · Principal</p>
                </div>
              </div>
              <span className="text-xs px-2 py-1 rounded-full font-semibold" style={{ background: '#E6F9F2', color: 'var(--success)' }}>✓ Actif</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl border" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🟠</span>
                <div>
                  <p className="text-sm font-bold" style={{ color: 'var(--navy)' }}>Orange Money</p>
                  <p className="text-xs" style={{ color: '#7A91B0' }}>Non configuré</p>
                </div>
              </div>
              <button onClick={() => showToast('🟠 Orange Money ajouté !')} className="px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background: 'var(--navy)' }}>+ Ajouter</button>
            </div>
          </div>
        </Card>

        <Card>
          <h4 className="font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>🔒 Sécurité</h4>
          <div className="space-y-2">
            <button onClick={() => showToast('📧 Email de réinitialisation envoyé !')}
              className="w-full py-3 rounded-xl text-sm font-semibold border transition-colors hover:border-[var(--navy)]"
              style={{ borderColor: 'var(--border)', color: '#3D5275', background: 'var(--bg)' }}>
              🔑 Changer de mot de passe
            </button>
            <button onClick={() => showToast('À bientôt !')}
              className="w-full py-3 rounded-xl text-sm font-semibold border"
              style={{ background: '#FFF0F0', borderColor: '#FFCDD2', color: 'var(--danger)' }}>
              🚪 Se déconnecter
            </button>
          </div>
        </Card>

      </div>
      <Toast toast={toast} />
    </AppShell>
  );
}
