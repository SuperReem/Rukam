import { createContext, useReducer } from "react";

export const ReportDContext = createContext();

export const reportReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_DETAILS":
      return {
        reportD: action.payload,
      };
      case "GET_DETAILS":
        return {
          reportD: action.payload,
        };
  
    default:
      return state;
  }
};

export const ReportDContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reportReducer, {
    reportD: null,
  });

  return (
    <ReportDContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ReportDContext.Provider>
  );
};
