import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { useAppContext } from '../../context/AppContext';
import generateCorrectColor from '../../services/generateCorrectColor';
import generateHexSet from '../../services/generateHexSet';
import RoundCounter from './RoundCounter';
import Colors from './Colors';
import HexDisplay from './HexDisplay';
import GameOver from './GameOver';
import './Color.css';

export default function ColorContainer() {
  const { dispatch, state: { difficulty, round, gameOver } } = useAppContext();
  console.log('ColorContainer difficulty', difficulty)
  const transitions = useTransition(!gameOver, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  // sets three hex colors
  const [hexData, setHexData] = useState(generateHexSet(difficulty));
  // random selects one of three colors as the correct choice
  const [correctColor, setCorrectColor] = useState(
    generateCorrectColor(difficulty),
  );
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
        setHexData(generateHexSet(difficulty));
        setCorrectColor(generateCorrectColor(difficulty));
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

  // moves on to next round after 3 incorrect attempts
  useEffect(() => {
    if (currentRound.disable.length >= 3) {
      setCurrentRound({ correct: false, disable: [] });
      setActive(false);
      dispatch({ type: 'incrementRound' });
      setTimeout(() => {
        setHexData(generateHexSet(difficulty));
        setCorrectColor(generateCorrectColor(difficulty));
        setCurrentRound({ correct: false, disable: [] });
      }, 750);
    }
  }, [currentRound.disable]);

  // resets app state after tenth round
  useEffect(() => {
    if (round > 10) {
      dispatch({ type: 'gameOver' });
    }
  }, [round]);

  // when diffculty changes, colors re-render
  useEffect(() => {
    setHexData(generateHexSet(difficulty));
  }, [difficulty]);

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
          ? <GameOver />
          : null
      }
    </animated.main>
  ));
}
