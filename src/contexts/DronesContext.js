import { createContext, useReducer } from "react";

export const DronesContext = createContext();

export const droneReducer = (state, action) => {
  switch (action.type) {
    case "SET_DRONES":
      return {
        drones: action.payload,
      };
    case "CREATE_DRONES":
      return {
        drones: [action.payload, ...state.detections],
      };
    default:
      return state;
  }
};

export const DetectionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(droneReducer, {
    detections: null,
  });

  return (
    <DronesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DronesContext.Provider>
  );
};