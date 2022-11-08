import React from 'react';
import { useAppContext } from '../../context/AppContext';
import './RoundCounter.css';

function RoundCounter() {
  const { state: { round } } = useAppContext();

  return (
    <div className="round-counter">
      {
        round <= 10
          ? `${round}/10`
          : null
      }
    </div>
  );
}

export default RoundCounter;
