import React, { useEffect, useRef } from 'react';
import { useCountUp } from 'react-countup';
import { useAppContext } from '../../context/AppContext';

export default function ScoreCounter() {
  const { state: { score, prevScore } } = useAppContext();

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
