import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

function scoreReducer(state, action) {
  switch (action.type) {
    case 'setDeviceType':
      return {
        ...state,
        mobile: action.payload,
      };
    case 'addTwentyFive':
      return {
        mobile: state.mobile,
        score: state.score + 25,
        prevScore: state.score,
      };
    case 'addFifty':
      return {
        score: state.score + 50,
        prevScore: state.score,
      };
    case 'addOneHundred':
      return {
        score: state.score + 100,
        prevScore: state.score,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(scoreReducer, {
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
