import React from "react";
import './Drones.css';
import Drone from   '../../assets/images/Drone.png';
import 'bootstrap/dist/css/bootstrap.css';
// import {DropdownButton , Dropdown} from 'react-bootstrap';
import { MdOutlineEdit } from 'react-icons/md';
import {BiSave } from 'react-icons/bi';
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { useDronesContext } from "../../hooks/useDronesContext";




const EditDrone = ({droId})=>{

const [droneName, setName] = useState("");
const [region, setRegion] = useState("");
const [image, setImage] = useState("");
const [dro, setDrone] = useState();
const { drones, dispatch } = useDronesContext();

useEffect(() => {
  const  fetchDrones = async () => {
    const response = await fetch(
      "/api/Drone/" + droId ,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const drone = await response.json();
      if (!response.ok) {
        console.log("wrong");
        console.log(droId);
      }
      if (response.ok) {
        dispatch({ type: "GET_DETAILS", payload: drone });
        setDrone(drone)
        setName(drone.droneName);
        setImage(drone.image);
        setRegion(drone.region)
        
      }
  };
  fetchDrones();
}, [ ]);

const updatename= event => {
  setName(event.target.value);
  }

const Save = async (e) => {
  const drn = {

    droneName:droneName,
    region:region,
    image: "kkkkk",
  
  };
  console.log("Is it update??? ", drn);
  const response = await fetch(
    "/api/Drone/" + droId,
    {
      method: "PATCH",
      body: JSON.stringify(drn),
     
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      dispatch({ type: "UPDATE_DETAILS", payload: json });
      console.log("Drone is not updated:");
      console.log(drn.droneName);
    }
    if (response.ok) {
      console.log("Drone is updated:", json);
    }
    console.log(droId);
  // setIndex(1);
};




    return <>
    <div class="App">
    <div class="title">
    <h1 class="h6 text-end pt-3">
    قائمة الدرونز {'>>'} تفاصيل الدرون {'>>'} تحرير تفاصيل الدرون
    </h1>
      </div>
      <div class="title">
      <h1 class="h4 text-end">
      تحرير تفاصيل الدرون
      </h1>
      </div>


      <div class="box">


      <div class="row  m-2">
      <div class="img">
      <img src = {Drone} alt="Drone"/>
      <div class="edit-img" >
      <MdOutlineEdit  className="editicon"/> 
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
          onChange={updatename}
         defaultValue={droneName}
          id="droneName" 
          className="form-control classInput" 
         
          required />
          </div>



          <div class="form-group">
                                    <label
                                      class="form-label  classLabel"
                                      for=""
                                    >
                                      المنطقة
                                    </label>
                                    <Dropdown
                                      region={region}
                                      setRegion={setRegion}
                                    
                                      onChange={(e) =>
                                        setRegion(e.target.value)
                                      }
                                    />
                                  </div>

<div className="row px-md-5">
  <div className="col">
<div className="text-center">
                      <button
                        type="button"
                        className="btn btn-primary my-2  px-3 classButton"
                        onClick={Save}
                        >
                        <BiSave/>
                      حفظ

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

export default EditDrone;