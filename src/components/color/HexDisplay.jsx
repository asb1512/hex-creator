import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from '@react-spring/web';

export default function HexDisplay({
  hexData,
  correctColor,
  currentRound,
}) {
  console.log('hex data', hexData)
  const progressSpring = useSpring({
    width: currentRound.correct
      ? '100%'
      : `${currentRound.disable.length * 33}%`,
    backgroundColor: currentRound.correct ? 'green' : 'red',
  });

  return (
    <div className="hex-cntr">
      <div className="hex">#{hexData[correctColor]}</div>
      <animated.div className="progress-tracker" style={progressSpring} />
    </div>
  );
}

HexDisplay.propTypes = {
  hexData: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctColor: PropTypes.number.isRequired,
  currentRound: PropTypes.shape({
    correct: PropTypes.bool.isRequired,
    disable: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};
