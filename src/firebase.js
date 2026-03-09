import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, push, remove, update } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// ── CRUD helpers ──────────────────────────────────────────────

export async function savePerson(person) {
  const r = ref(db, `people/${person.id}`);
  await set(r, person);
}

export async function deletePerson(id) {
  const r = ref(db, `people/${id}`);
  await remove(r);
}

export async function updatePerson(id, data) {
  const r = ref(db, `people/${id}`);
  await update(r, data);
}

export function subscribeToPeople(callback) {
  const r = ref(db, 'people');
  return onValue(r, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      callback(Object.values(data));
    } else {
      callback([]);
    }
  });
}

export async function seedDatabase(people) {
  for (const person of people) {
    await savePerson(person);
  }
}

// Atomically replace ALL people in one write
export async function atomicReseed(people) {
  const r = ref(db, 'people');
  const obj = {};
  people.forEach((p) => { obj[p.id] = p; });
  await set(r, obj);
}
