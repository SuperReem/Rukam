import React from "react";
import './detection_list.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function DetectionList() {


    return <>
        <div id="title">المواقع المخالفة</div>
        <div id="card">
           <Row>
            <Col>الموقع</Col>
            <Col>التاريخ</Col>
           </Row>
        <div id= "detection-list">
        <ListGroup variant="flush">
      <ListGroup.Item> <Row>
            <Col>الموقع</Col>
            <Col>التاريخ</Col>
            <Col><button>التفاصيل</button> </Col>
           </Row></ListGroup.Item>
      <ListGroup.Item> <Row>
            <Col>الموقع</Col>
            <Col>التاريخ</Col>
           </Row></ListGroup.Item>
      <ListGroup.Item> <Row>
            <Col>الموقع</Col>
            <Col>التاريخ</Col>
           </Row></ListGroup.Item>
      <ListGroup.Item> <Row>
            <Col>الموقع</Col>
            <Col>التاريخ</Col>
           </Row></ListGroup.Item>
    </ListGroup>

        </div>
        </div>
    </>

}

export default DetectionList;