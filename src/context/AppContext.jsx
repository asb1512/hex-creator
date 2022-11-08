import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

function contextReducer(state, action) {
  switch (action.type) {
    case 'setDeviceType':
      return {
        ...state,
        mobile: action.payload,
      };
    case 'restartGame':
      return {
        round: 1,
        score: 0,
        prevScore: 0,
        mobile: false,
      };
    case 'incrementRound':
      return {
        ...state,
        round: state.round + 1,
      };
    case 'addTwentyFive':
      return {
        round: state.round,
        mobile: state.mobile,
        score: state.score + 25,
        prevScore: state.score,
      };
    case 'addFifty':
      return {
        round: state.round,
        mobile: state.mobile,
        score: state.score + 50,
        prevScore: state.score,
      };
    case 'addOneHundred':
      return {
        round: state.round,
        mobile: state.mobile,
        score: state.score + 100,
        prevScore: state.score,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(contextReducer, {
    round: 1,
    score: 0,
    prevScore: 0,
    mobile: false,
  });
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a Score Provider');
  }
  return context;
}

export { ContextProvider, useAppContext };
