import { useState } from 'react';
import { T, FH as FD, FB, FH as FM } from '../theme.js';

export default function LoginModal({ onLogin, onClose, error, setError }) {
  const [code, setCode] = useState('');

  const handleSubmit = () => {
    onLogin(code);
  };

  const iS = {
    width: '100%', border: `1.5px solid ${T.border2}`, borderRadius: 10,
    padding: '12px 16px', fontSize: 16, letterSpacing: '4px',
    textAlign: 'center', fontFamily: FM, background: T.bg3, color: T.text0,
    boxSizing: 'border-box',
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.82)',
        backdropFilter: 'blur(8px)', zIndex: 2000,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: `linear-gradient(160deg, ${T.bg2}, ${T.bg1})`,
          border: `1px solid ${T.border2}`, borderRadius: 20,
          padding: 40, width: '100%', maxWidth: 400,
          boxShadow: `0 32px 80px rgba(0,0,0,0.6)`,
          animation: 'fadeUp .25s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold accent */}
        <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)`, margin: '-40px -40px 32px' }} />

        {/* Icon */}
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: `linear-gradient(135deg, ${T.goldDim}, ${T.gold})`,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 20px rgba(212,168,83,0.3)`,
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0a0808" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>

        <h2 style={{ fontFamily: FD, fontWeight: 700, fontSize: 22, color: T.text0, textAlign: 'center', marginBottom: 8 }}>
          Family Access
        </h2>
        <p style={{ fontFamily: FB, fontSize: 13, color: T.text2, textAlign: 'center', marginBottom: 28, lineHeight: 1.6 }}>
          Enter the family passcode to unlock editing. Contact James if you need access.
        </p>

        <input
          type="password"
          value={code}
          onChange={(e) => { setCode(e.target.value); setError(''); }}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="••••••••••••"
          style={iS}
          autoFocus
        />

        {error && (
          <div style={{ color: T.red, fontSize: 12, textAlign: 'center', marginTop: 10, fontFamily: FB }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, background: T.bg4, color: T.text1,
              border: `1px solid ${T.border2}`, borderRadius: 10,
              padding: '11px 0', fontWeight: 600, fontSize: 13,
              cursor: 'pointer', fontFamily: FB,
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            style={{
              flex: 2,
              background: `linear-gradient(135deg, ${T.goldDim}, ${T.gold})`,
              color: '#0a0808', border: 'none', borderRadius: 10,
              padding: '11px 0', fontWeight: 700, fontSize: 13,
              cursor: 'pointer', fontFamily: FB,
              boxShadow: `0 4px 16px rgba(212,168,83,0.2)`,
            }}
          >
            Unlock Editing
          </button>
        </div>
      </div>
    </div>
  );
}
