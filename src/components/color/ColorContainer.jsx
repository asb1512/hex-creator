import React, { useState, useEffect } from 'react';
import { useScore } from '../../context/ScoreProvider';
import generateCorrectColor from '../../services/generateCorrectColor';
import generateHexSet from '../../services/generateHexSet';
import Colors from './Colors';
import HexDisplay from './HexDisplay';
import './Color.css';

export default function ColorContainer() {
  const { dispatch } = useScore();
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
    // correct click
    if (hexData[correctColor] === hex) {
      setCurrentRound({ correct: true, disable: [] });
      setActive(false);
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

  return (
    <main>
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
    </main>
  );
}
