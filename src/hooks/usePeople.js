import { useState, useEffect, useRef } from 'react';
import { subscribeToPeople, savePerson, deletePerson, atomicReseed } from '../firebase.js';
import { FAMILY_SEED, genId } from '../data/familyData.js';

const SEED_VERSION = '3';

export function usePeople() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const didInit = useRef(false);

  useEffect(() => {
    const unsub = subscribeToPeople(async (data) => {
      if (!didInit.current) {
        didInit.current = true;
        const stored = localStorage.getItem('seedVersion');
        if (stored !== SEED_VERSION) {
          await atomicReseed(FAMILY_SEED);
          localStorage.setItem('seedVersion', SEED_VERSION);
          return;
        }
      }
      if (data.length > 0) {
        const map = new Map();
        data.forEach((p) => map.set(p.id, p));
        setPeople([...map.values()]);
        setLoading(false);
      } else if (loading) {
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
