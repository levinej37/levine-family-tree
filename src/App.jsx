import { useState } from 'react';
import { T, FD, FB, FM, GLOBAL_STYLES } from './theme.js';
import { EMPTY } from './components/ProfileModal.jsx';
import { useAuth } from './hooks/useAuth.js';
import { usePeople } from './hooks/usePeople.js';
import TreeView from './components/TreeView.jsx';
import PeopleList from './components/PeopleList.jsx';
import ProfilePanel from './components/ProfilePanel.jsx';
import ProfileModal from './components/ProfileModal.jsx';
import LoginModal from './components/LoginModal.jsx';

export default function App() {
  const { isEditor, login, logout, error, setError } = useAuth();
  const { people, loading, addPerson, updatePerson, removePerson } = usePeople();

  const [view, setView] = useState('tree');
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const handleSave = async (form) => {
    if (form.id && people.find((p) => p.id === form.id)) {
      await updatePerson(form);
    } else {
      await addPerson(form);
    }
    setEditing(null);
    setSelected(null);
  };

  const handleDelete = async (id) => {
    await removePerson(id);
    setEditing(null);
    setSelected(null);
  };

  const couples = people.filter((p) => p.spouseId && people.some((s) => s.id === p.spouseId)).length >> 1;
  const generations = people.filter((p) => p.birthYear).reduce((acc, p) => {
    const decade = Math.floor(parseInt(p.birthYear) / 10) * 10;
    acc.add(decade);
    return acc;
  }, new Set()).size;

  if (loading) {
    return (
      <>
        <style>{GLOBAL_STYLES}</style>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: T.bg0 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 40, height: 40, border: `3px solid ${T.border2}`, borderTopColor: T.gold, borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
            <div style={{ fontFamily: FD, fontSize: 16, color: T.text2 }}>Loading family tree…</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <div style={{ fontFamily: FB, background: T.bg0, minHeight: '100vh', display: 'flex', flexDirection: 'column', color: T.text0 }}>

        {/* ── HEADER ── */}
        <div style={{
          background: `linear-gradient(90deg, ${T.bg1}, ${T.bg2})`,
          borderBottom: `1px solid ${T.border}`,
          padding: '0 24px', display: 'flex', alignItems: 'center', gap: 18,
          height: 60, flexShrink: 0, boxShadow: '0 1px 20px rgba(0,0,0,.4)',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, background: `linear-gradient(135deg, ${T.goldDim}, ${T.gold})`, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 12px rgba(212,168,83,0.15)` }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="4.5" r="2.5" fill="#0a0808" />
                <circle cx="4.5" cy="18.5" r="2.5" fill="#0a0808" />
                <circle cx="19.5" cy="18.5" r="2.5" fill="#0a0808" />
                <line x1="12" y1="7" x2="12" y2="12.5" stroke="#0a0808" strokeWidth="1.8" />
                <line x1="12" y1="12.5" x2="4.5" y2="16" stroke="#0a0808" strokeWidth="1.8" />
                <line x1="12" y1="12.5" x2="19.5" y2="16" stroke="#0a0808" strokeWidth="1.8" />
              </svg>
            </div>
            <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 17, color: T.text0, letterSpacing: '-.3px' }}>
              Levine <span style={{ color: T.gold }}>Family</span>
            </span>
          </div>

          {/* Nav */}
          <div style={{ display: 'flex', gap: 3, marginLeft: 4, background: T.bg0, borderRadius: 10, padding: 3, border: `1px solid ${T.border}` }}>
            {[['tree', '🌳', 'Tree'], ['list', '👥', 'People']].map(([v, ic, l]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  background: view === v ? `linear-gradient(135deg, ${T.bg4}, ${T.bg3})` : 'none',
                  color: view === v ? T.amber : T.text2,
                  border: view === v ? `1px solid ${T.border2}` : '1px solid transparent',
                  borderRadius: 8, padding: '5px 16px', fontWeight: 600, fontSize: 12,
                  cursor: 'pointer', fontFamily: FB, transition: 'all .15s',
                }}
              >
                {ic} {l}
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ flex: 1, maxWidth: 260, marginLeft: 'auto', position: 'relative' }}>
            <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: T.text3, pointerEvents: 'none' }} width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search members…"
              style={{ width: '100%', border: `1px solid ${T.border}`, borderRadius: 9, padding: '7px 10px 7px 30px', fontSize: 12, boxSizing: 'border-box', background: T.bg3, color: T.text0, fontFamily: FB }}
            />
          </div>

          {/* Auth + Add buttons */}
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            {isEditor ? (
              <>
                <button
                  onClick={() => setEditing({ ...EMPTY })}
                  style={{ background: `linear-gradient(135deg, ${T.goldDim}, ${T.gold})`, color: '#0a0808', border: 'none', borderRadius: 9, padding: '8px 18px', fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: FB, boxShadow: `0 2px 12px rgba(212,168,83,0.2)` }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                >
                  + Add Person
                </button>
                <button
                  onClick={logout}
                  style={{ background: T.bg3, color: T.text2, border: `1px solid ${T.border}`, borderRadius: 9, padding: '8px 14px', fontWeight: 600, fontSize: 12, cursor: 'pointer', fontFamily: FB }}
                  title="Lock editing"
                >
                  🔓 Lock
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                style={{ background: T.bg3, color: T.gold, border: `1px solid ${T.goldDim}`, borderRadius: 9, padding: '8px 16px', fontWeight: 600, fontSize: 12, cursor: 'pointer', fontFamily: FB }}
                onMouseEnter={(e) => { e.currentTarget.style.background = T.bg4; e.currentTarget.style.borderColor = T.gold; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = T.bg3; e.currentTarget.style.borderColor = T.goldDim; }}
              >
                🔒 Edit Mode
              </button>
            )}
          </div>
        </div>

        {/* ── STATS BAR ── */}
        <div style={{ background: T.bg1, borderBottom: `1px solid ${T.border}`, padding: '7px 26px', display: 'flex', gap: 28, alignItems: 'center' }}>
          {[['Members', people.length], ['Couples', couples], ['Generations', generations || '—']].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
              <span style={{ fontFamily: FD, fontSize: 17, fontWeight: 700, color: T.gold }}>{v}</span>
              <span style={{ fontFamily: FM, fontSize: 10, color: T.text3, letterSpacing: '.8px', textTransform: 'uppercase' }}>{l}</span>
            </div>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            {isEditor && (
              <span style={{ fontFamily: FM, fontSize: 10, color: T.green, letterSpacing: '1px', textTransform: 'uppercase', background: T.greenDim, border: `1px solid rgba(74,222,128,0.2)`, borderRadius: 6, padding: '3px 8px' }}>
                ✓ Editing Unlocked
              </span>
            )}
            <span style={{ fontFamily: FM, fontSize: 10, color: T.text3, letterSpacing: '.5px' }}>
              {new Date().getFullYear()} · Levine Family Archive
            </span>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div style={{ flex: 1, overflow: 'auto', paddingRight: selected && !editing ? 310 : 0 }}>
          {view === 'tree'
            ? <TreeView people={people} onSelect={setSelected} selectedId={selected?.id} />
            : <PeopleList people={people} onSelect={setSelected} onAdd={() => setEditing({ ...EMPTY })} searchQuery={search} isEditor={isEditor} />
          }
        </div>

        {/* ── SIDE PANEL ── */}
        {selected && !editing && (
          <ProfilePanel
            person={selected}
            people={people}
            onClose={() => setSelected(null)}
            onEdit={() => setEditing({ ...selected })}
            onSelect={setSelected}
            isEditor={isEditor}
          />
        )}

        {/* ── EDIT MODAL ── */}
        {editing && (
          <ProfileModal
            person={editing}
            people={people}
            onClose={() => setEditing(null)}
            onSave={handleSave}
            onDelete={handleDelete}
            isEditor={isEditor}
          />
        )}

        {/* ── LOGIN MODAL ── */}
        {showLogin && (
          <LoginModal
            onLogin={(code) => {
              const ok = login(code);
              if (ok) setShowLogin(false);
            }}
            onClose={() => { setShowLogin(false); setError(''); }}
            error={error}
            setError={setError}
          />
        )}
      </div>
    </>
  );
}
