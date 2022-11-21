import React, { useState } from 'react';
import { useTrail, animated } from '@react-spring/web';
import { useAppContext } from '../../context/AppContext';
import styles from './StartButton.module.css';

function StartButton() {
  const { dispatch } = useAppContext();

  const [gameHasDifficulty, setGameDifficulty] = useState(false);

  const handleNewGameClick = () => {
    setGameDifficulty(true);
  };

  const handleDifficultyClick = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        dispatch({ type: 'restartGame', payload: 3 });
        break;
      case 'Medium':
        dispatch({ type: 'restartGame', payload: 5 });
        break;
      case 'Hard':
        dispatch({ type: 'restartGame', payload: 7 });
        break;
      default:
        break;
    }
  };

  const trails = useTrail(3, {
    width: gameHasDifficulty ? '100%' : '20%',
    opacity: gameHasDifficulty ? 1 : 0,
  });

  const buttons = [
    {
      text: 'Easy',
      style: 'top',
    },
    {
      text: 'Medium',
      style: 'middle',
    },
    {
      text: 'Hard',
      style: 'bottom',
    },
  ];

  const renderDifficulties = buttons.map((btn, idx) => (
    <animated.button
      key={btn.text}
      type="button"
      className={`${styles.btn} ${styles.secondary} ${styles[btn.style]}`}
      style={{ ...trails[idx] }}
      onClick={() => handleDifficultyClick(btn.text)}
    >
      {btn.text}
    </animated.button>
  ));

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.btn}
        onClick={() => handleNewGameClick()}
      >
        New Game
      </button>
      {renderDifficulties}
    </div>
  );
}

export default StartButton;
