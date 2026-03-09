export const T = {
  bg0: '#0a0a0f',
  bg1: '#0f0f17',
  bg2: '#161622',
  bg3: '#1e1e2e',
  bg4: '#252538',
  border: '#2a2a3d',
  border2: '#353550',
  gold: '#d4a853',
  goldDim: '#a07830',
  goldGlow: 'rgba(212,168,83,0.15)',
  amber: '#f0c060',
  text0: '#f0ede8',
  text1: '#c8c4bc',
  text2: '#857f76',
  text3: '#504a44',
  red: '#e05555',
  redDim: 'rgba(224,85,85,0.12)',
  green: '#4ade80',
  greenDim: 'rgba(74,222,128,0.12)',
};

export const FD = "'Playfair Display', Georgia, serif";
export const FB = "'DM Sans', 'Helvetica Neue', sans-serif";
export const FM = "'DM Mono', monospace";

export const GLOBAL_STYLES = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { background: ${T.bg0}; min-height: 100vh; font-family: ${FB}; }
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: ${T.bg1}; }
  ::-webkit-scrollbar-thumb { background: ${T.bg4}; border-radius: 3px; }
  input, textarea, select {
    background: ${T.bg3} !important;
    color: ${T.text0} !important;
    font-family: ${FB};
  }
  input::placeholder, textarea::placeholder { color: ${T.text3} !important; }
  input:focus, textarea:focus, select:focus {
    outline: none !important;
    border-color: ${T.gold} !important;
    box-shadow: 0 0 0 2px ${T.goldGlow} !important;
  }
  option { background: ${T.bg3}; color: ${T.text0}; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%, 100% { opacity: .4; }
    50%       { opacity: .9; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const AVATAR_PALETTES = [
  ['#7c3aed', '#c4b5fd'],
  ['#b45309', '#fcd34d'],
  ['#065f46', '#6ee7b7'],
  ['#1e40af', '#93c5fd'],
  ['#9d174d', '#f9a8d4'],
  ['#0e7490', '#67e8f9'],
  ['#713f12', '#fdba74'],
  ['#374151', '#9ca3af'],
];
