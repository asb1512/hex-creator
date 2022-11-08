import React from 'react';
import PropTypes from 'prop-types';
import './StartButton.css';

function StartButton({ setGameStatus }) {
  return (
    <button
      type="button"
      className="new-game-btn"
      onClick={() => setGameStatus(true)}
    >
      New Game
    </button>
  );
}

export default StartButton;

StartButton.propTypes = {
  setGameStatus: PropTypes.func.isRequired,
};
