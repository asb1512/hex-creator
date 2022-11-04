import React from 'react';
import './Header.css';
import logo from '../../assets/hexcaster-logo.png';

export default function Header() {
  return (
    <header>
      <img
        src={logo}
        alt="HexCaster"
      />
    </header>
  );
}
