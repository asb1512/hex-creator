import React from 'react';
import { useTransition, animated } from '@react-spring/web';
import { useAppContext } from '../../context/AppContext';
import StartButton from '../Welcome/StartButton';
import './GameOver.css';

function GameOver() {
  const { state: { gameOver, score } } = useAppContext();

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
      <StartButton />
    </animated.div>
  ));
}

export default GameOver;
