'use client';
import { useState, useCallback } from 'react';
import { CheckCircle } from 'lucide-react';
export function useToast() {
  const [toast, setToast] = useState({ msg:'', visible:false });
  const showToast = useCallback((msg) => {
    setToast({ msg, visible:true });
    setTimeout(() => setToast(t=>({...t,visible:false})), 3000);
  }, []);
  return { toast, showToast };
}
export function Toast({ toast }) {
  return (
    <div style={{ position:'fixed', bottom:80, left:'50%', transform:`translateX(-50%) translateY(${toast.visible?0:'10px'})`, opacity:toast.visible?1:0, zIndex:999, pointerEvents:'none', transition:'all .3s', whiteSpace:'nowrap' }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, padding:'11px 18px', borderRadius:12, background:'#0D1117', color:'white', fontSize:'.84rem', fontWeight:500, boxShadow:'0 8px 32px rgba(13,17,23,.25)' }}>
        <CheckCircle size={14} strokeWidth={2.5} style={{ color:'#10B981', flexShrink:0 }}/>
        {toast.msg}
      </div>
    </div>
  );
}
