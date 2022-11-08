import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import PropTypes from 'prop-types';
import { useAppContext } from '../../context/AppContext';
import generateCorrectColor from '../../services/generateCorrectColor';
import generateHexSet from '../../services/generateHexSet';
import RoundCounter from './RoundCounter';
import Colors from './Colors';
import HexDisplay from './HexDisplay';
import GameOver from './GameOver';
import './Color.css';

export default function ColorContainer({ gameActive }) {
  const { dispatch, state: { round } } = useAppContext();

  const transitions = useTransition(gameActive, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  // boolean if game is still continuing
  const [gameOver, setGameOver] = useState(false);
  // sets three hex colors
  const [hexData, setHexData] = useState(generateHexSet());
  // random selects one of three colors as the correct choice
  const [correctColor, setCorrectColor] = useState(generateCorrectColor());
  const [currentRound, setCurrentRound] = useState({
    correct: false,
    disable: [],
  });
  // animation
  const [active, setActive] = useState(false);
  // checks whether a click is correct/incorrect
  const verifyClick = (hex, idx) => {
    // if game is over no clicks are valid
    if (round > 10) return;
    // correct click
    if (hexData[correctColor] === hex) {
      setCurrentRound({ correct: true, disable: [] });
      setActive(false);
      dispatch({ type: 'incrementRound' });
      setTimeout(() => {
        setHexData(generateHexSet());
        setCorrectColor(generateCorrectColor());
        setCurrentRound({ correct: false, disable: [] });
      }, 750);
      if (currentRound.disable.length === 0) {
        dispatch({ type: 'addOneHundred' });
      }
      if (currentRound.disable.length === 1) {
        dispatch({ type: 'addFifty' });
      }
    } else {
      // incorrect click
      if (currentRound.disable.includes(idx)) return;
      setCurrentRound((prevState) => ({
        correct: false,
        disable: prevState.disable.length > 0
          ? [...prevState.disable, idx]
          : [idx],
      }));
    }
  };

  // starts animation after first render
  useEffect(() => {
    setActive(true);
  }, []);

  // sets game status to false after 10 rounds
  useEffect(() => {
    if (round <= 10) {
      setGameOver(false);
    } else {
      setGameOver(true);
    }
  }, [round]);

  return transitions((styles) => (
    <animated.main style={styles}>
      <RoundCounter />
      <div className="color-cntr">
        <Colors
          active={active}
          setActive={setActive}
          hexData={hexData}
          disabled={currentRound.disable}
          verifyClick={verifyClick}
        />
      </div>
      <HexDisplay
        hexData={hexData}
        correctColor={correctColor}
        currentRound={currentRound}
      />
      {
        gameOver
          ? <GameOver gameOver={gameOver} />
          : null
      }
    </animated.main>
  ));
}

ColorContainer.propTypes = {
  gameActive: PropTypes.bool.isRequired,
};
