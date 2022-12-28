import React, { useRef } from "react";
import "./detection_list.css";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BsArrowUpLeft } from "react-icons/bs";
import { BsFilter } from "react-icons/bs";
import { useState } from "react";
import SweetPagination from "sweetpagination";
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
import { render } from "react-dom";
import { renderHook } from "@testing-library/react";
import { renderIntoDocument } from "react-dom/test-utils";
import { Route } from "react-router-dom";
import { useEffect } from "react";
import { useDetectionsContext } from "../../hooks/useDetectionsContext";

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
  const { detections, dispatch } = useDetectionsContext();

  useEffect(() => {
    const fetchDetections = async () => {
      const response = await fetch("/api/Detection");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_DETECTIONS", payload: json });
      }
    };

    fetchDetections();
  }, [dispatch]);

  // const handleClick = async () => {
  //   const response = await fetch(
  //     "/api/Detection/" + "63ab2cf4b29727b629e7330a",
  //     {
  //       method: "DELETE",
  //     }
  //   );
  //   const json = await response.json();

  //   if (response.ok) {
  //     console.log("jknswcdj:", json);
  //   }
  // };
  // const handle = async (e) => {
  //   e.preventDefault();

  //   const detection = { timestamp: "nai", image: "cew" };

  //   const response = await fetch("/api/Detection", {
  //     method: "POST",
  //     body: JSON.stringify(detection),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const json = await response.json();

  //   if (!response.ok) {
  //     console.log("new Detection not added:");
  //   }
  //   if (response.ok) {
  //     console.log("new Detection added:", json);
  //   }
  // };
  const [index, setIndex] = useState(0);
  const [currentPageData, setCurrentPageData] = useState(new Array(5).fill());
  const items = [
    1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 1, 2, 3,
    4, 5, 6, 7, 12, 13, 14,
  ];
  const datePickerRef = useRef();

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
                        <Col>{detection._id}</Col>{" "}
                        <Col id="button">{detection.createdAt}</Col>
                        <Col id="button">
                          {" "}
                          <Button
                            variant="secondary"
                            size="sm"
                            id="button-details"
                          >
                            <BsArrowUpLeft size={17} /> التفاصيل
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}

                {/* <ListGroup.Item id="row">
                  <Row>
                    <Col>#1 حي حطين،شارع تثليث</Col>
                    <Col id="button">3 ابريل 2022</Col>
                    <Col id="button">
                      {" "}
                      <Button variant="secondary" size="sm" id="button-details">
                        <BsArrowUpLeft size={17} /> التفاصيل
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item id="row">
                  <Row>
                    <Col>#1 حي حطين،شارع تثليث</Col>
                    <Col id="button">3 ابريل 2022</Col>
                    <Col id="button">
                      {" "}
                      <Button variant="secondary" size="sm" id="button-details">
                        <BsArrowUpLeft size={17} /> التفاصيل
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item id="row">
                  <Row>
                    <Col>#1 حي حطين،شارع تثليث</Col>
                    <Col id="button">3 ابريل 2022</Col>
                    <Col id="button">
                      {" "}
                      <Button variant="secondary" size="sm" id="button-details">
                        <BsArrowUpLeft size={17} /> التفاصيل
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item id="row">
                  <Row>
                    <Col>#1 حي حطين،شارع تثليث</Col>
                    <Col id="button">3 ابريل 2022</Col>
                    <Col id="button">
                      {" "}
                      <Button variant="secondary" size="sm" id="button-details">
                        <BsArrowUpLeft size={17} /> التفاصيل
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item id="row">
                  <Row>
                    <Col>#1 حي حطين،شارع تثليث</Col>
                    <Col id="button">3 ابريل 2022</Col>
                    <Col id="button">
                      {" "}
                      <Button variant="secondary" size="sm" id="button-details">
                        <BsArrowUpLeft size={17} /> التفاصيل
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item id="row">
                  <Row>
                    <Col>#1 حي حطين،شارع تثليث</Col>
                    <Col id="button">3 ابريل 2022</Col>
                    <Col id="button">
                      {" "}
                      <button onClick={() => setIndex(1)}>Click</button>
                      <Button
                        variant="secondary"
                        size="sm"
                        id="button-details"
                        onClick={() => setIndex(1)}
                      >
                        <BsArrowUpLeft size={17} /> التفاصيل
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item id="row">
                  <Row>
                    <Col>#1 حي حطين،شارع تثليث</Col>
                    <Col id="button">3 ابريل 2022</Col>
                    <Col id="button">
                      {" "}
                      <Button variant="secondary" size="sm" id="button-details">
                        <BsArrowUpLeft size={17} /> التفاصيل
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item> */}
              </ListGroup>
            </div>

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
            <div id="page-number">1-20 صفحة</div>
          </div>
        </>
      ) : (
        <DetectionDetails detection={{}} />
      )}
    </>
  );
}

export default DetectionList;
