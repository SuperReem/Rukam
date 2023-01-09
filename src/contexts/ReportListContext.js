import { createContext, useReducer } from "react";

export const ReportContext = createContext();

export const reportsReducer = (state, action) => {
  switch (action.type) {
    case "SET_REPORTS":
      return {
        reports: action.payload,
      };
    case "CREATE_REPORTS":
      return {
        reports: [action.payload, ...state.reports],
      };
    case "DELETE_REPORTS":
      return {
        reports: state.reports.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const ReportContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reportsReducer, {
    reports: null,
  });

  return (
    <ReportContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ReportContext.Provider>
  );
};
