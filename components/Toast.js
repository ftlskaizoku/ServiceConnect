'use client';
import { useState, useCallback } from 'react';
import { CheckCircle } from 'lucide-react';

export function useToast() {
  const [toast, setToast] = useState({ msg: '', visible: false });
  const showToast = useCallback((msg) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  }, []);
  return { toast, showToast };
}

export function Toast({ toast }) {
  return (
    <div className="fixed bottom-24 lg:bottom-6 left-1/2 z-[100] pointer-events-none transition-all duration-300"
      style={{
        transform: `translateX(-50%) translateY(${toast.visible ? 0 : '10px'})`,
        opacity: toast.visible ? 1 : 0,
      }}>
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-white text-sm font-medium whitespace-nowrap"
        style={{ background: 'var(--ink)', boxShadow: '0 8px 32px rgba(13,17,23,.25)' }}>
        <CheckCircle size={15} strokeWidth={2.5} style={{ color: 'var(--emerald)', flexShrink: 0 }} />
        {toast.msg}
      </div>
    </div>
  );
}
