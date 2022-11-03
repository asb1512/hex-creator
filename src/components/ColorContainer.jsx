import React, { useState } from 'react';
import generateHexValue from '../services/generateHexValue';

export default function ColorContainer() {
  const [data, setData] = useState('000000');

  return (
    <>
      <div className="color-cntr" style={{ backgroundColor: `#${data}` }}>
        <div>#{data}</div>
      </div>
      <button
        type="button"
        className="color-btn"
        onClick={() => setData(generateHexValue())}
      >
        Generate Color
      </button>
    </>
  );
}
