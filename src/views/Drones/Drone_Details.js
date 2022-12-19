import React from "react";
import './Drone_Details.css';
import Drone from   '../../assets/images/Drone.png';
import map from '../../assets/images/statictics.png'
import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const DroneDetails = ()=>{
    return <>
    <div id = "title"> 
    <h6>
    قائمة الدرونز {'>>'} تفاصيل الدرون
    </h6>
        <h4>
        تفاصيل الدرون
        </h4>
    </div>


    <Row id= "DroneDetailsBox">
      <Row id = "Detailsimgs">
        <img src = {Drone} alt="Drone"/>
      </Row> 
<Row class = "drone">
    <h4>Drone22</h4> 
    
</Row>  
<Row  class = "region" >
    <h6>منطقة حطين</h6> 
</Row>  
<Row  class = "visitedregions">
    <h6>المواقع التي تمت زيارتها مسبقا</h6> 
</Row> 
<Row class= "map">
        <img src = {map} alt="map" class= "map" />
      </Row> 
    </Row>
   </>
}

export default DroneDetails;