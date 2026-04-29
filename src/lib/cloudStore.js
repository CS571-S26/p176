import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  setDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  increment,
} from 'firebase/firestore';
import { db, firebaseEnabled } from '../firebase';

export { firebaseEnabled };

export function subscribeGuestbook(onChange, onError) {
  if (!db) return () => {};
  const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => {
      const entries = snap.docs.map((d) => {
        const data = d.data();
        const ts = data.createdAt?.toDate?.();
        return {
          id: d.id,
          name: data.name,
          message: data.message,
          date: ts ? ts.toLocaleDateString() : '',
        };
      });
      onChange(entries);
    },
    (err) => {
      console.error('guestbook subscribe error', err);
      onError?.(err);
    }
  );
}

export async function addGuestbookEntry({ name, message }) {
  if (!db) throw new Error('Firestore is not configured');
  const ref = await addDoc(collection(db, 'guestbook'), {
    name,
    message,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function deleteGuestbookEntry(id) {
  if (!db) throw new Error('Firestore is not configured');
  await deleteDoc(doc(db, 'guestbook', id));
}

export function subscribeVotes(onChange, onError) {
  if (!db) return () => {};
  return onSnapshot(
    collection(db, 'votes'),
    (snap) => {
      const map = {};
      snap.forEach((d) => {
        const c = d.data().count;
        if (typeof c === 'number') map[d.id] = c;
      });
      onChange(map);
    },
    (err) => {
      console.error('votes subscribe error', err);
      onError?.(err);
    }
  );
}

export async function incrementVote(projectId) {
  if (!db) throw new Error('Firestore is not configured');
  const ref = doc(db, 'votes', String(projectId));
  await setDoc(ref, { count: increment(1) }, { merge: true });
}
