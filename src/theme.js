// ── HERITAGE ARCHIVE THEME ────────────────────────────────────
export const T = {
  // Core palette
  walnut:     '#4A3B2C',
  walnutDark: '#2E2419',
  walnutDeep: '#1A1208',
  gold:       '#B79B6C',
  goldLight:  '#D4BC8A',
  goldDim:    '#7A6540',
  parchment:  '#F3EFE6',
  parchmentDark: '#E8E2D5',
  parchmentDeep: '#D9D1C0',
  ink:        '#1A1208',
  inkLight:   '#2E2419',

  // Text
  text0: '#F3EFE6',
  text1: '#E0D8C8',
  text2: '#B8AC96',
  text3: '#8A7D65',

  // Backgrounds
  bg0: '#0F0B06',
  bg1: '#1A1208',
  bg2: '#221A0E',
  bg3: '#2E2419',
  bg4: '#3A2E1E',

  // Accents
  border:  'rgba(183,155,108,0.15)',
  border2: 'rgba(183,155,108,0.35)',
  border3: 'rgba(183,155,108,0.6)',

  sepia:   '#8B7355',
  rust:    '#8B4513',
  sage:    '#6B7C5A',
};

// Fonts
export const FH = '"Libre Baskerville", Georgia, serif';
export const FC = '"Cormorant Garamond", Georgia, serif';
export const FB = '"IBM Plex Mono", monospace';
export const FU = 'system-ui, sans-serif';

export const GLOBAL_STYLES = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: ${T.bg0};
    color: ${T.text0};
    font-family: ${FU};
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: ${T.bg1}; }
  ::-webkit-scrollbar-thumb { background: ${T.goldDim}; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: ${T.gold}; }

  /* Noise texture overlay */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.06;
  }

  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulseGold {
    0%, 100% { opacity: 0.4; }
    50%       { opacity: 1; }
  }

  .fade-up { animation: fadeUp 0.7s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
  .fade-up-2 { animation: fadeUp 0.7s 0.15s cubic-bezier(0.25,0.46,0.45,0.94) both; }
  .fade-up-3 { animation: fadeUp 0.7s 0.3s cubic-bezier(0.25,0.46,0.45,0.94) both; }
  .fade-up-4 { animation: fadeUp 0.7s 0.45s cubic-bezier(0.25,0.46,0.45,0.94) both; }

  button { cursor: pointer; }
  input, textarea { font-family: inherit; }
`;
