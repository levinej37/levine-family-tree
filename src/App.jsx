import { useState, useEffect, useRef } from 'react';
import { T, FH, FC, FB, FU, GLOBAL_STYLES } from './theme.js';
import { EMPTY } from './components/ProfileModal.jsx';
import { useAuth } from './hooks/useAuth.js';
import { usePeople } from './hooks/usePeople.js';
import TreeView from './components/TreeView.jsx';
import PeopleList from './components/PeopleList.jsx';
import ProfilePanel from './components/ProfilePanel.jsx';
import ProfileModal from './components/ProfileModal.jsx';
import LoginModal from './components/LoginModal.jsx';

// ── TIMELINE DATA ─────────────────────────────────────────────
const TIMELINE = [
  { year: '1839', event: 'Solomon Shemin born in Mogilev, Belarus', type: 'birth' },
  { year: '1868', event: 'Louis Shemin born in Mogilev', type: 'birth' },
  { year: '1871', event: 'Ida Shemin born January 15 in Mogilev', type: 'birth' },
  { year: '1890', event: 'Louis & Ida Shemin married in Mogilev', type: 'marriage' },
  { year: '1894', event: 'Sophia Shemin born in Russia', type: 'birth' },
  { year: '1907', event: 'Ida Shemin arrives in New York aboard the Lithuania', type: 'migration' },
  { year: '1925', event: 'Gennaro Catanzaro born in Brooklyn, New York', type: 'birth' },
  { year: '1926', event: 'Gennaro adopted; becomes Guy Alden Terhune', type: 'event' },
];

// ── HERO ──────────────────────────────────────────────────────
function Hero({ onEnter }) {
  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
      background: T.bg0,
    }}>
      {/* Background radial glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 80% 60% at 50% 60%, ${T.walnut}20 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Gold lines decoration */}
      <div style={{
        position: 'absolute', top: '20%', left: '10%', right: '10%',
        height: 1, background: `linear-gradient(90deg, transparent, ${T.border2}, transparent)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', left: '10%', right: '10%',
        height: 1, background: `linear-gradient(90deg, transparent, ${T.border}, transparent)`,
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ textAlign: 'center', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <div className="fade-up" style={{
          fontFamily: FB, fontSize: 10, color: T.goldDim,
          letterSpacing: '4px', textTransform: 'uppercase',
          marginBottom: 20,
        }}>
          Established · Est. 1839 · Mogilev, Belarus
        </div>

        <h1 className="fade-up-2" style={{
          fontFamily: FH,
          fontSize: 'clamp(42px, 8vw, 80px)',
          fontWeight: 700,
          color: T.text0,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          marginBottom: 8,
        }}>
          Levine
        </h1>
        <h2 className="fade-up-2" style={{
          fontFamily: FC,
          fontSize: 'clamp(28px, 5vw, 52px)',
          fontWeight: 300,
          color: T.gold,
          fontStyle: 'italic',
          lineHeight: 1.1,
          letterSpacing: '0.02em',
          marginBottom: 28,
        }}>
          Family Archive
        </h2>

        <p className="fade-up-3" style={{
          fontFamily: FU,
          fontSize: 14,
          color: T.text2,
          maxWidth: 480,
          margin: '0 auto 16px',
          lineHeight: 1.8,
        }}>
          Tracing a lineage from the Pale of Settlement in Mogilev, Belarus
          through immigration to New York — a living record of generations.
        </p>

        <div className="fade-up-3" style={{
          display: 'flex', gap: 24, justifyContent: 'center',
          fontFamily: FB, fontSize: 9, color: T.text3,
          letterSpacing: '1px', textTransform: 'uppercase',
          marginBottom: 44,
        }}>
          <span>Ashkenazi Jewish</span>
          <span style={{ color: T.border2 }}>·</span>
          <span>Swedish</span>
          <span style={{ color: T.border2 }}>·</span>
          <span>Irish</span>
          <span style={{ color: T.border2 }}>·</span>
          <span>Italian</span>
        </div>

        <button
          className="fade-up-4"
          onClick={onEnter}
          style={{
            background: `linear-gradient(135deg, ${T.walnut}, ${T.bg4})`,
            color: T.goldLight,
            border: `1px solid ${T.goldDim}`,
            borderRadius: 14,
            padding: '14px 40px',
            fontFamily: FH,
            fontSize: 14,
            cursor: 'pointer',
            letterSpacing: '0.05em',
            transition: 'all 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
            boxShadow: `0 4px 24px rgba(183,155,108,0.15)`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 8px 32px rgba(183,155,108,0.25)`;
            e.currentTarget.style.borderColor = T.gold;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = `0 4px 24px rgba(183,155,108,0.15)`;
            e.currentTarget.style.borderColor = T.goldDim;
          }}
        >
          Enter the Archive
        </button>
      </div>

      {/* Bottom scroll hint */}
      <div style={{
        position: 'absolute', bottom: 32,
        fontFamily: FB, fontSize: 8, color: T.text3,
        letterSpacing: '2px', textTransform: 'uppercase',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        animation: 'fadeUp 1s 0.8s both',
      }}>
        <span>Scroll to explore</span>
        <div style={{ width: 1, height: 24, background: `linear-gradient(to bottom, ${T.border2}, transparent)` }} />
      </div>
    </div>
  );
}

// ── TIMELINE SECTION ──────────────────────────────────────────
function Timeline() {
  const colors = { birth: T.gold, migration: '#6B9ABF', marriage: '#BF6B8A', event: T.sage };
  return (
    <div style={{
      padding: '64px 48px',
      borderTop: `1px solid ${T.border}`,
      background: `linear-gradient(180deg, ${T.bg0}, ${T.bg1})`,
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontFamily: FB, fontSize: 9, color: T.goldDim, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 12 }}>
            Movement Through Time
          </div>
          <h2 style={{ fontFamily: FH, fontSize: 28, color: T.text0, fontWeight: 700, letterSpacing: '-0.01em' }}>
            Migration Timeline
          </h2>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Center line */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: 1, background: `linear-gradient(to bottom, transparent, ${T.border2}, transparent)`,
            transform: 'translateX(-50%)',
          }} />

          {TIMELINE.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
              marginBottom: 28,
              position: 'relative',
              animation: `fadeUp 0.6s ${i * 0.08}s both`,
            }}>
              <div style={{
                width: '44%',
                background: T.bg2,
                border: `1px solid ${T.border}`,
                borderRadius: 12,
                padding: '12px 16px',
                position: 'relative',
              }}>
                <div style={{ fontFamily: FB, fontSize: 10, color: colors[item.type] || T.gold, marginBottom: 4 }}>
                  {item.year}
                </div>
                <div style={{ fontFamily: FU, fontSize: 12, color: T.text2, lineHeight: 1.5 }}>
                  {item.event}
                </div>
                {/* Dot on center line */}
                <div style={{
                  position: 'absolute',
                  top: '50%', transform: 'translateY(-50%)',
                  [i % 2 === 0 ? 'right' : 'left']: -24,
                  width: 8, height: 8, borderRadius: '50%',
                  background: colors[item.type] || T.gold,
                  border: `2px solid ${T.bg0}`,
                  boxShadow: `0 0 8px ${colors[item.type]}60`,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────
export default function App() {
  const { isEditor, login, logout, error, setError } = useAuth();
  const { people, loading, addPerson, updatePerson, removePerson } = usePeople();

  const [view, setView] = useState('tree');
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showHero, setShowHero] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const handler = () => setScrolled(el.scrollTop > 40);
    el.addEventListener('scroll', handler);
    return () => el.removeEventListener('scroll', handler);
  }, [showHero]);

  const handleSave = async (form) => {
    if (form.id && people.find((p) => p.id === form.id)) await updatePerson(form);
    else await addPerson(form);
    setEditing(null);
    setSelected(null);
  };

  const handleDelete = async (id) => {
    await removePerson(id);
    setEditing(null);
    setSelected(null);
  };

  if (loading) {
    return (
      <>
        <style>{GLOBAL_STYLES}</style>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: T.bg0, flexDirection: 'column', gap: 16 }}>
          <div style={{ width: 36, height: 36, border: `2px solid ${T.border}`, borderTopColor: T.gold, borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
          <div style={{ fontFamily: FC, fontSize: 18, color: T.text2, fontStyle: 'italic' }}>
            Loading the archive...
          </div>
        </div>
      </>
    );
  }

  if (showHero) {
    return (
      <>
        <style>{GLOBAL_STYLES}</style>
        <Hero onEnter={() => setShowHero(false)} />
      </>
    );
  }

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: T.bg0, color: T.text0 }}>

        {/* ── NAVBAR ── */}
        <nav style={{
          position: 'relative', zIndex: 50,
          background: scrolled
            ? `rgba(15,11,6,0.92)`
            : `linear-gradient(90deg, ${T.bg1}, ${T.walnutDark}80, ${T.bg1})`,
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: `1px solid ${scrolled ? T.border2 : T.border}`,
          padding: '0 28px',
          height: 56,
          display: 'flex', alignItems: 'center', gap: 20,
          flexShrink: 0,
          transition: 'all 0.3s',
          boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.5)' : 'none',
        }}>
          {/* Logo */}
          <button
            onClick={() => setShowHero(true)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10, padding: 0,
            }}
          >
            <div style={{
              width: 30, height: 30,
              background: `linear-gradient(135deg, ${T.walnut}, ${T.goldDim})`,
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 12px rgba(183,155,108,0.2)`,
            }}>
              <span style={{ fontSize: 14 }}>🌳</span>
            </div>
            <div>
              <div style={{ fontFamily: FH, fontSize: 13, fontWeight: 700, color: T.text0, lineHeight: 1 }}>
                Levine <span style={{ color: T.gold }}>Archive</span>
              </div>
              <div style={{ fontFamily: FB, fontSize: 7, color: T.text3, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                Family History
              </div>
            </div>
          </button>

          {/* Nav pills */}
          <div style={{ display: 'flex', gap: 2, background: T.bg0, borderRadius: 10, padding: '3px', border: `1px solid ${T.border}`, marginLeft: 8 }}>
            {[['tree','🌳','Tree'], ['list','👥','People']].map(([v, ic, l]) => (
              <button key={v} onClick={() => setView(v)} style={{
                background: view === v ? `linear-gradient(135deg, ${T.bg4}, ${T.walnut}50)` : 'none',
                color: view === v ? T.goldLight : T.text2,
                border: view === v ? `1px solid ${T.border2}` : '1px solid transparent',
                borderRadius: 8, padding: '5px 16px',
                fontFamily: FH, fontSize: 12, cursor: 'pointer', transition: 'all .15s',
              }}>
                {ic} {l}
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ flex: 1, maxWidth: 240, marginLeft: 'auto', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: T.text3, fontSize: 11 }}>⌕</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search records..."
              style={{
                width: '100%', border: `1px solid ${T.border}`, borderRadius: 9,
                padding: '7px 10px 7px 28px', fontSize: 12, boxSizing: 'border-box',
                background: T.bg2, color: T.text0, fontFamily: FU,
                outline: 'none',
              }}
            />
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 16, flexShrink: 0 }}>
            {[['Members', people.length]].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                <span style={{ fontFamily: FH, fontSize: 16, fontWeight: 700, color: T.gold }}>{v}</span>
                <span style={{ fontFamily: FB, fontSize: 8, color: T.text3, letterSpacing: '1px', textTransform: 'uppercase' }}>{l}</span>
              </div>
            ))}
          </div>

          {/* Auth */}
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            {isEditor ? (
              <>
                <button onClick={() => setEditing({ ...EMPTY })} style={{
                  background: `linear-gradient(135deg, ${T.walnut}, ${T.goldDim})`,
                  color: T.parchment, border: 'none', borderRadius: 9,
                  padding: '7px 16px', fontFamily: FH, fontSize: 12,
                  cursor: 'pointer', letterSpacing: '0.02em',
                  boxShadow: `0 2px 12px rgba(183,155,108,0.2)`,
                }}>
                  + Add Record
                </button>
                <button onClick={logout} style={{
                  background: T.bg3, color: T.text2,
                  border: `1px solid ${T.border}`, borderRadius: 9,
                  padding: '7px 12px', fontFamily: FB, fontSize: 10, cursor: 'pointer',
                }}>
                  🔓 Lock
                </button>
              </>
            ) : (
              <button onClick={() => setShowLogin(true)} style={{
                background: T.bg3, color: T.gold,
                border: `1px solid ${T.goldDim}`, borderRadius: 9,
                padding: '7px 14px', fontFamily: FH, fontSize: 12,
                cursor: 'pointer', letterSpacing: '0.02em',
              }}>
                🔒 Edit Mode
              </button>
            )}
          </div>
        </nav>

        {/* ── MAIN ── */}
        <div ref={mainRef} style={{ flex: 1, overflow: 'auto', paddingRight: selected && !editing ? 340 : 0, display: 'flex', flexDirection: 'column' }}>
          {view === 'tree' ? (
            <>
              <TreeView people={people} onSelect={setSelected} selectedId={selected?.id} />
              <Timeline />
              {/* Footer */}
              <div style={{
                padding: '32px 48px',
                borderTop: `1px solid ${T.border}`,
                background: T.walnutDeep,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontFamily: FH, fontSize: 16, color: T.gold, marginBottom: 4 }}>Levine Family Archive</div>
                  <div style={{ fontFamily: FB, fontSize: 9, color: T.text3, letterSpacing: '1px' }}>
                    Mogilev, Belarus · New York · Est. 1839
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', animation: 'pulseGold 2s infinite' }} />
                  <span style={{ fontFamily: FB, fontSize: 9, color: T.text3, letterSpacing: '1px' }}>
                    Archive active · {people.length} records
                  </span>
                </div>
              </div>
            </>
          ) : (
            <PeopleList people={people} onSelect={setSelected} onAdd={() => setEditing({ ...EMPTY })} searchQuery={search} isEditor={isEditor} />
          )}
        </div>

        {/* Panels & Modals */}
        {selected && !editing && (
          <ProfilePanel person={selected} people={people} onClose={() => setSelected(null)} onEdit={() => setEditing({ ...selected })} onSelect={setSelected} isEditor={isEditor} />
        )}
        {editing && (
          <ProfileModal person={editing} people={people} onClose={() => setEditing(null)} onSave={handleSave} onDelete={handleDelete} isEditor={isEditor} />
        )}
        {showLogin && (
          <LoginModal onLogin={(code) => { const ok = login(code); if (ok) setShowLogin(false); }} onClose={() => { setShowLogin(false); setError(''); }} error={error} setError={setError} />
        )}
      </div>
    </>
  );
}
