import { T, FH } from '../theme.js';
import { getInitials } from '../data/familyData.js';

const GENDER_COLORS = {
  male:   { bg: 'linear-gradient(135deg, #2E3B4E, #1A2533)', accent: '#6B9ABF' },
  female: { bg: 'linear-gradient(135deg, #4A2E3B, #331A25)', accent: '#BF6B8A' },
  default:{ bg: 'linear-gradient(135deg, #3A3020, #261E10)', accent: '#B79B6C' },
};

export default function Avatar({ person, size = 44 }) {
  if (!person) return null;
  const { bg, accent } = GENDER_COLORS[person.gender] || GENDER_COLORS.default;
  const fontSize = Math.floor(size * 0.38);

  if (person.photo) {
    return (
      <div style={{
        width: size, height: size, borderRadius: '50%',
        overflow: 'hidden', flexShrink: 0,
        border: `1.5px solid rgba(183,155,108,0.4)`,
        boxShadow: `0 0 0 1px rgba(183,155,108,0.1)`,
      }}>
        <img src={person.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    );
  }

  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg, flexShrink: 0,
      border: `1.5px solid ${accent}40`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: `0 0 0 1px rgba(183,155,108,0.08), inset 0 1px 0 rgba(255,255,255,0.05)`,
    }}>
      <span style={{
        fontFamily: FH, fontSize, fontWeight: 700,
        color: accent, letterSpacing: '-0.02em',
        userSelect: 'none',
      }}>
        {getInitials(person)}
      </span>
    </div>
  );
}
