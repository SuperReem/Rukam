import React, { useRef } from "react";
import "./detection_list.css";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BsArrowUpLeft } from "react-icons/bs";
import { BsFilter } from "react-icons/bs";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import "react-multi-date-picker/styles/colors/green.css";
import arabic from "react-date-object/calendars/arabic"; //if i want the calender to be hijri
import arabic_ar from "react-date-object/locales/arabic_ar";
import InputIcon from "react-multi-date-picker/components/input_icon";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RiDoubanFill } from "react-icons/ri";
import DetectionDetails from "./DetectionDetails";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { render } from "react-dom";
import { renderHook } from "@testing-library/react";
import { renderIntoDocument } from "react-dom/test-utils";
import { Route } from "react-router-dom";
import { useEffect } from "react";
import { useDetectionsContext } from "../../hooks/useDetectionsContext";
import { useIntl } from "react-intl";

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

function showDetails(detectionObj) {
  return <DetectionDetails detection={detectionObj} />;
}

function DetectionList() {
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [dateStart, setDateStart] = useState("All");
  const [dateEnd, setDateEnd] = useState("All");
  const { detections, dispatch } = useDetectionsContext();
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    const fetchDetections = async () => {
      const response = await fetch(
        `http://localhost:3000/api/Detection/detection?page=${pageNumber}&start=${dateStart}&end=${dateEnd}`
      )
        .then((response) => response.json())
        .then(({ totalPages, detections }) => {
          dispatch({ type: "SET_DETECTIONS", payload: detections });
          setNumberOfPages(totalPages);
        });
    };

    fetchDetections();
  }, [dispatch, pageNumber, dateStart, dateEnd]);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  const handleClick = async () => {
    const response = await fetch(
      "/api/Detection/" + "63ab2cf4b29727b629e7330a",
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) {
      console.log("jknswcdj:", json);
    }
  };
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat("ar-GB", {
    dateStyle: "full",
    timeZone: "Australia/Sydney",
  }).format(date);

  const handle = async (e) => {
    e.preventDefault();
    const date = new Date();
    const detection = {
      droneId: "7777",
      location: { latitude: 88.9, longitude: 66 },
      region: "11حي حطين",
      time: formattedDate,
      image: "kkkkk",
      filter: date.toISOString().slice(0, 10),
    };

    const response = await fetch("/api/Detection", {
      method: "POST",
      body: JSON.stringify(detection),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log("new Detection not added:");
      DetectionDetails({ json });
    }
    if (response.ok) {
      console.log("new Detection added:", json);
      dispatch({ type: "CREATE_DETECTIONS", payload: json });
    }
  };
  const [index, setIndex] = useState(0);
  const [detec, setDetec] = useState();

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
    console.log(dateEnd);
  }, [dateEnd]);
  return (
    <>
      {index == 0 ? (
        <>
          <div id="title">المواقع المخالفة</div>
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
          <div id="detection-card">
            <div id="headings">
              {" "}
              <Row>
                <Col>الموقع</Col>
                <Col>التاريخ</Col>
              </Row>
            </div>
            <div id="detection-list">
              <ListGroup variant="flush">
                {detections &&
                  detections.map((detection) => (
                    <ListGroup.Item id="row">
                      <Row>
                        {" "}
                        <Col>{detection.region}</Col>{" "}
                        <Col id="button">{detection.time}</Col>
                        <Col id="button">
                          {" "}
                          {/* <button
                            onClick={() => {
                              setDetec(detection);
                              setIndex(1);
                            }}
                          >
                            Click
                          </button> */}
                          <Button
                            id="button-details"
                            // onClick={handle}
                            onClick={() => {
                              setDetec(detection);
                              setIndex(1);
                            }}
                          >
                            <BsArrowUpLeft size={17} /> التفاصيل
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </div>
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

            <div id="page-number">
              {" "}
              صفحة {numberOfPages}-{pageNumber + 1}
            </div>
          </div>
        </>
      ) : (
        <DetectionDetails detection={detec} key={detec._id} />
      )}
    </>
  );
}

export default DetectionList;
