import React from 'react';
import { useTrail, animated } from '@react-spring/web';

export default function Colors({
  active,
  setActive,
  hexData,
  verifyClick,
}) {
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
      className="color-wrapper"
      aria-label={`color option #${idx + 1}`}
      aria-selected
      style={{ ...trails[idx] }}
      onClick={() => verifyClick(hex)}
      onKeyDown={(e) => verifyKeyDown(e, hex)}
    >
      <div className="color" style={{ backgroundColor: `#${hex}` }} />
    </animated.div>
  ));

  return (renderColors);
}
