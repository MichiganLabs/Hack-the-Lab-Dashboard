import React, { createContext, useContext, useMemo, useReducer } from "react";

export interface GlobalState {
  exampleValue: string;
}

export interface Action {
  type: ActionType;
  payload: any;
}

// This interface is necessary to give our global state types when used in components
interface ContextProps {
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
}

enum ActionType {
  UPDATE_VALUE = "UPDATE_VALUE",
}

const initialState: GlobalState = {
  exampleValue: "example value",
};

// Create the context - we use our custom interface here so components can see it
const GlobalStateContext = createContext({} as ContextProps);

// Custom hook to use the global state context
const useGlobalState = () => {
  // useContext is a hook that returns the context value
  // In this case, the context value is an object with "state" and "dispatch"
  return useContext(GlobalStateContext);
};

// The reducer function to handle state updates
const globalStateReducer = (_state: GlobalState, action: Action) => {
  switch (action.type) {
    // Handle the UPDATE_VALUE action
    case ActionType.UPDATE_VALUE:
      // Return a new state with the new value
      return { ...action.payload };
  }
};

// The provider component makes the global state available to all inner components
const GlobalStateProvider = (props: { children: React.ReactNode }) => {
  // useReducer is a hook that accepts a reducer function and an initial state
  // It returns the current state and a dispatch function
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  // useMemo is a hook that will only recompute the memoized value when one of the dependencies has changed
  // This optimization helps to avoid expensive calculations on every render
  const GlobalStateContextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  // The provider component accepts a value prop to be passed to consuming components
  // All components inside the provider will have access to the global state
  return (
    <GlobalStateContext.Provider value={GlobalStateContextValue}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};

export { ActionType, GlobalStateProvider, useGlobalState };
