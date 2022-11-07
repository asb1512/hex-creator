import React, { useEffect, useRef } from 'react';
import { useCountUp } from 'react-countup';
import { useScore } from '../../context/ScoreProvider';

export default function ScoreCounter() {
  const { state: { score, prevScore } } = useScore();

  const scoreRef = useRef(null);
  const { update } = useCountUp({
    ref: scoreRef,
    start: prevScore,
    end: score,
    duration: 1,
  });

  useEffect(() => {
    update(score);
  }, [score]);

  return (
    <div className="score-cntr">
      <div className="score-title">Score</div>
      <div ref={scoreRef} className="score">
        {score}
      </div>
    </div>
  );
}
