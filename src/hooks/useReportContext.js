import { ReportContext } from "../contexts/ReportListContext";
import { useContext } from "react";

export const useReportContext = () => {
  const context = useContext(ReportContext);

  if (!context) {
    throw Error(
      "useDetectionssContext must be used inside a DetectionContextProvider"
    );
  }

  return context;
};
