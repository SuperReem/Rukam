import { ReportDContext } from "../contexts/ReportDetailsContext";
import { useContext } from "react";

export const useReportDContext = () => {
  const context = useContext(ReportDContext);

  if (!context) {
    throw Error(
      "useReportDContext must be used inside a ReportDContextProvider"
    );
  }

  return context;
};
