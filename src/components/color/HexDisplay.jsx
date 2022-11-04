import React from 'react';
import PropTypes from 'prop-types';

export default function HexDisplay({
  hexData,
  correctColor,
}) {
  return (
    <div className="hex-cntr">
      <div className="hex">#{hexData[correctColor]}</div>
      <div className="progress-tracker" />
    </div>
  );
}

HexDisplay.propTypes = {
  hexData: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctColor: PropTypes.number.isRequired,
};
