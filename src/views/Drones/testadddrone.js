import React from "react";
import './Drones.css';
import Drone from   '../../assets/images/Drone.png';
import addicon from '../../assets/images/Addimage.png';
import 'bootstrap/dist/css/bootstrap.css';
import {DropdownButton , Dropdown} from 'react-bootstrap';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
const test = ()=>{
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
      <div>
      <div id = "imgs">
        <img src = {Drone} alt="Drone"/>
        <div id="add-img">
        <img src = {addicon} alt="addicon"/>
        </div>
        <form id = 'formid'>
      <div>
  <label class="dronename" className="form-label text-right" >
    اسم الدرون
    </label>
    <input type="text" name="name" id="inputform"  className="form-control" required />
    <label class="dronename" className="form-label text-right" >
    المنطقة
    </label>
    <DropdownButton id="dropdown-right-button" title="اختر المنطقة">


      <Dropdown.Item href="#/action-1" class="dropItem">حطين</Dropdown.Item>
      <Dropdown.Item href="#/action-2" class="dropItem">النخيل</Dropdown.Item>
      <Dropdown.Item href="#/action-3" class="dropItem">عرقه</Dropdown.Item>
    </DropdownButton>
 
  </div>
  
</form>


      </div> 
      </div>

   

    </div>
   </>
}

export default test;