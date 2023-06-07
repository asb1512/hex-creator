import React from 'react';
import { useTransition, animated } from '@react-spring/web';

export default function Welcome() {
  return (
    <animated.div className="welcome-cntr">
      <div className="blue-stripe" />
      <div className="yellow-stripe" />
      <div className="red-stripe" />
    </animated.div>
  );
}
