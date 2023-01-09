import Button from "react-bootstrap/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowUpLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "../../views/Drones/Drones_list.css";
import { useEffect, useState } from "react";
import drone from "../../assets/images/DRONE_ICON.png";


const Drone_card = ({ drone }) => {

    return (
        <div class="col-lg-3 col-sm-6 text-center  mb-3">
        <div class=" card mx-3 text-center mt-5 border-0 shadow p-0 ">
        <div className="Drones">
        <div class=" card-body avatar mx-auto white avatar-container text-center mx-auto position-relative pb-0 pt-2">
                    <img
                      class="
      card-img-top bg-white  mx-auto  shadow-sm 
     img-circle rounded-circle   p-1  position-absolute top-0 start-50 translate-middle 
      "
                      src={drone.image}
                      alt=""
                    />
                   
                      <h4 class="card-title mt-5 mb-0">{drone.droneName}</h4>
                      <Button variant="secondary" size="sm" className="mt-0 mb-0" id="button-details2">
                        <BsArrowUpLeft /> التفاصيل
                      </Button>
                   
                  </div> 
                  </div> 
                  </div> 
                  </div> 

    )
  }
  
  export default Drone_card
