import { useState } from 'react';
import { T, FD, FM } from '../theme.js';
import { getName } from '../data/familyData.js';
import Avatar from './Avatar.jsx';

export default function PersonCard({ person, onClick, highlight }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(person)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: highlight
          ? `linear-gradient(145deg, ${T.bg4}, #1a1a2a)`
          : `linear-gradient(145deg, ${T.bg3}, ${T.bg2})`,
        border: `1.5px solid ${highlight ? T.gold : hovered ? T.border2 : T.border}`,
        borderRadius: 14, padding: '12px 16px', cursor: 'pointer',
        minWidth: 148, maxWidth: 190,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
        boxShadow: highlight
          ? `0 0 20px rgba(212,168,83,0.15), 0 4px 12px rgba(0,0,0,0.4)`
          : hovered ? `0 4px 16px rgba(0,0,0,0.35)` : `0 2px 6px rgba(0,0,0,0.25)`,
        transition: 'all .2s', userSelect: 'none', animation: 'fadeUp .3s ease',
      }}
    >
      <Avatar person={person} size={42} />
      <div style={{
        fontFamily: FD, fontWeight: 600, fontSize: 13,
        textAlign: 'center', color: highlight ? T.amber : T.text0, lineHeight: 1.25,
      }}>
        {getName(person)}
      </div>
      {person.birthYear && (
        <div style={{ fontFamily: FM, fontSize: 10, color: T.text2, letterSpacing: '.5px' }}>
          {person.birthYear}{person.deathYear ? ` – ${person.deathYear}` : ''}
        </div>
      )}
    </div>
  );
}
