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

function DetectionList() {
  const [currentPageData, setCurrentPageData] = useState(new Array(5).fill());
  const items = [
    1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 1, 2, 3,
    4, 5, 6, 7, 12, 13, 14,
  ];
  const datePickerRef = useRef();
  return (
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
          </ListGroup>
        </div>

        <div id="pagination">
          <SweetPagination //try react-paginate later!
            currentPageData={setCurrentPageData}
            getData={items}
            navigation={true}
            dataPerPage={1}
            getStyle={"style-1"}
          />
        </div>

        <div id="page-number">1-20 صفحة</div>
      </div>
    </>
  );
}

export default DetectionList;
