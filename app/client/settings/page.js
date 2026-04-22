'use client';
import { useState } from 'react';
import { Camera, Key, LogOut, Bell, CreditCard, User } from 'lucide-react';
import AppShell from '@/components/AppShell';
import { Toast, useToast } from '@/components/Toast';

function Toggle({ value, onChange }) {
  return (
    <button onClick={() => onChange(!value)} className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
      style={{ background: value ? 'var(--ink)' : 'var(--border)' }}>
      <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform"
        style={{ transform: value ? 'translateX(22px)' : 'translateX(2px)' }} />
    </button>
  );
}

function Field({ label, defaultValue, type = 'text' }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--ink-faint)' }}>{label}</label>
      <input type={type} defaultValue={defaultValue}
        className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all"
        style={{ borderColor: 'var(--border)', fontFamily: 'DM Sans, sans-serif' }} />
    </div>
  );
}

function Section({ icon: Icon, title, children }) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={15} strokeWidth={2} style={{ color: 'var(--ink-muted)' }} />
        <h3 className="font-semibold text-sm" style={{ fontFamily: 'DM Serif Display, serif' }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [notifReponses, setNotifReponses] = useState(true);
  const [notifPromos, setNotifPromos] = useState(false);
  const [notifSMS, setNotifSMS] = useState(true);
  const { toast, showToast } = useToast();

  return (
    <AppShell role="client" title="Paramètres" subtitle="Compte et préférences">
      <div className="max-w-lg space-y-4">

        <Section icon={User} title="Profil">
          <div className="flex items-center gap-4 mb-5">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white"
                style={{ background: 'linear-gradient(135deg, var(--ink), var(--ink-soft))' }}>FD</div>
              <button onClick={() => showToast('Photo modifiée')}
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center"
                style={{ background: 'var(--ink)' }}>
                <Camera size={11} strokeWidth={2} style={{ color: 'white' }} />
              </button>
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>Fatou Diallo</p>
              <p className="text-xs" style={{ color: 'var(--ink-faint)' }}>fatou.diallo@gmail.com</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--ink-faint)' }}>Client depuis janv. 2024</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Prénom" defaultValue="Fatou" />
            <Field label="Nom" defaultValue="Diallo" />
            <Field label="Téléphone" defaultValue="+221 77 123 45 67" />
            <Field label="Quartier" defaultValue="Plateau, Dakar" />
          </div>
          <button onClick={() => showToast('Profil mis à jour')} className="btn-primary mt-4 px-5 py-2.5 text-sm">
            Enregistrer
          </button>
        </Section>

        <Section icon={Bell} title="Notifications">
          <div className="space-y-4">
            {[
              ['Réponses aux demandes', 'SMS quand un prestataire répond', notifReponses, setNotifReponses],
              ['Notifications SMS', 'Toutes les alertes par SMS', notifSMS, setNotifSMS],
              ['Promotions', 'Offres spéciales des prestataires', notifPromos, setNotifPromos],
            ].map(([title, desc, val, setter]) => (
              <div key={title} className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{title}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--ink-faint)' }}>{desc}</p>
                </div>
                <Toggle value={val} onChange={setter} />
              </div>
            ))}
          </div>
        </Section>

        <Section icon={CreditCard} title="Moyens de paiement">
          <div className="space-y-2">
            {[
              { id: 'wave', name: 'Wave', num: '77 *** ** 67', active: true },
              { id: 'om', name: 'Orange Money', num: 'Non configuré', active: false },
            ].map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border"
                style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{item.name}</p>
                  <p className="text-xs" style={{ color: 'var(--ink-faint)' }}>{item.num}</p>
                </div>
                {item.active
                  ? <span className="badge badge-green">Actif</span>
                  : <button onClick={() => showToast(`${item.name} ajouté`)} className="btn-primary px-3 py-1.5 text-xs">+ Ajouter</button>
                }
              </div>
            ))}
          </div>
        </Section>

        <Section icon={Key} title="Sécurité">
          <div className="space-y-2">
            <button onClick={() => showToast('Email de réinitialisation envoyé')}
              className="btn-secondary w-full py-3 text-sm flex items-center justify-center gap-2">
              <Key size={14} strokeWidth={1.8} /> Changer de mot de passe
            </button>
            <button onClick={() => showToast('À bientôt !')}
              className="w-full py-3 text-sm font-semibold rounded-xl border flex items-center justify-center gap-2 transition-colors"
              style={{ background: 'var(--rose-dim)', borderColor: '#fecdd3', color: 'var(--rose)' }}>
              <LogOut size={14} strokeWidth={1.8} /> Se déconnecter
            </button>
          </div>
        </Section>

      </div>
      <Toast toast={toast} />
    </AppShell>
  );
}
