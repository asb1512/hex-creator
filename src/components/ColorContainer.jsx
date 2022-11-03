import React, { useState, useEffect } from 'react';
import { useTrail, animated } from '@react-spring/web';
import generateCorrectColor from '../services/generateCorrectColor';
import generateHexSet from '../services/generateHexSet';

export default function ColorContainer() {
  const [hexData, setHexData] = useState(generateHexSet());
  const [correctColor, setCorrectColor] = useState(generateCorrectColor());
  const [active, setActive] = useState(false);

  const verifyClick = (hex) => {
    if (hexData[correctColor] === hex) {
      setActive(false);
      setTimeout(() => {
        setHexData(generateHexSet());
        setCorrectColor(generateCorrectColor());
      }, 750);
    }
  };

  const verifyKeyDown = (e, hex) => {
    if (e.key === 'Enter') {
      verifyClick(hex);
    }
  };

  const trails = useTrail(3, {
    height: active ? '100%' : '0',
    opacity: active ? 1 : 0,
    onRest: () => setActive(true),
  });

  const renderColors = hexData.map((hex, idx) => (
    <animated.div
      key={hex}
      role="option"
      tabIndex={idx}
      className="color"
      aria-label={`color option #${idx + 1}`}
      aria-selected
      style={{
        backgroundColor: `#${hex}`,
        ...trails[idx],
      }}
      onClick={() => verifyClick(hex)}
      onKeyDown={(e) => verifyKeyDown(e, hex)}
    />
  ));

  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <>
      <div className="color-cntr">
        {renderColors}
      </div>
      <div className="hex-cntr">
        <div className="hex">#{hexData[correctColor]}</div>
      </div>
    </>
  );
}
