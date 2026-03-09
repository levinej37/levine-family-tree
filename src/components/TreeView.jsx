import { T } from '../theme.js';
import PersonCard from './PersonCard.jsx';

export default function TreeView({ people, onSelect, selectedId }) {
  const fp = (id) => people.find((p) => p.id === id);
  const getChildren = (id) => people.filter((p) => p.motherId === id || p.fatherId === id);

  const renderCouple = (personId) => {
    const person = fp(personId);
    if (!person) return null;
    const spouse = person.spouseId ? fp(person.spouseId) : null;
    const kids = [...new Map(getChildren(personId).map((c) => [c.id, c])).values()];

    return (
      <div key={personId} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Couple row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <PersonCard person={person} onClick={onSelect} highlight={selectedId === person.id} />
          {spouse && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{ width: 20, height: 1, background: T.border2 }} />
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.goldDim }} />
                <div style={{ width: 20, height: 1, background: T.border2 }} />
              </div>
              <PersonCard person={spouse} onClick={onSelect} highlight={selectedId === spouse.id} />
            </>
          )}
        </div>

        {/* Children */}
        {kids.length > 0 && (
          <>
            <div style={{ width: 1, height: 22, background: `linear-gradient(to bottom, ${T.border2}, ${T.text3})`, margin: '0 auto', opacity: .7 }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, position: 'relative' }}>
              {kids.length > 1 && (
                <div style={{
                  position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                  width: 'calc(100% - 148px)', height: 1, background: T.border2, opacity: .6,
                }} />
              )}
              {kids.map((child) => (
                <div key={child.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 1, height: 20, background: `linear-gradient(to bottom, ${T.border2}, ${T.text3})`, opacity: .7 }} />
                  {renderCouple(child.id)}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  const seen = new Set();
  const roots = people
    .filter((p) => {
      const hasFather = p.fatherId && fp(p.fatherId);
      const hasMother = p.motherId && fp(p.motherId);
      return !hasFather && !hasMother;
    })
    .filter((p) => {
      if (seen.has(p.id)) return false;
      if (p.spouseId) seen.add(p.spouseId);
      seen.add(p.id);
      return true;
    });

  return (
    <div style={{ overflowX: 'auto', overflowY: 'auto', padding: 40, minHeight: 300 }}>
      <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {roots.map((r) => renderCouple(r.id))}
      </div>
    </div>
  );
}
