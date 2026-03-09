import { T, FD, AVATAR_PALETTES } from '../theme.js';
import { getInitials, getName } from '../data/familyData.js';

export default function Avatar({ person, size = 44 }) {
  const idx = parseInt(person.id, 36) % AVATAR_PALETTES.length;
  const [bg, fg] = AVATAR_PALETTES[idx];

  if (person.photo) {
    return (
      <img
        src={person.photo}
        alt={getName(person)}
        style={{
          width: size, height: size, borderRadius: '50%',
          objectFit: 'cover', border: `1.5px solid ${T.border2}`,
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `linear-gradient(135deg, ${bg}, ${fg})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 700, fontSize: size * 0.33,
      fontFamily: FD, border: `1.5px solid ${T.border2}`, flexShrink: 0,
    }}>
      {getInitials(person)}
    </div>
  );
}
