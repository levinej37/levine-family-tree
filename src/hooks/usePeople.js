import { useState, useEffect } from 'react';
import { subscribeToPeople, savePerson, deletePerson } from '../firebase.js';
import { FAMILY_SEED, genId } from '../data/familyData.js';

export function usePeople() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    const unsub = subscribeToPeople((data) => {
      if (data.length === 0 && !seeded) {
        // First run — seed the database with family data
        setSeeded(true);
        Promise.all(FAMILY_SEED.map((p) => savePerson(p))).then(() => {
          console.log('Family data seeded to Firebase.');
        });
      } else {
        setPeople(data);
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
    // Clean up references in other people
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
