import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import "./Form.css";

const JournalForm = ({ updateProgress, editingEntry, setEditingEntry }) => {
  const [newEntry, setNewEntry] = useState(''); // State that holds new journal entry
  const [entryDate, setEntryDate] = useState(new Date().toISOString().substring(0, 10)); // Setting date

  useEffect(() => {
    if (editingEntry) {
      // This is prefilled if the entry already exists and is being edited
      setNewEntry(editingEntry.text);
      setEntryDate(new Date(editingEntry.date.seconds * 1000).toISOString().substring(0, 10));
    }
  }, [editingEntry]);

  // Handles the submission of the entries
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEntry) {
        // Update existing entry in Firestore
        await updateDoc(doc(db, "entries", editingEntry.id), {
          text: newEntry,
          date: new Date(entryDate),
        });
        setEditingEntry(null); // Clears editing after update of entry
      } else {
        // Adds new entry to Firestore
        await addDoc(collection(db, "entries"), {
          text: newEntry,
          date: new Date(entryDate),
          userId: auth.currentUser.uid,
        });
        updateProgress(prevCount => prevCount + 1); // Updates the entry count
      }
      setNewEntry(''); // Clears new entry text after submission
      setEntryDate(new Date().toISOString().substring(0, 10)); // Reset entry date
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div class="journal-form">
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
    </div>
  );
};

export default JournalForm;
