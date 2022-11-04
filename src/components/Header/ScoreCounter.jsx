import React from 'react';
import { useScore } from '../../context/ScoreProvider';

export default function ScoreCounter() {
  const { state: { score } } = useScore();

  return (
    <div className="score-cntr">
      <div className="score-title">Score</div>
      <div className="score">{score}</div>
    </div>
  );
}
