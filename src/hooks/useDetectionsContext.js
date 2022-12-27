import { DetectionContext } from "../contexts/DetectionListContext";
import { useContext } from "react";

export const useDetectionsContext = () => {
  const context = useContext(DetectionContext);

  if (!context) {
    throw Error(
      "useDetectionssContext must be used inside a DetectionContextProvider"
    );
  }

  return context;
};
