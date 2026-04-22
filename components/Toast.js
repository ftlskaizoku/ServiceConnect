'use client';
import { useState, useCallback } from 'react';

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
    <div className="fixed bottom-24 lg:bottom-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 pointer-events-none"
      style={{ opacity: toast.visible ? 1 : 0, transform: `translateX(-50%) translateY(${toast.visible ? 0 : '10px'})` }}>
      <div className="px-5 py-3 rounded-xl text-white text-sm font-semibold whitespace-nowrap"
        style={{ background: 'var(--navy)', boxShadow: '0 8px 30px rgba(11,31,58,.3)' }}>
        {toast.msg}
      </div>
    </div>
  );
}
