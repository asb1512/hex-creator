import React, { useEffect, useState } from 'react';
import { useAppContext } from './context/AppContext';
import Header from './components/Header/Header';
import ColorContainer from './components/color/ColorContainer';
import StartButton from './components/Welcome/StartButton';
import './App.css';

function App() {
  const { dispatch, state: { round } } = useAppContext();
  const [appWidth, setAppWidth] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectAppSize = () => {
    setAppWidth({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', detectAppSize);
    if (appWidth.winWidth <= 750) {
      dispatch({ type: 'setDeviceType', payload: true });
    } else {
      dispatch({ type: 'setDeviceType', payload: false });
    }

    return () => window.removeEventListener('resize', detectAppSize);
  }, [appWidth]);

  return (
    <div className="App">
      <Header />
      {
        round
          ? <ColorContainer />
          : <StartButton />
      }
    </div>
  );
}

export default App;
