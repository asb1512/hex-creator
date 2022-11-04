import React, { useState, useEffect } from 'react';
import generateCorrectColor from '../../services/generateCorrectColor';
import generateHexSet from '../../services/generateHexSet';
import Colors from './Colors';

export default function ColorContainer() {
  // sets three hex colors
  const [hexData, setHexData] = useState(generateHexSet());
  // random selects one of three colors as the correct choice
  const [correctColor, setCorrectColor] = useState(generateCorrectColor());
  const [currentRound, setCurrentRound] = useState({
    correct: false, incorrect: 0,
  });
  console.log(currentRound);
  // animation
  const [active, setActive] = useState(false);

  const verifyClick = (hex) => {
    if (hexData[correctColor] === hex) {
      setCurrentRound({ correct: true, incorrect: 0 });
      setActive(false);
      setTimeout(() => {
        setHexData(generateHexSet());
        setCorrectColor(generateCorrectColor());
        setCurrentRound({ correct: false, incorrect: 0 });
      }, 750);
    } else {
      setCurrentRound((prevState) => ({
        correct: false,
        incorrect: prevState.incorrect + 1,
      }));
    }
  };

  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <>
      <div className="color-cntr">
        <Colors
          active={active}
          setActive={setActive}
          hexData={hexData}
          verifyClick={verifyClick}
        />
      </div>
      <div className="hex-cntr">
        <div className="hex">#{hexData[correctColor]}</div>
        <div className="progress-tracker" />
      </div>
    </>
  );
}
