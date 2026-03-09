import { useState, useRef } from 'react';
import { T, FD, FB, FM } from '../theme.js';
import { getName, genId } from '../data/familyData.js';
import Avatar from './Avatar.jsx';

const EMPTY = {
  id: null, firstName: '', lastName: '', birthYear: '', deathYear: '',
  birthPlace: '', bio: '', photo: null,
  gender: 'unknown', fatherId: null, motherId: null, spouseId: null,
};

export { EMPTY };

export default function ProfileModal({ person, people, onClose, onSave, onDelete, isEditor }) {
  const [form, setForm] = useState({ ...person });
  const fileRef = useRef();

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setNull = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value || null }));

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm((f) => ({ ...f, photo: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const iS = {
    width: '100%', border: `1.5px solid ${T.border2}`, borderRadius: 9,
    padding: '8px 12px', fontSize: 13, boxSizing: 'border-box',
    background: T.bg3, color: T.text0, fontFamily: FB,
  };
  const lS = {
    fontSize: 11, fontWeight: 600, color: T.text2, display: 'block',
    marginBottom: 5, textTransform: 'uppercase', letterSpacing: '.7px', fontFamily: FB,
  };

  const rels = people.filter((p) => p.id !== person.id);
  const readOnly = !isEditor;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.78)',
        backdropFilter: 'blur(7px)', zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: `linear-gradient(160deg, ${T.bg2}, ${T.bg1})`,
          border: `1px solid ${T.border2}`, borderRadius: 20,
          padding: 32, width: '100%', maxWidth: 540,
          maxHeight: '92vh', overflowY: 'auto',
          boxShadow: `0 32px 80px rgba(0,0,0,0.6)`,
          animation: 'fadeUp .25s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)`, margin: '-32px -32px 24px' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
          <h2 style={{ fontFamily: FD, fontWeight: 700, fontSize: 20, color: T.text0 }}>
            {person.id ? (readOnly ? getName(person) : `Edit ${getName(person)}`) : 'Add Family Member'}
          </h2>
          {!isEditor && (
            <span style={{ fontFamily: FM, fontSize: 10, color: T.gold, letterSpacing: '1px', textTransform: 'uppercase' }}>
              View Only
            </span>
          )}
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: T.text2, padding: '2px 6px' }}>×</button>
        </div>

        {/* Photo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, paddingBottom: 20, borderBottom: `1px solid ${T.border}` }}>
          <Avatar person={form} size={68} />
          {isEditor && (
            <div>
              <button
                onClick={() => fileRef.current.click()}
                style={{ background: T.bg4, color: T.text1, border: `1px solid ${T.border2}`, borderRadius: 8, padding: '7px 16px', cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: FB }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.color = T.gold; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border2; e.currentTarget.style.color = T.text1; }}
              >
                Upload Photo
              </button>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhoto} />
              {form.photo && (
                <button onClick={() => setForm((f) => ({ ...f, photo: null }))} style={{ marginLeft: 10, background: 'none', border: 'none', cursor: 'pointer', color: T.red, fontSize: 12 }}>
                  Remove
                </button>
              )}
            </div>
          )}
        </div>

        {/* Name */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
          {[['firstName', 'First Name'], ['lastName', 'Last Name']].map(([k, l]) => (
            <div key={k}>
              <label style={lS}>{l}</label>
              <input value={form[k] || ''} onChange={set(k)} style={iS} disabled={readOnly} />
            </div>
          ))}
        </div>

        {/* Dates & Place */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 14 }}>
          {[['birthYear', 'Birth Year'], ['deathYear', 'Death Year'], ['birthPlace', 'Birthplace']].map(([k, l]) => (
            <div key={k}>
              <label style={lS}>{l}</label>
              <input value={form[k] || ''} onChange={set(k)} style={iS} disabled={readOnly} />
            </div>
          ))}
        </div>

        {/* Gender */}
        <div style={{ marginBottom: 14 }}>
          <label style={lS}>Gender</label>
          <select value={form.gender || 'unknown'} onChange={set('gender')} style={iS} disabled={readOnly}>
            <option value="unknown">Unknown / Other</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Relations */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 14 }}>
          {[['fatherId', 'Father'], ['motherId', 'Mother'], ['spouseId', 'Spouse / Partner']].map(([k, l]) => (
            <div key={k}>
              <label style={lS}>{l}</label>
              <select value={form[k] || ''} onChange={setNull(k)} style={iS} disabled={readOnly}>
                <option value="">— None —</option>
                {rels.map((p) => <option key={p.id} value={p.id}>{getName(p)}</option>)}
              </select>
            </div>
          ))}
        </div>

        {/* Bio */}
        <div style={{ marginBottom: 24 }}>
          <label style={lS}>Bio / Notes</label>
          <textarea value={form.bio || ''} onChange={set('bio')} rows={3} style={{ ...iS, resize: 'vertical' }} disabled={readOnly} />
        </div>

        {/* Actions */}
        {isEditor && (
          <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between' }}>
            {person.id && (
              <button
                onClick={() => onDelete(person.id)}
                style={{ background: T.redDim, color: T.red, border: `1px solid rgba(224,85,85,.25)`, borderRadius: 10, padding: '9px 20px', fontWeight: 600, cursor: 'pointer', fontSize: 13, fontFamily: FB }}
              >
                Delete
              </button>
            )}
            <div style={{ display: 'flex', gap: 10, marginLeft: 'auto' }}>
              <button onClick={onClose} style={{ background: T.bg4, color: T.text1, border: `1px solid ${T.border2}`, borderRadius: 10, padding: '9px 20px', fontWeight: 600, cursor: 'pointer', fontSize: 13, fontFamily: FB }}>
                Cancel
              </button>
              <button
                onClick={() => onSave({ ...form, id: form.id || genId() })}
                style={{ background: `linear-gradient(135deg, ${T.goldDim}, ${T.gold})`, color: '#0a0808', border: 'none', borderRadius: 10, padding: '9px 26px', fontWeight: 700, cursor: 'pointer', fontSize: 13, fontFamily: FB }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              >
                Save
              </button>
            </div>
          </div>
        )}
        {!isEditor && (
          <button onClick={onClose} style={{ width: '100%', background: T.bg4, color: T.text1, border: `1px solid ${T.border2}`, borderRadius: 10, padding: '10px 0', fontWeight: 600, cursor: 'pointer', fontSize: 13, fontFamily: FB }}>
            Close
          </button>
        )}
      </div>
    </div>
  );
}
