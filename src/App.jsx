import React from 'react';
import { ScoreProvider } from './context/ScoreProvider';
import Header from './components/Header/Header';
import ColorContainer from './components/color/ColorContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <ScoreProvider>
        <Header />
        <ColorContainer />
      </ScoreProvider>
    </div>
  );
}

export default App;
