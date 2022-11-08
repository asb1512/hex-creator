import React from 'react';
import { useTransition, animated } from '@react-spring/web';
import { useAppContext } from '../../context/AppContext';
import './GameOver.css';

function GameOver({ gameOver }) {
  const { state: { score } } = useAppContext();

  const transitions = useTransition(gameOver, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transitions((styles) => (
    <animated.div className="game-over" style={styles}>
      <div className="game-over-msg">
        You scored
        <br />
        <span>{score}</span>
      </div>
    </animated.div>
  ));
}

export default GameOver;
