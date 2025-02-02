import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import JournalForm from './JournalForm';
import JournalEntryList from './JournalEntryList';
// import ProgressTracker from './ProgressTracker';
import SearchBar from './SearchBar';
import "./Home.css";


const Home = () => {
  const [progress, setProgress] = useState({ entryCount: 0 }); // Counts the number entries
  const [editingEntry, setEditingEntry] = useState(null); // Tracks the entry that is currently being edited
  const [searchQuery, setSearchQuery] = useState(''); // Stores search query

  // Update progress based on entry count
  const updateProgress = (entryCount) => {
    setProgress({ entryCount });
  };

  return (
    <div class="home">
      <h2>Journal Entries</h2>
      <button class="sign-out" onClick={() => signOut(auth)}>Sign Out</button>
      <SearchBar setSearchQuery={setSearchQuery} />
      <JournalForm updateProgress={updateProgress} editingEntry={editingEntry} setEditingEntry={setEditingEntry} />
      <JournalEntryList updateProgress={updateProgress} setEditingEntry={setEditingEntry} searchQuery={searchQuery}/>
      {/* <ProgressTracker entryCount={progress.entryCount} /> */}
    </div>
  );
};

export default Home;
