import { T, FH, FC, FB, FU } from '../theme.js';
import { getName } from '../data/familyData.js';
import Avatar from './Avatar.jsx';

function Field({ label, value }) {
  if (!value) return null;
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontFamily: FB, fontSize: 8, color: T.goldDim, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontFamily: FU, fontSize: 13, color: T.text1, lineHeight: 1.6 }}>
        {value}
      </div>
    </div>
  );
}

function RelationChip({ person, onClick }) {
  if (!person) return null;
  return (
    <div
      onClick={() => onClick(person)}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '7px 10px', borderRadius: 10,
        background: T.bg3, border: `1px solid ${T.border}`,
        cursor: 'pointer', transition: 'all 0.2s',
        marginBottom: 6,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.goldDim; e.currentTarget.style.background = T.bg4; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.bg3; }}
    >
      <Avatar person={person} size={28} />
      <div>
        <div style={{ fontFamily: FH, fontSize: 11, color: T.text0, fontWeight: 700 }}>{getName(person)}</div>
        {person.birthYear && <div style={{ fontFamily: FB, fontSize: 8, color: T.text3 }}>b. {person.birthYear}</div>}
      </div>
    </div>
  );
}

export default function ProfilePanel({ person, people, onClose, onEdit, onSelect, isEditor }) {
  if (!person) return null;

  const fp = (id) => people.find((p) => p.id === id);
  const father = fp(person.fatherId);
  const mother = fp(person.motherId);
  const spouse = fp(person.spouseId);
  const children = people.filter((p) => p.fatherId === person.id || p.motherId === person.id);
  const siblings = people.filter((p) =>
    p.id !== person.id &&
    ((person.fatherId && p.fatherId === person.fatherId) ||
     (person.motherId && p.motherId === person.motherId))
  );

  const hasDoc = person.bio && person.bio.startsWith('SOURCE:');

  return (
    <div style={{
      position: 'fixed', top: 0, right: 0, bottom: 0,
      width: 340, zIndex: 100,
      background: `linear-gradient(160deg, ${T.bg1}, ${T.bg0})`,
      borderLeft: `1px solid ${T.border2}`,
      display: 'flex', flexDirection: 'column',
      animation: 'slideIn 0.35s cubic-bezier(0.25,0.46,0.45,0.94) forwards',
      boxShadow: '-8px 0 48px rgba(0,0,0,0.6)',
    }}>

      {/* Header */}
      <div style={{
        padding: '20px 20px 16px',
        borderBottom: `1px solid ${T.border}`,
        background: `linear-gradient(135deg, ${T.bg2}80, transparent)`,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div style={{ fontFamily: FB, fontSize: 8, color: T.goldDim, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Individual Record
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {isEditor && (
              <button onClick={onEdit} style={{
                background: T.bg3, color: T.gold, border: `1px solid ${T.goldDim}`,
                borderRadius: 8, padding: '5px 12px', fontFamily: FB, fontSize: 10, cursor: 'pointer',
              }}>
                Edit
              </button>
            )}
            <button onClick={onClose} style={{
              background: 'transparent', color: T.text3, border: `1px solid ${T.border}`,
              borderRadius: 8, padding: '5px 10px', fontSize: 14, cursor: 'pointer', lineHeight: 1,
            }}>
              ×
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <Avatar person={person} size={56} />
          <div>
            <div style={{ fontFamily: FH, fontSize: 18, fontWeight: 700, color: T.text0, lineHeight: 1.2, marginBottom: 4 }}>
              {getName(person)}
            </div>
            {(person.birthYear || person.deathYear) && (
              <div style={{ fontFamily: FB, fontSize: 10, color: T.gold, letterSpacing: '0.05em' }}>
                {person.birthYear || 'c.?'} {person.deathYear ? `- ${person.deathYear}` : ''}
              </div>
            )}
            {person.birthPlace && (
              <div style={{ fontFamily: FU, fontSize: 11, color: T.text3, fontStyle: 'italic', marginTop: 2 }}>
                {person.birthPlace}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflow: 'auto', padding: '18px 20px' }}>

        {/* Document badge */}
        {hasDoc && (
          <div style={{
            background: `linear-gradient(135deg, ${T.walnut}30, ${T.bg3})`,
            border: `1px solid ${T.goldDim}`,
            borderRadius: 10, padding: '10px 12px', marginBottom: 18,
            display: 'flex', alignItems: 'flex-start', gap: 10,
          }}>
            <div style={{ fontSize: 18, flexShrink: 0 }}>📜</div>
            <div>
              <div style={{ fontFamily: FB, fontSize: 8, color: T.gold, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 3 }}>
                Archival Document
              </div>
              <div style={{ fontFamily: FU, fontSize: 11, color: T.text2, lineHeight: 1.6 }}>
                {person.bio}
              </div>
            </div>
          </div>
        )}

        {!hasDoc && person.bio && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontFamily: FB, fontSize: 8, color: T.goldDim, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 6 }}>
              Notes
            </div>
            <div style={{ fontFamily: FU, fontSize: 13, color: T.text2, lineHeight: 1.7, fontStyle: 'italic' }}>
              {person.bio}
            </div>
          </div>
        )}

        {/* Divider */}
        <div style={{ height: 1, background: T.border, margin: '8px 0 16px' }} />

        {/* Relations */}
        {(father || mother) && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontFamily: FB, fontSize: 8, color: T.goldDim, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 8 }}>
              Parents
            </div>
            {father && <RelationChip person={father} onClick={onSelect} />}
            {mother && <RelationChip person={mother} onClick={onSelect} />}
          </div>
        )}

        {spouse && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontFamily: FB, fontSize: 8, color: T.goldDim, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 8 }}>
              Spouse
            </div>
            <RelationChip person={spouse} onClick={onSelect} />
          </div>
        )}

        {children.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontFamily: FB, fontSize: 8, color: T.goldDim, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 8 }}>
              Children ({children.length})
            </div>
            {children.map((c) => <RelationChip key={c.id} person={c} onClick={onSelect} />)}
          </div>
        )}

        {siblings.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontFamily: FB, fontSize: 8, color: T.goldDim, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 8 }}>
              Siblings ({siblings.length})
            </div>
            {siblings.map((s) => <RelationChip key={s.id} person={s} onClick={onSelect} />)}
          </div>
        )}
      </div>
    </div>
  );
}
