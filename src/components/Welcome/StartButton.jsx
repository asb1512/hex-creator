import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../../context/AppContext';
import './StartButton.css';

function StartButton({ setGameStatus }) {
  const { dispatch } = useAppContext();

  const handleClick = () => {
    // user's first game
    if (setGameStatus) {
      setGameStatus(true);
    } else {
      dispatch({ type: 'restartGame' });
    }
  };

  return (
    <button
      type="button"
      className="new-game-btn"
      onClick={() => handleClick()}
    >
      New Game
    </button>
  );
}

export default StartButton;

StartButton.propTypes = {
  setGameStatus: PropTypes.func.isRequired,
};
