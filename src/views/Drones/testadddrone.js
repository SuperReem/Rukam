import React from "react";
import './Drones.css';
import Drone from   '../../assets/images/Drone.png';
import addicon from '../../assets/images/Addimage.png';
import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row';

const AddDrone = ()=>{
    return <>
    <div id = "title"> 
    <h6>
    قائمة الدرونز {'>>'} إضافة درون
    </h6>
        <h4>
        إضافة درون
        </h4>
    </div>
    <div id= "box">
      <div id = "imgs">
        <img src = {Drone} alt="Drone"/>
        <div id="add-img">
        <img src = {addicon} alt="addicon"/>
        </div>
      </div> 

      <form id = 'formid'>
  <label id="dronename">
    اسم الدرون
    <input type="text" name="name" />
  </label>
  <label id="dronename">
     الدرون
    <input type="text" name="name" />
  </label>
</form>
      

    </div>
   </>
}

export default AddDrone;