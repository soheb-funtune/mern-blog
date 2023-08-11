import React, { useEffect, useReducer } from "react";
import { Outlet } from "react-router-dom";

import { MyContext } from "./blog-context";

const initialValue = {
  count: 0,
  token: null,
  userId: null,
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: state.count + 1,
      };
    case "token":
      return {
        ...state,
        token: action.payload,
      };
    case "userId":
      return {
        ...state,
        userId: action.payload,
      };
    default:
      return state; // Return the current state if the action type is not recognized
  }
};

const ContextWrap = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue); // Corrected useReducer
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: "token", payload: token });
    } else {
      dispatch({ type: "token", payload: false });
    }
  }, []);

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
};

export default ContextWrap;
