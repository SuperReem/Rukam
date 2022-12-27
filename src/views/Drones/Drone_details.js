import React from "react";
import './Drones.css';
import Drone from   '../../assets/images/Drone.png';
import 'bootstrap/dist/css/bootstrap.css';
import {DropdownButton , Dropdown} from 'react-bootstrap';
import { MdOutlineEdit } from 'react-icons/md';
import {AiOutlineDelete } from 'react-icons/ai';

const DroneDetails = ()=>{
    return <>
    <div class="App">
    <div class="title">
    <h1 class="h6 text-end pt-3">
    قائمة الدرونز {'>>'} تفاصيل الدرون
    </h1>
      </div>
      <div class="title">
      <h1 class="h4 text-end">
      تفاصيل الدرون
      </h1>
      </div>


      <div class="boxfordetails">
      <div class="row  m-2">
      <div class="img">
      <img src = {Drone} alt="Drone"/>
      
      </div>
      </div>



    <div class="row  m-0" >
    <h4>Drone22</h4>
<h6>منطقه حطين</h6>
     </div>
<div className="container h-25">
    <div class="row">
<h6 class="h6 text-end px-4" >المواقع التي تمت زيارتها مسبقا</h6>
    </div>
    <div class="row">


    </div>
    </div>
    <div className="row px-md-5">
  <div className="col">
<div className="text-center">
                      <button
                        type="button"
                        className="btn btn-primary my-2  px-3 classButton">
                        <MdOutlineEdit/>
                      تحرير

                        </button>
                    </div>
                    </div>
                    <div className="col">
<div className="text-center">
                      <button
                        type="button"
                        className="btn btn-primary my-2  px-4 classButton2"> <AiOutlineDelete/>
                            حذف</button>
                    </div>
                    </div>
                    </div>

      </div>

    </div>
   </>
}

export default DroneDetails;