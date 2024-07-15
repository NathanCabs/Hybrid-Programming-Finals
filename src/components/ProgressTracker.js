import React from 'react';

const ProgressTracker = ({ entryCount }) => {
  return (
    <div>
      <h3>Progress Tracker</h3>
      <p>Total Entries: {entryCount}</p>
    </div>
  );
};

export default ProgressTracker;
