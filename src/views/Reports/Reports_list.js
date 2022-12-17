import React from "react";
import "./report_list.css";
import { BsFilter } from "react-icons/bs";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/green.css";
import arabic from "react-date-object/calendars/arabic"; //if i want the calender to be hijri
import arabic_ar from "react-date-object/locales/arabic_ar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BsArrowUpLeft } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { useState } from "react";
import SweetPagination from "sweetpagination";
function ReportsList() {
  const [currentPageData, setCurrentPageData] = useState(new Array(5).fill());
  const items = [
    1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 1, 2, 3,
    4, 5, 6, 7, 12, 13, 14,
  ];
  return (
    <>
      <div id="title"> البلاغات </div>
      <div id="filter">
        <BsFilter size={43} />{" "}
        <DatePicker
          locale={arabic_ar}
          range="true"
          className="green"
          inputClass="custom-input"
        />
      </div>
      <div id="status"></div>
      <div id="report-card">
        <Row id="row-info">
          <Col>حي حطين،شارع الورد</Col>
          <Col id="date"> منذ 1 شهر</Col>
          <Col id="details-button">
            {" "}
            <Button variant="secondary" size="md" id="button1">
              <BsArrowUpLeft size={17} /> التفاصيل
            </Button>{" "}
            <Button variant="secondary" size="md" id="button2">
              <BsTrash size={17} /> حذف البلاغ
            </Button>
          </Col>
        </Row>
      </div>
      <div id="status"></div>
      <div id="report-card">
        <Row id="row-info">
          <Col>حي حطين،شارع الورد</Col>
          <Col id="date"> منذ 1 شهر</Col>
          <Col id="details-button">
            {" "}
            <Button variant="secondary" size="md" id="button1">
              <BsArrowUpLeft size={17} /> التفاصيل
            </Button>{" "}
            <Button variant="secondary" size="md" id="button2">
              <BsTrash size={17} /> حذف البلاغ
            </Button>
          </Col>
        </Row>
      </div>
      <div id="status"></div>
      <div id="report-card">
        <Row id="row-info">
          <Col>حي حطين،شارع الورد</Col>
          <Col id="date"> منذ 1 شهر</Col>
          <Col id="details-button">
            {" "}
            <Button variant="secondary" size="md" id="button1">
              <BsArrowUpLeft size={17} /> التفاصيل
            </Button>{" "}
            <Button variant="secondary" size="md" id="button2">
              <BsTrash size={17} /> حذف البلاغ
            </Button>
          </Col>
        </Row>
      </div>
      <div id="status"></div>
      <div id="report-card">
        <Row id="row-info">
          <Col>حي حطين،شارع الورد</Col>
          <Col id="date"> منذ 1 شهر</Col>
          <Col id="details-button">
            {" "}
            <Button variant="secondary" size="md" id="button1">
              <BsArrowUpLeft size={17} /> التفاصيل
            </Button>{" "}
            <Button variant="secondary" size="md" id="button2">
              <BsTrash size={17} /> حذف البلاغ
            </Button>
          </Col>
        </Row>
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

      <div id="page-number2">1-20 صفحة</div>

      <div id="copy-right">جميع الحقوق محفوظة لــركام @2022</div>
    </>
  );
}

export default ReportsList;
