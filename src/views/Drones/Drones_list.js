import Button from "react-bootstrap/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowUpLeft } from "react-icons/bs";

import "./Drones_list.css";
import { useState } from "react";
import drone from "../../assets/images/DRONE_ICON.png";

function DroneList() {
  const [imgFile, setImgFile] = useState("");
  const [dronName, setDronName] = useState("");

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
              <div class="col-lg-3 col-sm-6 text-center  mb-3">
                <div class=" card mx-3 text-center mt-5 border-0 shadow p-0 ">
                  <div class=" card-body avatar mx-auto white avatar-container text-center mx-auto position-relative pb-0 pt-2">
                    <img
                      class="
      card-img-top bg-white  mx-auto  shadow-sm 
     img-circle rounded-circle   p-1  position-absolute top-0 start-50 translate-middle 
      "
                      src={drone}
                      alt=""
                    />
                   
                      <h4 class="card-title mt-5 mb-0">Drone564</h4>
                      <Button variant="secondary" size="sm" className="mt-0 mb-0">
                        <BsArrowUpLeft /> التفاصيل
                      </Button>
                   
                  </div>
                </div>
              </div>

            {/* </div> */}
          {/* </div> */}
          <div class="col-lg-3 col-sm-6 text-center  mb-3">
                <div class=" card mx-3 text-center mt-5 border-0 shadow p-0 ">
                  <div class=" card-body avatar mx-auto white avatar-container text-center mx-auto position-relative pb-0 pt-2">
                    <img
                      class="
      card-img-top bg-white  mx-auto  shadow-sm 
     img-circle rounded-circle   p-1  position-absolute top-0 start-50 translate-middle 
      "
                      src={drone}
                      alt=""
                    />
                   
                      <h4 class="card-title mt-5 mb-0">Drone564</h4>
                      <Button variant="secondary" size="sm" className="mt-0 mb-0">
                        <BsArrowUpLeft /> التفاصيل
                      </Button>
                   
                  </div>
                </div>
              </div> <div class="col-lg-3 col-sm-6 text-center  mb-3">
                <div class=" card mx-3 text-center mt-5 border-0 shadow p-0 ">
                  <div class=" card-body avatar mx-auto white avatar-container text-center mx-auto position-relative pb-0 pt-2">
                    <img
                      class="
      card-img-top bg-white  mx-auto  shadow-sm 
     img-circle rounded-circle   p-1  position-absolute top-0 start-50 translate-middle 
      "
                      src={drone}
                      alt=""
                    />
                   
                      <h4 class="card-title mt-5 mb-0">Drone564</h4>
                      <Button variant="secondary" size="sm" className="mt-0 mb-0" id="button-details2">
                        <BsArrowUpLeft /> التفاصيل
                      </Button>
                   
                  </div>
                </div>
              </div> <div class="col-lg-3 col-sm-6 text-center  mb-3">
                <div class=" card mx-3 text-center mt-5 border-0 shadow p-0 ">
                  <div class=" card-body avatar mx-auto white avatar-container text-center mx-auto position-relative pb-0 pt-2">
                    <img
                      class="
      card-img-top bg-white  mx-auto  shadow-sm 
     img-circle rounded-circle   p-1  position-absolute top-0 start-50 translate-middle 
      "
                      src={drone}
                      alt=""
                    />
                   
                      <h4 class="card-title mt-5 mb-0">Drone564</h4>
                      <Button variant="secondary" size="sm" className="mt-0 mb-0">
                        <BsArrowUpLeft /> التفاصيل
                      </Button>
                   
                  </div>
                </div>
              </div> <div class="col-lg-3 col-sm-6 text-center  mb-3">
                <div class=" card mx-3 text-center mt-5 border-0 shadow p-0 ">
                  <div class=" card-body avatar mx-auto white avatar-container text-center mx-auto position-relative pb-0 pt-2">
                    <img
                      class="
      card-img-top bg-white  mx-auto  shadow-sm 
     img-circle rounded-circle   p-1  position-absolute top-0 start-50 translate-middle 
      "
                      src={drone}
                      alt=""
                    />
                   
                      <h4 class="card-title mt-5 mb-0">Drone564</h4>
                      <Button variant="secondary" size="sm" className="mt-0 mb-0">
                        <BsArrowUpLeft /> التفاصيل
                      </Button>
                   
                  </div>
                </div>
              </div> <div class="col-lg-3 col-sm-6 text-center  mb-3">
                <div class=" card mx-3 text-center mt-5 border-0 shadow p-0 ">
                  <div class=" card-body avatar mx-auto white avatar-container text-center mx-auto position-relative pb-0 pt-2">
                    <img
                      class="
      card-img-top bg-white  mx-auto  shadow-sm 
     img-circle rounded-circle   p-1  position-absolute top-0 start-50 translate-middle 
      "
                      src={drone}
                      alt=""
                    />
                   
                      <h4 class="card-title mt-5 mb-0">Drone564</h4>
                      <Button variant="secondary" size="sm" className="mt-0 mb-0">
                        <BsArrowUpLeft /> التفاصيل
                      </Button>
                   
                  </div>
                </div>
              </div> <div class="col-lg-3 col-sm-6 text-center  mb-3">
                <div class=" card mx-3 text-center mt-5 border-0 shadow p-0 ">
                  <div class=" card-body avatar mx-auto white avatar-container text-center mx-auto position-relative pb-0 pt-2">
                    <img
                      class="
      card-img-top bg-white  mx-auto  shadow-sm 
     img-circle rounded-circle   p-1  position-absolute top-0 start-50 translate-middle 
      "
                      src={drone}
                      alt=""
                    />
                   
                      <h4 class="card-title mt-5 mb-0">Drone564</h4>
                      <Button variant="secondary" size="sm" className="mt-0 mb-0">
                        <BsArrowUpLeft /> التفاصيل
                      </Button>
                   
                  </div>
                </div>
              </div>
          
       
        </div>
      </div>
     
    </div>
  );
}

export default DroneList;
