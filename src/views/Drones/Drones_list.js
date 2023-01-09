import Button from "react-bootstrap/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowUpLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./Drones_list.css";
import { useEffect, useState } from "react";
import drone from "../../assets/images/DRONE_ICON.png";

import Drone_card from "../../components/Drones/Drone_card"


function DroneList() {
  
  const [imgFile, setImgFile] = useState("");
  const [dronName, setDronName] = useState("");
  const [Drones, setDrones] = useState(null)


  useEffect(() => {
    const fetchDrones = async () => {
      const response = await fetch('/api/Drone/drones')
      const json = await response.json()

      if (response.ok) {
        setDrones(json)
        console.log("okay")

      }
    }

    fetchDrones()
  }, [])


  return (
    <div>
       
      <div className=" d-flex align-items-center justify-content-between">
        <div className="" id="title" >قائمة الدرون</div>
        
        <Button variant="secondary" size="sm" className="darkbtn">
          <AiOutlinePlus /> إضافة درون
        </Button>
      </div>

    

      <div class="container-fluid bg-3 text-center">
        {/* <div class="row"> */}

          {/* <div class=""> */}
          
            <div class="row text-center  mt-4  ">

            {/* mt-sm-5 mt-lg-1 */}
             
        {Drones && Drones.map(Drone => (
          <Drone_card drone={Drone} key={Drone._id} />
        ))}
      </div>
               
                  {/* <div class=" card-body avatar mx-auto white avatar-container text-center mx-auto position-relative pb-0 pt-2">
                    <img
                      class="
      card-img-top bg-white  mx-auto  shadow-sm 
     img-circle rounded-circle   p-1  position-absolute top-0 start-50 translate-middle 
      "
                      src={drone}
                      alt=""
                    />
                   
                      <h4 class="card-title mt-5 mb-0">Drone514</h4>
                      <Button variant="secondary" size="sm" className="mt-0 mb-0">
                        <BsArrowUpLeft /> التفاصيل
                      </Button>
                   
                  </div> */}
              
      </div>
     
    </div>
  );
}

export default DroneList;
