import React from "react";
import './Drones.css';
import Drone from   '../../assets/images/Drone.png';
import 'bootstrap/dist/css/bootstrap.css';
import {DropdownButton , Dropdown} from 'react-bootstrap';
import { IoAddCircle } from 'react-icons/io5';
import {IoAddSharp } from 'react-icons/io5';
import Button from "react-bootstrap/Button";
import { useEffect , useState} from "react";

const AddDrone = ()=>{
  const [dronename , setName] = useState('')
  const [region , setRegion] = useState('')
  const [image , setImage] = useState('')

  const handle = async (e) => {
    e.preventDefault();

    const drone = {
      droneName: "Drone22",
      region: "hattin",
      image: "kkkkk",
    };

    const response = await fetch("/api/Drone", {
      method: "POST",
      body: JSON.stringify(drone),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log("new drone not added:");
    }
    if (response.ok) {
     console.log("new drone added:", json);
    //  dispatch({ type: "CREATE_DRONE", payload: json });
    }
  };

    return <>
    <div class="App">
    <div class="title">
    <h1 class="h6 text-end pt-3">
    قائمة الدرونز {'>>'} إضافة درون
    </h1>
      </div>
      <div class="title">
      <h1 class="h4 text-end">
      إضافة درون
      </h1>
      </div>


      <div class="box">


      <div class="row  p-2">
      <div class="img">
      <img src = {Drone} alt="Drone" class="rounded-circle" />
      <div class="add-img" >
      <IoAddCircle color="#B5864C"/> 
      </div>
      </div>
      </div>



    <div class="row  m-0" >
      <div className="container w-75 ">
        <form>
          
          <div class="form-group">
          <label class="form-label  classLabel" 
          for="droneName">
                  اسم الدرون
           </label>
           <input 
           type="text"
          name="name"
          id="droneName" 
          className="form-control classInput" 
          required />
          </div>



          <div class="form-group">
          <label class="form-label  classLabel" 
          for="">
               المنطقة 
           </label>
           <div className="dropdown">
           <DropdownButton id="dropdown-right-button" title="اختر المنطقة">

<Dropdown.Item href="#/action-1" class="dropItem">حطين</Dropdown.Item>
<Dropdown.Item href="#/action-2" class="dropItem">النخيل</Dropdown.Item>
<Dropdown.Item href="#/action-3" class="dropItem">عرقه</Dropdown.Item>

</DropdownButton>
</div>

          </div>

<div className="row px-md-5">
  <div className="col">
<div className="text-center">
                      <button onClick={handle}
                        type="button"
                        className="btn btn-primary my-2  px-3 classButton">
                        <IoAddSharp/>
                      إضافة

                        </button>
                    </div>
                    </div>
                    <div className="col">
<div className="text-center">
                      <button
                        type="button"
                        className="btn btn-primary my-2  px-4 classButton2">إلغاء</button>
                    </div>
                    </div>
                    </div>

        </form>
      
      </div>
    </div>
    
      </div>

    </div>
   </>
}

export default AddDrone;