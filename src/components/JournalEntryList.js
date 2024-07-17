import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import "./Entries.css";

const JournalEntryList = ({ updateProgress, setEditingEntry, searchQuery }) => {
  const [entries, setEntries] = useState([]); // Holds the journal entries

  // Fetches the entries from the Firestore database
  useEffect(() => {
    const q = query(collection(db, "entries"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Map Firestore document snapshots to entries array
      const fetchedEntries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEntries(fetchedEntries); // Updates entries state
      updateProgress(fetchedEntries.length); // Update entry count
    });
    return () => unsubscribe(); // Unsubscribe from Firestore listener on component unmount
  }, [updateProgress]);

  // Handles the deletion of the entries
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "entries", id)); // Deletes entry from Firestore
      // Update entries by removing the deleted entry
      setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id)); 
      updateProgress(prevCount => prevCount - 1);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  // Filter entries based on search query
  const filteredEntries = entries.filter(entry => 
    entry.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div class="journal-entry">
      {filteredEntries.map(entry => (
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
