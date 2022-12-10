import React from "react";
import './detection_list.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';



function DetectionList() {


    return <>
        <div id="title">المواقع المخالفة</div>
        <div id="card">
        <div id= "detection-list">
        <ListGroup variant="flush">
      <ListGroup.Item>Cras justo odio</ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
    </ListGroup>

        </div>
        </div>
    </>

}

export default DetectionList;