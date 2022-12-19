import React, { useRef } from "react";
import "./report_list.css";
import { BsFilter } from "react-icons/bs";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/green.css";
import arabic_ar from "react-date-object/locales/arabic_ar";
import ReportCard from "../../components/Reports/Report_card";
import { useState } from "react";
import SweetPagination from "sweetpagination";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  status: {
    danger: "#68836B",
  },
  palette: {
    primary: {
      main: "#034C3C",
      darker: "#034C3C",
    },
    neutral: {
      main: "#68836B",
      contrastText: "#034C3C",
    },
  },
});
function ReportsList() {
  const [currentPageData, setCurrentPageData] = useState(new Array(5).fill());
  const items = [
    1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 1, 2, 3,
    4, 5, 6, 7, 12, 13, 14,
  ];
  const datePickerRef = useRef();
  return (
    <>
      <div id="title"> البلاغات </div>
      <div id="filter">
        <BsFilter
          size={43}
          onClick={() => datePickerRef.current.openCalendar()}
        />{" "}
        <DatePicker
          ref={datePickerRef}
          locale={arabic_ar}
          range="true"
          className="green"
          inputClass="custom-input"
          maxDate={new Date()}
        />
      </div>
      <ReportCard status={"unsent"} />
      <ReportCard status={"pending"} />
      <ReportCard status={"closed"} />
      <div id="pagination">
        <ThemeProvider theme={theme}>
          <Pagination
            count={10}
            variant="outlined"
            size="large"
            color="primary"
          />
        </ThemeProvider>
      </div>

      <div id="page-number2">1-20 صفحة</div>
    </>
  );
}

export default ReportsList;
