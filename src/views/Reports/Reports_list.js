import React, { useRef } from "react";
import "./report_list.css";
import { BsFilter } from "react-icons/bs";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/green.css";
import arabic_ar from "react-date-object/locales/arabic_ar";
import ReportCard from "../../components/Reports/Report_card";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useReportContext } from "../../hooks/useReportContext";
import { useEffect } from "react";
import "../../components/Reports/report_card.css";
import Button from "react-bootstrap/Button";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { BsArrowUpLeft } from "react-icons/bs";
import { FiTrash } from "react-icons/fi";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/ar";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import ReportDetails from "../../views/Reports/ReportDetails";
import ToggleButton from "react-bootstrap/ToggleButton";

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
  const formatter = buildFormatter(frenchStrings);
  const [index, setIndex] = useState(0);
  const [rep, setReport] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const { reports, dispatch } = useReportContext();

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    const fetchReports = async () => {
      const response = await fetch(
        `http://localhost:3000/api/Report/report?page=${pageNumber}`
      )
        .then((response) => response.json())
        .then(({ totalPages, reports }) => {
          dispatch({ type: "SET_REPORTS", payload: reports });
          setNumberOfPages(totalPages);
        });
    };
    fetchReports();
  }, [dispatch, pageNumber]);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  // const { reports, dispatch } = useReportContext();
  // useEffect(() => {
  //   const fetchReports = async () => {
  //     const response = await fetch("/api/Report");
  //     const json = await response.json();
  //     if (response.ok) {
  //       dispatch({ type: "SET_REPORTS", payload: json });
  //     }
  //   };
  //   fetchReports();
  // }, [dispatch]);
  const DeleteReport = async (ID) => {
    const response = await fetch("/api/Report/" + ID, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      console.log("Deleted", json);
      dispatch({ type: "DELETE_REPORTS", payload: json });
    }
  };
  const handle = async (e) => {
    e.preventDefault();
    const report = {
      reportId: "888",
      timestamp: "٢٠ اكتوبر -١٢ مساءا",
      status: "under_processing",
      region: "حطين",
      image: "تر نط",
      notes: "منو",
      location: "ذتنري",
    };
    const response = await fetch("/api/Report", {
      method: "POST",
      body: JSON.stringify(report),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      console.log("new report not added:");
    }
    if (response.ok) {
      console.log("new report added:", json);
    }
  };
  const datePickerRef = useRef();

  return (
    <>
      {index == 0 ? (
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
          {reports &&
            reports.map((report) => (
              <>
                <div className="report-card-container">
                  <div className="report-card">
                    <div className={"report-status-container " + report.status}>
                      <h6>
                        {report.status == "unsent"
                          ? "غير مرسل"
                          : report.status == "pending"
                          ? "قيد الإنتظار"
                          : report.status == "under_processing"
                          ? "قيد المراجعة"
                          : "مغلق"}
                      </h6>
                    </div>
                    <div
                      className="report-card-content d-flex flex-column flex-md-row justify-content-between align-items-end pt-3"
                      id="report-info"
                    >
                      <div className="d-flex">
                        <h5 className="ms-5"> {report.region}</h5>
                        <p className="report-time">
                          {" "}
                          <TimeAgo
                            date={report.createdAt}
                            formatter={formatter}
                          />
                          ;
                        </p>
                      </div>
                      <div>
                        <Button
                          id="details-button"
                          onClick={() => {
                            setReport(report);
                            setIndex(1);
                          }}
                        >
                          <BsArrowUpLeft size={17} /> التفاصيل
                        </Button>
                        {/* <button
                          onClick={() => {
                            setReport(report);
                            setIndex(1);
                          }}
                        >
                          Click
                        </button> */}
                        <Button
                          variant="secondary"
                          size="md"
                          id="delete-report-button"
                          data-bs-toggle="modal"
                          data-bs-target="#myModal"
                        >
                          <FiTrash /> حذف البلاغ
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="modal" id="myModal">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="">
                          <div className="row align-items-center  justify-content-end mb-4 pt-2">
                            <div className="col-6 p-0 ">
                              <h4 className=" m-3">حذف البلاغ</h4>
                            </div>
                            <div className="col-2">
                              <button
                                data-bs-dismiss="modal"
                                className="closebtn btn rounded"
                                // onClick={handle}
                                onClick={() => {
                                  setReport(report);
                                }}
                              >
                                &#x2715;
                              </button>
                            </div>
                          </div>
                          <div className="modal-body justify-content-center">
                            <div className="row align-items-center  justify-content-center">
                              <div className="col-8 progressbar  pb-4"></div>
                              <div className="row align-items-center justify-content-between pb-4 me-5 pt-2">
                                <div className="justify-content-center me-3 h4">
                                  هل انت متأكد من حذف هذا البلاغ؟
                                </div>
                              </div>
                              <div className="row justify-content-start align-items-start">
                                <div className="col-8 h5"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div></div>
                        <div className="modal-footer border border-0 justify-content-center">
                          <Button
                            variant="secondary"
                            size="md"
                            id="delete-report-button"
                            onClick={() => {
                              DeleteReport(rep._id);
                            }}
                          >
                            {" "}
                            حذف{" "}
                          </Button>
                          <Button
                            variant="secondary"
                            size="md"
                            id="details-button"
                          >
                            {" "}
                            إلغاء{" "}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          <div id="pagination">
            <button
              onClick={gotoPrevious}
              class="btn btn-primary btn-circle btn-sm"
            >
              <BsChevronLeft size={18} />
            </button>
            {pages.map((pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => setPageNumber(pageIndex)}
                class="btn btn-primary btn-circle btn-sm"
              >
                {pageIndex + 1}
              </button>
            ))}
            <button
              onClick={gotoNext}
              class="btn btn-primary btn-circle btn-sm"
            >
              <BsChevronRight size={18} />
            </button>
          </div>

          <div id="page-number2">
            {" "}
            صفحة {numberOfPages}-{pageNumber + 1}
          </div>
        </>
      ) : (
        <ReportDetails report={rep} />
      )}
    </>
  );
}

export default ReportsList;
