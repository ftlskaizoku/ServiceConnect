'use client';
import { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true;
    if (isStandalone) return;

    // Check if previously dismissed
    if (localStorage.getItem('sc_install_dismissed')) return;

    // iOS detection
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(ios);

    if (ios) {
      // Show iOS instructions after 3s
      setTimeout(() => setShow(true), 3000);
      return;
    }

    // Android / Chrome: listen for beforeinstallprompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setShow(true), 3000);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  function dismiss() {
    setShow(false);
    setDismissed(true);
    localStorage.setItem('sc_install_dismissed', '1');
  }

  async function install() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setShow(false);
    setDeferredPrompt(null);
  }

  if (!show || dismissed) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 80, left: 12, right: 12,
      zIndex: 999, animation: 'slideUp .4s cubic-bezier(.16,1,.3,1) both',
    }}>
      <div style={{
        background: '#0D1117',
        borderRadius: 16,
        padding: '16px 16px 16px 16px',
        boxShadow: '0 8px 32px rgba(13,17,23,.4)',
        border: '1px solid rgba(245,158,11,.3)',
        display: 'flex',
        gap: 14,
        alignItems: 'flex-start',
        maxWidth: 480,
        margin: '0 auto',
      }}>
        {/* App icon */}
        <div style={{
          width: 52, height: 52, borderRadius: 14, flexShrink: 0,
          background: '#F59E0B',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Smartphone size={26} strokeWidth={2} style={{ color: '#0D1117' }} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: '"DM Serif Display", Georgia, serif',
            fontSize: '.95rem', color: 'white', marginBottom: 4,
          }}>
            Installer ServiceConnect
          </p>

          {isIOS ? (
            <p style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.6)', lineHeight: 1.5 }}>
              Appuyez sur <strong style={{ color: 'white' }}>Partager</strong> puis{' '}
              <strong style={{ color: 'white' }}>"Sur l'écran d'accueil"</strong>{' '}
              pour installer l'app.
            </p>
          ) : (
            <p style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.6)', lineHeight: 1.5 }}>
              Accédez rapidement depuis votre écran d'accueil, même sans connexion.
            </p>
          )}

          {!isIOS && (
            <button onClick={install} style={{
              marginTop: 10,
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '8px 16px', borderRadius: 9,
              background: '#F59E0B', color: '#0D1117',
              border: 'none', cursor: 'pointer',
              fontSize: '.82rem', fontWeight: 700,
              fontFamily: 'inherit',
            }}>
              <Download size={14} strokeWidth={2.5} />
              Installer l'app
            </button>
          )}
        </div>

        <button onClick={dismiss} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          padding: 4, flexShrink: 0,
        }}>
          <X size={16} strokeWidth={2} style={{ color: 'rgba(255,255,255,.4)' }} />
        </button>
      </div>
    </div>
  );
}
