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
import ButtonGroup from "react-bootstrap/ButtonGroup";
import UpdateStatus from "./UpdateStatus";

function ReportsList() {
  const formatter = buildFormatter(frenchStrings);
  const [index, setIndex] = useState(0);
  const [rep, setReport] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [dateStart, setDateStart] = useState("All");
  const [dateEnd, setDateEnd] = useState("All");
  const [refresh, setRefresh] = useState(false);
  const [IdToDelete, setIdToDelete] = useState(null);
  const { reports, dispatch } = useReportContext();

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    var fetchReports = async () => {
      const response = await fetch(
        `http://localhost:3000/api/Report/report?page=${pageNumber}&start=${dateStart}&end=${dateEnd}`
      )
        .then((response) => response.json())
        .then(({ totalPages, reports }) => {
          dispatch({ type: "SET_REPORTS", payload: reports });
          setNumberOfPages(totalPages);
        });
    };

    fetchReports();
  }, [dispatch, pageNumber, dateStart, dateEnd, refresh]);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  const DeleteReport = async (ID) => {
    const response = await fetch("/api/Report/" + ID, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      console.log("Deleted", json);
      setRefresh(!refresh);
    }
  };

  const AddReport = async (e) => {
    const date = new Date();

    const report = {
      reportId: "888",
      timestamp: "???? ???????????? -???? ??????????",
      status: "pending",
      region: "????????",
      image: "???? ????",
      notes: "??????",
      location: "??????????",
      filter: date.toISOString().slice(0, 10),
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

      dispatch({ type: "CREATE_REPORTS", payload: json });
    }
  };
  const datePickerRef = useRef();
  function onChangeHandler(value) {
    var date = new Date(
      value[0].month.number + "-" + value[0].day + "-" + value[0].year
    );
    date.setDate(date.getDate() + 1);
    setDateStart(date.toISOString().slice(0, 10));

    var date2 = new Date(
      value[1].month.number + "-" + value[1].day + "-" + value[1].year
    );
    date2.setDate(date2.getDate() + 1);
    setDateEnd(date2.toISOString().slice(0, 10));
  }
  useEffect(() => {
    console.log(dateStart);
  }, [dateStart]);
  useEffect(() => {
    console.log(pageNumber);
  }, [pageNumber]);

  return (
    <>
      {index == 0 ? (
        <>
          <div id="title"> ???????????????? </div>
          <div id="filter">
            <BsFilter
              size={43}
              onClick={() => datePickerRef.current.openCalendar()}
            />{" "}
            <DatePicker
              ref={datePickerRef}
              locale={arabic_ar}
              onChange={onChangeHandler}
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
                          ? "?????? ????????"
                          : report.status == "pending"
                          ? "?????? ????????????????"
                          : report.status == "under_processing"
                          ? "?????? ????????????????"
                          : "????????"}
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
                          //onClick={AddReport}
                          onClick={() => {
                            setReport(report);
                            setIndex(1);
                          }}
                        >
                          <BsArrowUpLeft size={17} /> ????????????????
                        </Button>

                        <Button
                          variant="secondary"
                          size="md"
                          id="delete-report-button"
                          data-bs-toggle="modal"
                          data-bs-target="#myModal"
                          onClick={() => setIdToDelete(report._id)}
                        >
                          <FiTrash /> ?????? ????????????
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
                              <h4 className=" m-3">?????? ????????????</h4>
                            </div>
                            <div className="col-2">
                              <button
                                data-bs-dismiss="modal"
                                className="closebtn btn rounded"
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
                                  ???? ?????? ?????????? ???? ?????? ?????? ??????????????
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
                            onClick={() => DeleteReport(IdToDelete)}
                          >
                            {" "}
                            ??????{" "}
                          </Button>
                          <Button
                            variant="secondary"
                            size="md"
                            id="details-button"
                          >
                            {" "}
                            ??????????{" "}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          <div id="pagination">
            {pageNumber + 1 == 1 ? (
              <button class="btn btn-primary btn-circle btn-smdis" disabled>
                <BsChevronLeft size={18} />
              </button>
            ) : (
              <button
                onClick={gotoPrevious}
                class="btn btn-primary btn-circle btn-sm"
              >
                <BsChevronLeft size={18} />
              </button>
            )}
            {pages.map((pageIndex) =>
              pageNumber == pageIndex ? (
                <button
                  key={pageIndex}
                  onClick={() => setPageNumber(pageIndex)}
                  class="btn btn-primary btn-circle btn-smpree"
                >
                  {pageIndex + 1}
                </button>
              ) : (
                <button
                  key={pageIndex}
                  onClick={() => setPageNumber(pageIndex)}
                  class="btn btn-primary btn-circle btn-sm"
                >
                  {pageIndex + 1}
                </button>
              )
            )}
            {pageNumber + 1 == numberOfPages ? (
              <button class="btn btn-primary btn-circle btn-smdis" disabled>
                <BsChevronRight size={18} />
              </button>
            ) : (
              <button
                onClick={gotoNext}
                class="btn btn-primary btn-circle btn-sm"
              >
                <BsChevronRight size={18} />
              </button>
            )}
          </div>

          <div id="page-number2">
            {" "}
            ???????? {numberOfPages}-{pageNumber + 1}
          </div>
        </>
      ) : (
        <ReportDetails repId={rep._id} />
      )}
    </>
  );
}

export default ReportsList;
