import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

const JournalForm = ({ updateProgress, editingEntry, setEditingEntry }) => {
  const [newEntry, setNewEntry] = useState('');
  const [entryDate, setEntryDate] = useState(new Date().toISOString().substring(0, 10));

  useEffect(() => {
    if (editingEntry) {
      setNewEntry(editingEntry.text);
      setEntryDate(new Date(editingEntry.date.seconds * 1000).toISOString().substring(0, 10));
    }
  }, [editingEntry]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEntry) {
        await updateDoc(doc(db, "entries", editingEntry.id), {
          text: newEntry,
          date: new Date(entryDate),
        });
        setEditingEntry(null);
      } else {
        await addDoc(collection(db, "entries"), {
          text: newEntry,
          date: new Date(entryDate),
          userId: auth.currentUser.uid,
        });
        updateProgress(prevCount => prevCount + 1);
      }
      setNewEntry('');
      setEntryDate(new Date().toISOString().substring(0, 10));
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
        placeholder="Write your journal entry..."
        required
      />
      <input
        type="date"
        value={entryDate}
        onChange={(e) => setEntryDate(e.target.value)}
        required
      />
      <button type="submit">{editingEntry ? 'Update Entry' : 'Add Entry'}</button>
    </form>
  );
};

export default JournalForm;
