import { T, FH as FD, FB, FH as FM } from '../theme.js';
import { getName } from '../data/familyData.js';
import Avatar from './Avatar.jsx';

export default function PeopleList({ people, onSelect, onAdd, searchQuery, isEditor }) {
  const filtered = people.filter((p) =>
    getName(p).toLowerCase().includes(searchQuery.toLowerCase())
    || (p.birthPlace || '').toLowerCase().includes(searchQuery.toLowerCase())
    || (p.bio || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
        {filtered.map((p, i) => (
          <div
            key={p.id}
            onClick={() => onSelect(p)}
            style={{
              background: `linear-gradient(145deg, ${T.bg3}, ${T.bg2})`,
              border: `1.5px solid ${T.border}`, borderRadius: 16,
              padding: '16px 18px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 14,
              boxShadow: '0 2px 8px rgba(0,0,0,.3)',
              transition: 'all .2s',
              animation: `fadeUp .3s ease ${i * 0.03}s both`,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.border2; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = 'none'; }}
          >
            <Avatar person={p} size={46} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: FD, fontWeight: 600, fontSize: 14, color: T.text0, lineHeight: 1.2 }}>{getName(p)}</div>
              <div style={{ fontSize: 11, color: T.text2, marginTop: 3, fontFamily: FM, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {[p.birthYear, p.birthPlace].filter(Boolean).join(' · ') || 'No details yet'}
              </div>
            </div>
          </div>
        ))}

        {/* Add person card — editors only */}
        {isEditor && (
          <div
            onClick={onAdd}
            style={{
              background: 'transparent', border: `1.5px dashed ${T.border2}`,
              borderRadius: 16, padding: '16px 18px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 10, color: T.text3, minHeight: 80, transition: 'all .2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.color = T.gold; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border2; e.currentTarget.style.color = T.text3; }}
          >
            <span style={{ fontSize: 20 }}>+</span>
            <span style={{ fontWeight: 500, fontSize: 13, fontFamily: FB }}>Add Person</span>
          </div>
        )}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: T.text3, fontFamily: FB, fontSize: 14 }}>
          No family members match your search.
        </div>
      )}
    </div>
  );
}
