import { createContext, useReducer } from "react";

export const DetectionContext = createContext();

export const detectionReducer = (state, action) => {
  switch (action.type) {
    case "SET_DETECTIONS":
      return {
        detections: action.payload,
      };
    case "CREATE_DETECTIONS":
      return {
        detections: [action.payload, ...state.detections],
      };
    case "DELETE_DETECTIONS":
      return {
        detections: state.detections.filter(
          (w) => w._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const DetectionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(detectionReducer, {
    detections: null,
  });

  return (
    <DetectionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DetectionContext.Provider>
  );
};
