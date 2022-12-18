import React, { useRef } from "react";
import "./report_list.css";
import { BsFilter } from "react-icons/bs";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/green.css";
import arabic_ar from "react-date-object/locales/arabic_ar";
import ReportCard from "../../components/Reports/Report_card";
import { useState } from "react";
import SweetPagination from "sweetpagination";
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
        <SweetPagination //try react-paginate later!
          currentPageData={setCurrentPageData}
          getData={items}
          navigation={true}
          dataPerPage={1}
          getStyle={"style-1"}
        />
      </div>
      <div id="page-number2">1-20 صفحة</div>
    </>
  );
}

export default ReportsList;
