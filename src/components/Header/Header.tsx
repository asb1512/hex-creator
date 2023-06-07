import React from 'react';
import './Header.css';
import logo from '../../assets/hexcaster-logo.png';
import ScoreCounter from './ScoreCounter';

export default function Header() {
  return (
    <header>
      <img
        src={logo}
        alt="HexCaster"
        className="site-logo"
      />
      <ScoreCounter />
    </header>
  );
}
