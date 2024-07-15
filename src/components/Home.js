import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import JournalForm from './JournalForm';
import JournalEntryList from './JournalEntryList';
import ProgressTracker from './ProgressTracker';

const Home = () => {
  const [progress, setProgress] = useState({ entryCount: 0 });

  const updateProgress = (entryCount) => {
    setProgress({ entryCount });
  };

  return (
    <div>
      <h2>Journal Entries</h2>
      <button onClick={() => signOut(auth)}>Sign Out</button>
      <JournalForm updateProgress={updateProgress} />
      <JournalEntryList updateProgress={updateProgress} />
      <ProgressTracker entryCount={progress.entryCount} />
    </div>
  );
};

export default Home;
