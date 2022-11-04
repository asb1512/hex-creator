import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

const ScoreContext = createContext();

function scoreReducer(state, action) {
  switch (action.type) {
    case 'addTwentyFive':
      return { score: state.score + 25 };
    case 'addFifty':
      return { score: state.score + 50 };
    case 'addOneHundred':
      return { score: state.score + 100 };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function ScoreProvider({ children }) {
  const [state, dispatch] = useReducer(scoreReducer, { score: 0 });
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
  );
}

ScoreProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function useScore() {
  const context = useContext(ScoreContext);
  if (context === undefined) {
    throw new Error('useScore must be used within a Score Provider');
  }
  return context;
}

export { ScoreProvider, useScore };
