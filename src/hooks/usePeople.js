import { useState, useEffect, useRef } from 'react';
import { subscribeToPeople, savePerson, deletePerson } from '../firebase.js';
import { FAMILY_SEED, genId } from '../data/familyData.js';

export function usePeople() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const seededRef = useRef(false);

  useEffect(() => {
    const unsub = subscribeToPeople((data) => {
      if (data.length === 0 && !seededRef.current) {
        seededRef.current = true;
        Promise.all(FAMILY_SEED.map((p) => savePerson(p))).then(() => {
          console.log('Seeded.');
        });
      } else if (data.length > 0) {
        // Deduplicate by id — keep last occurrence
        const map = new Map();
        data.forEach((p) => map.set(p.id, p));
        setPeople([...map.values()]);
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  const addPerson = async (personData) => {
    const person = { ...personData, id: genId() };
    await savePerson(person);
    return person;
  };

  const updatePerson = async (personData) => {
    await savePerson(personData);
  };

  const removePerson = async (id) => {
    await deletePerson(id);
    const updates = people
      .filter((p) => p.fatherId === id || p.motherId === id || p.spouseId === id)
      .map((p) => savePerson({
        ...p,
        fatherId: p.fatherId === id ? null : p.fatherId,
        motherId: p.motherId === id ? null : p.motherId,
        spouseId: p.spouseId === id ? null : p.spouseId,
      }));
    await Promise.all(updates);
  };

  return { people, loading, addPerson, updatePerson, removePerson };
}
