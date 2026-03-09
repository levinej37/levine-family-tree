import { useMemo, useState } from 'react';
import { T, FH, FC, FB, FU } from '../theme.js';
import { getName } from '../data/familyData.js';
import Avatar from './Avatar.jsx';

const LINES = [
  { id: 'all',      label: 'Full Archive',   desc: 'All known lineages' },
  { id: 'paternal', label: 'Paternal Line',  desc: 'Levine · Shemin · Altschuler' },
  { id: 'maternal', label: 'Maternal Line',  desc: 'Terhune · Catanzaro · O\'Hanrahan' },
];

const PATERNAL_ROOTS = ['solomon-shemin','anna-altschuler','joseph-levine','hannah-solomon','jerome-levine-sr','patricia-horne'];
const MATERNAL_ROOTS = ['guy-l-terhune','lucy-e-terhune','lena-catanzaro','guy-terhune-sr','patricia-ohanrahan'];

const GEN_LABELS = [
  '2nd Great-Grandparents',
  'Great-Grandparents',
  'Grandparents',
  'Parents',
  'Your Generation',
  'Children',
  'Grandchildren',
];

function getLineIds(people, rootIds) {
  const result = new Set(rootIds);
  let changed = true;
  while (changed) {
    changed = false;
    people.forEach((p) => {
      if (!result.has(p.id) && (result.has(p.fatherId) || result.has(p.motherId))) {
        result.add(p.id);
        if (p.spouseId) result.add(p.spouseId);
        changed = true;
      }
    });
  }
  return result;
}

function PersonNode({ person, onClick, isSelected }) {
  const isHistorical = person.birthYear && parseInt(person.birthYear) < 1900;

  return (
    <div
      onClick={() => onClick(person)}
      style={{
        position: 'relative',
        background: isSelected
          ? `linear-gradient(160deg, ${T.bg4}, ${T.walnut}40)`
          : `linear-gradient(160deg, ${T.bg3}, ${T.bg2})`,
        border: `1px solid ${isSelected ? T.gold : isHistorical ? T.goldDim : T.border}`,
        borderRadius: 16,
        padding: '12px 10px 10px',
        cursor: 'pointer',
        width: 118,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        transition: 'all 0.25s cubic-bezier(0.25,0.46,0.45,0.94)',
        boxShadow: isSelected
          ? `0 0 0 1px ${T.gold}60, 0 8px 32px rgba(183,155,108,0.2)`
          : `0 2px 12px rgba(0,0,0,0.4)`,
        flexShrink: 0,
        userSelect: 'none',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          e.currentTarget.style.borderColor = T.border2;
          e.currentTarget.style.boxShadow = `0 6px 24px rgba(0,0,0,0.5)`;
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.borderColor = isHistorical ? T.goldDim : T.border;
          e.currentTarget.style.boxShadow = `0 2px 12px rgba(0,0,0,0.4)`;
        }
      }}
    >
      {isHistorical && (
        <div style={{
          position: 'absolute', top: -1, right: -1,
          width: 8, height: 8, borderRadius: '50%',
          background: T.goldDim,
          boxShadow: `0 0 6px ${T.goldDim}`,
        }} />
      )}
      <Avatar person={person} size={38} />
      <div style={{
        fontFamily: FH,
        fontSize: 10,
        fontWeight: 700,
        textAlign: 'center',
        color: isSelected ? T.goldLight : T.text0,
        lineHeight: 1.35,
        letterSpacing: '0.01em',
      }}>
        {getName(person)}
      </div>
      {(person.birthYear || person.deathYear) && (
        <div style={{
          fontFamily: FB,
          fontSize: 8,
          color: isSelected ? T.gold : T.text3,
          letterSpacing: '0.05em',
        }}>
          {person.birthYear || 'c.?'}{person.deathYear ? ` - ${person.deathYear}` : ''}
        </div>
      )}
      {person.birthPlace && (
        <div style={{
          fontFamily: FU,
          fontSize: 8,
          color: T.text3,
          textAlign: 'center',
          fontStyle: 'italic',
          lineHeight: 1.2,
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {person.birthPlace.split(',')[0]}
        </div>
      )}
    </div>
  );
}

function CoupleUnit({ primary, spouse, onClick, selectedId }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
      <PersonNode person={primary} onClick={onClick} isSelected={selectedId === primary.id} />
      {spouse && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, flexShrink: 0 }}>
            <div style={{ width: 18, height: 1, background: `linear-gradient(90deg, ${T.goldDim}, ${T.gold}, ${T.goldDim})` }} />
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: T.goldDim,
              boxShadow: `0 0 6px ${T.goldDim}50`,
            }} />
            <div style={{ width: 18, height: 1, background: `linear-gradient(90deg, ${T.goldDim}, ${T.gold}, ${T.goldDim})` }} />
          </div>
          <PersonNode person={spouse} onClick={onClick} isSelected={selectedId === spouse.id} />
        </>
      )}
    </div>
  );
}

export default function TreeView({ people, onSelect, selectedId }) {
  const [activeLine, setActiveLine] = useState('all');

  const fp = (id) => people.find((p) => p.id === id);

  const filteredPeople = useMemo(() => {
    if (activeLine === 'all') return people;
    const rootIds = activeLine === 'paternal' ? PATERNAL_ROOTS : MATERNAL_ROOTS;
    const ids = getLineIds(people, rootIds);
    return people.filter((p) => ids.has(p.id));
  }, [people, activeLine]);

  const genMap = useMemo(() => {
    const map = new Map();
    const roots = filteredPeople.filter((p) => {
      const hasFather = p.fatherId && filteredPeople.find((x) => x.id === p.fatherId);
      const hasMother = p.motherId && filteredPeople.find((x) => x.id === p.motherId);
      return !hasFather && !hasMother;
    });
    const queue = roots.map((r) => ({ id: r.id, gen: 0 }));
    while (queue.length) {
      const { id, gen } = queue.shift();
      if (map.has(id)) continue;
      map.set(id, gen);
      filteredPeople.filter((p) => p.fatherId === id || p.motherId === id)
        .forEach((c) => { if (!map.has(c.id)) queue.push({ id: c.id, gen: gen + 1 }); });
    }
    filteredPeople.forEach((p) => {
      if (!map.has(p.id) && p.spouseId && map.has(p.spouseId)) map.set(p.id, map.get(p.spouseId));
    });
    filteredPeople.forEach((p) => { if (!map.has(p.id)) map.set(p.id, 99); });
    return map;
  }, [filteredPeople]);

  const genGroups = useMemo(() => {
    const groups = new Map();
    genMap.forEach((gen, id) => {
      if (!groups.has(gen)) groups.set(gen, []);
      groups.get(gen).push(id);
    });
    return groups;
  }, [genMap]);

  const buildUnits = (ids) => {
    const seen = new Set();
    const units = [];
    ids.forEach((id) => {
      if (seen.has(id)) return;
      const person = fp(id);
      if (!person) return;
      seen.add(id);
      let spouse = null;
      if (person.spouseId && ids.includes(person.spouseId)) {
        spouse = fp(person.spouseId);
        if (spouse) seen.add(person.spouseId);
      }
      units.push({ primary: person, spouse });
    });
    return units;
  };

  const sortedGens = [...genGroups.entries()].filter(([g]) => g !== 99).sort(([a], [b]) => a - b);
  const unlinked = (genGroups.get(99) || []).map(fp).filter(Boolean);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Line Switcher */}
      <div style={{
        display: 'flex', gap: 12, padding: '16px 32px',
        borderBottom: `1px solid ${T.border}`,
        background: `linear-gradient(90deg, ${T.bg1}, ${T.bg0})`,
        flexShrink: 0, alignItems: 'center',
      }}>
        <span style={{ fontFamily: FB, fontSize: 9, color: T.text3, letterSpacing: '1.5px', textTransform: 'uppercase', marginRight: 4 }}>
          View
        </span>
        {LINES.map((line) => (
          <button
            key={line.id}
            onClick={() => setActiveLine(line.id)}
            style={{
              background: activeLine === line.id
                ? `linear-gradient(135deg, ${T.walnut}80, ${T.bg4})`
                : 'transparent',
              color: activeLine === line.id ? T.goldLight : T.text2,
              border: `1px solid ${activeLine === line.id ? T.goldDim : T.border}`,
              borderRadius: 10,
              padding: '7px 18px',
              fontFamily: FH,
              fontSize: 12,
              cursor: 'pointer',
              transition: 'all 0.2s',
              letterSpacing: '0.02em',
            }}
          >
            {line.label}
            {activeLine === line.id && (
              <span style={{ fontFamily: FB, fontSize: 8, color: T.text3, marginLeft: 8 }}>
                {line.desc}
              </span>
            )}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.goldDim, animation: 'pulseGold 2s infinite' }} />
          <span style={{ fontFamily: FB, fontSize: 9, color: T.text3 }}>
            {filteredPeople.length} records
          </span>
        </div>
      </div>

      {/* Tree Canvas */}
      <div style={{ flex: 1, overflow: 'auto', padding: '40px 48px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 'max-content', margin: '0 auto', gap: 0 }}>
          {sortedGens.map(([gen, ids], rowIdx) => {
            const units = buildUnits(ids);
            const label = GEN_LABELS[gen] || `Generation ${gen + 1}`;
            return (
              <div key={gen} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                {/* Generation label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', margin: `${rowIdx === 0 ? '0' : '8px'} 0 14px` }}>
                  <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg, transparent, ${T.border2})` }} />
                  <span style={{
                    fontFamily: FB, fontSize: 8, color: T.goldDim,
                    letterSpacing: '2px', textTransform: 'uppercase', flexShrink: 0,
                    padding: '3px 12px',
                    border: `1px solid ${T.border}`,
                    borderRadius: 20,
                    background: T.bg1,
                  }}>
                    {label}
                  </span>
                  <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg, ${T.border2}, transparent)` }} />
                </div>

                {/* Cards */}
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {units.map(({ primary, spouse }) => (
                    <CoupleUnit key={primary.id} primary={primary} spouse={spouse} onClick={onSelect} selectedId={selectedId} />
                  ))}
                </div>

                {/* Connector */}
                {rowIdx < sortedGens.length - 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '8px 0' }}>
                    <div style={{ width: 1, height: 20, background: `linear-gradient(to bottom, ${T.goldDim}, transparent)` }} />
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: T.goldDim, margin: '2px 0' }} />
                    <div style={{ width: 1, height: 8, background: `linear-gradient(to bottom, ${T.goldDim}, transparent)` }} />
                  </div>
                )}
              </div>
            );
          })}

          {unlinked.length > 0 && (
            <div style={{ marginTop: 48, width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg, transparent, ${T.border})` }} />
                <span style={{ fontFamily: FB, fontSize: 8, color: T.text3, letterSpacing: '2px', textTransform: 'uppercase', padding: '3px 12px', border: `1px solid ${T.border}`, borderRadius: 20, background: T.bg1 }}>
                  Unlinked Records
                </span>
                <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg, ${T.border}, transparent)` }} />
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                {unlinked.map((p) => (
                  <PersonNode key={p.id} person={p} onClick={onSelect} isSelected={selectedId === p.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
