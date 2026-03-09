import { T, FD, FB, FM } from '../theme.js';
import { getName } from '../data/familyData.js';
import Avatar from './Avatar.jsx';

export default function ProfilePanel({ person, people, onClose, onEdit, onSelect, isEditor }) {
  const fp = (id) => people.find((p) => p.id === id);
  const children = people.filter((p) => p.fatherId === person.id || p.motherId === person.id);

  const RelRow = ({ label, id }) => {
    const rel = id ? fp(id) : null;
    if (!rel) return null;
    return (
      <div
        onClick={() => onSelect(rel)}
        style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '11px 12px', borderRadius: 12, cursor: 'pointer',
          marginBottom: 6, background: T.bg3, border: `1px solid ${T.border}`,
          transition: 'all .15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.border2; e.currentTarget.style.background = T.bg4; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.bg3; }}
      >
        <Avatar person={rel} size={36} />
        <div>
          <div style={{ fontFamily: FM, fontSize: 9, color: T.gold, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text0, fontFamily: FB }}>{getName(rel)}</div>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      position: 'fixed', right: 0, top: 0, bottom: 0, width: 310,
      background: `linear-gradient(180deg, ${T.bg2}, ${T.bg1})`,
      borderLeft: `1px solid ${T.border}`, zIndex: 500,
      overflowY: 'auto', boxShadow: '-8px 0 32px rgba(0,0,0,.4)',
      animation: 'fadeUp .2s ease',
    }}>
      <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)` }} />

      <div style={{ padding: '22px 22px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <span style={{ fontFamily: FM, fontSize: 10, color: T.text2, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Profile</span>
          <button
            onClick={onClose}
            style={{ background: T.bg3, border: `1px solid ${T.border}`, cursor: 'pointer', color: T.text2, width: 28, height: 28, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}
            onMouseEnter={(e) => { e.currentTarget.style.color = T.text0; e.currentTarget.style.borderColor = T.border2; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = T.text2; e.currentTarget.style.borderColor = T.border; }}
          >×</button>
        </div>

        {/* Hero */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${T.border}` }}>
          <div style={{ position: 'relative' }}>
            <Avatar person={person} size={80} />
            <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: `1.5px solid ${T.goldDim}`, animation: 'shimmer 3s ease infinite' }} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 20, color: T.text0, lineHeight: 1.2 }}>{getName(person)}</div>
            {person.birthYear && (
              <div style={{ fontFamily: FM, fontSize: 11, color: T.gold, marginTop: 5, letterSpacing: '1px' }}>
                b. {person.birthYear}{person.deathYear ? ` · d. ${person.deathYear}` : ''}
              </div>
            )}
            {person.birthPlace && <div style={{ fontSize: 12, color: T.text2, marginTop: 3 }}>{person.birthPlace}</div>}
          </div>
        </div>

        <RelRow label="Father" id={person.fatherId} />
        <RelRow label="Mother" id={person.motherId} />
        <RelRow label="Spouse / Partner" id={person.spouseId} />

        {children.length > 0 && (
          <div style={{ marginTop: 8 }}>
            <div style={{ fontFamily: FM, fontSize: 9, color: T.gold, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>Children</div>
            {children.map((c) => (
              <div
                key={c.id}
                onClick={() => onSelect(c)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12, cursor: 'pointer', marginBottom: 6, background: T.bg3, border: `1px solid ${T.border}`, transition: 'all .15s' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.border2; e.currentTarget.style.background = T.bg4; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.bg3; }}
              >
                <Avatar person={c} size={32} />
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text0, fontFamily: FB }}>{getName(c)}</div>
              </div>
            ))}
          </div>
        )}

        {person.bio && (
          <div style={{ marginTop: 16, padding: '14px 16px', background: T.bg3, borderRadius: 12, border: `1px solid ${T.border}`, fontSize: 13, color: T.text1, lineHeight: 1.7, fontFamily: FB }}>
            {person.bio}
          </div>
        )}

        <button
          onClick={onEdit}
          style={{
            marginTop: 20, width: '100%',
            background: `linear-gradient(135deg, ${T.bg4}, ${T.bg3})`,
            color: isEditor ? T.gold : T.text2,
            border: `1px solid ${isEditor ? T.goldDim : T.border}`,
            borderRadius: 12, padding: '11px 0', fontWeight: 600,
            fontSize: 13, cursor: 'pointer', fontFamily: FB, transition: 'all .15s',
          }}
          onMouseEnter={(e) => { if (isEditor) { e.currentTarget.style.background = `linear-gradient(135deg, rgba(212,168,83,0.1), ${T.bg4})`; e.currentTarget.style.borderColor = T.gold; } }}
          onMouseLeave={(e) => { e.currentTarget.style.background = `linear-gradient(135deg, ${T.bg4}, ${T.bg3})`; e.currentTarget.style.borderColor = isEditor ? T.goldDim : T.border; }}
        >
          {isEditor ? '✦ Edit Profile' : '👁 View Details'}
        </button>
      </div>
    </div>
  );
}
