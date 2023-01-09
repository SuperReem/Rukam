import { DronesContext } from "../contexts/DronesContext";
import { useContext } from "react";

export const useDronesContext = () => {
  const context = useContext(DronesContext);

  if (!context) {
    throw Error(
      "useDronesContext must be used inside a DronesContextProvider"
    );
  }

  return context;
};