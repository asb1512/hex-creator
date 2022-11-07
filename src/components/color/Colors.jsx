import React from 'react';
import { useTrail, animated } from '@react-spring/web';
import PropTypes from 'prop-types';

export default function Colors({
  active,
  setActive,
  hexData,
  disabled,
  verifyClick,
}) {
  const verifyKeyDown = (e, hex) => {
    if (e.key === 'Enter') {
      verifyClick(hex);
    }
  };

  const trails = useTrail(3, {
    height: active ? '100%' : '0',
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
      style={{
        ...trails[idx],
        opacity: disabled?.includes(idx) ? 0.35 : 1,
      }}
      onClick={() => verifyClick(hex, idx)}
      onKeyDown={(e) => verifyKeyDown(e, hex)}
    >
      <div className="color" style={{ backgroundColor: `#${hex}` }} />
    </animated.div>
  ));

  return (renderColors);
}

Colors.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  hexData: PropTypes.arrayOf(PropTypes.string).isRequired,
  disabled: PropTypes.arrayOf(PropTypes.number).isRequired,
  verifyClick: PropTypes.func.isRequired,
};
