import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

const JournalEntryList = ({ updateProgress, setEditingEntry }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "entries"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedEntries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEntries(fetchedEntries);
      updateProgress(fetchedEntries.length);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "entries", id));
      setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
      updateProgress(prevCount => prevCount - 1);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div>
      {entries.map(entry => (
        <div key={entry.id}>
          <p>{entry.text}</p>
          <p>{new Date(entry.date.seconds * 1000).toDateString()}</p>
          <button onClick={() => setEditingEntry(entry)}>Edit</button>
          <button onClick={() => handleDelete(entry.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default JournalEntryList;
