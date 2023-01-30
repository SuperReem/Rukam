import Button from "react-bootstrap/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowUpLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "../../views/Drones/Drones_list.css";
import { useEffect, useState } from "react";
import droneImg from "../../assets/images/Drone.png";
import { MdOutlineEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import React from "react";

// import Dropdown from "../../views/Drones/Dropdown";
// // import "views/Drones/Dropdown_Style.css";
// // import 'views/Drones/Drones.css';

 import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  MarkerF,
} from "@react-google-maps/api";


const Drone_card = ({ drone }) => {
  // const [droneName, setName] = useState("");
  // const [region, setRegion] = useState("اختر المنطقه");
  // const [image, setImage] = useState("");

  // const handle = async (e) => {
  //   e.preventDefault();

  //   const drone = {
  //     droneName,
  //     region,
  //     image: "kkkkk",
  //   };

  //   const response = await fetch("/api/Drone", {
  //     method: "POST",
  //     body: JSON.stringify(drone),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const json = await response.json();

  //   if (!response.ok) {
  //     console.log("new drone not added:");
  //   }
  //   if (response.ok) {
  //     setName("");
  //     setRegion("");
  //     console.log("new drone added:", json);
  //     //  dispatch({ type: "CREATE_DRONE", payload: json });
  //   }
  // };

//  console.log("thisi is one drone", drone);
//  const [dr, setDrone] = useState();

  const containerStyle = {
    width: "380px",
    height: "210px",
    borderRadius: "10px",
  };
  const center = {
    lat: 24.72,
    lng: 46.62,
  };

const { isLoaded } = useJsApiLoader({
  id: "google-map-script",
  googleMapsApiKey: "AIzaSyBUMSPnho9iIVnF-MKvOMgYw_bRBwc7U7Q",
});


  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div class="col-lg-3 col-sm-6 text-center mb-4 mt-2">
      <div class=" card mx-2 text-center mt-5 border-1 border-opacity-10 border-secondary border-opacity-25hh rounded-4  p-0 ">
        <div className="Drones">
          <div class=" card-body avatar mx-auto white avatar-container text-center mx-auto position-relative pb-0 pt-2 ">
            <img
              class="
      card-img-top bg-white  mx-auto  biggerImg 
     img-circle rounded-circle   p-2  position-absolute top-0 start-50 translate-middle m-2 
      "
              src={droneImg} //{drone.image}
              alt=""
            />

            <h4 class="card-title mb-0 nameDown">{drone.droneName}</h4>

            <Button variant="secondary" size="sm" className="mt-0 mb-0" id="button-details2"
             data-bs-toggle="modal"
             data-bs-target={"#myModal2" + drone._id}
            >
               <BsArrowUpLeft /> التفاصيل
                   </Button>
            {/* <div className="col ">
                    <div className="row "> */}
            {/* <Button
              variant="secondary"
              size="sm"
              className="mt-0 mb-0"
              id="button-details2"
              data-bs-toggle="modal"
              data-bs-target={"#myModal2" + drone._id}
            > 
              <BsArrowUpLeft /> التفاصيل
            </Button>
            {/* </div> */}

            {/* <div className="row p-1">
                      <Button variant="secondary" size="sm" 
                      className="mt-0 mb-0" 
                      id="button-details2" 
                      data-bs-toggle="modal"
                      data-bs-target={"#myModal3" +drone._id }>
                        <BsArrowUpLeft /> تحرير
                      </Button>
                      </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>

      <div>
        <div key={drone._id} className="modal" id={"myModal2"+ drone._id}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="">
                
                <div className="row align-items-center  justify-content-end  pt-2 ">
                  

                  <div className="col-2">
                    <button
                      data-bs-dismiss="modal"
                      className="closebtn btn rounded"
                    >
                      &#x2715;
                    </button>
                  </div>
                </div>
                
                <div className="modal-body justify-content-center p-0">
                  <div className="row align-items-center  justify-content-center">
                  <div className="col-6 p-0 ">
                  <img src = {droneImg} class="
       bg-white  mx-auto  biggerImg 
      img-circle rounded-circle
      
       
    
      "  alt="Drone"/>
                  </div>
                 <div className="row p-2">
                    <div className=" h3 heading">
                    {drone.droneName}
                    </div>
                    <div className=" h5 heading"> 
                    منطقة  {drone.region}   
                      </div>
                      </div>

                     


                      <div class="row">
<h6 class="h6 text-end px-5 heading" >المواقع التي تمت زيارتها مسبقا</h6>
    </div>
    
        
        {isLoaded ? (
            <GoogleMap
            mapContainerStyle={containerStyle}
              center={center}
              zoom={7}
              onLoad={onLoad}
              onUnmount={onUnmount}
            ></GoogleMap>
          ) : (
            <div>Loading...</div>
          )}
       



                    <div className="row justify-content-start align-items-start">
                      <div className="col-8 h5">
             
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div></div>

              <div className="modal-footer border border-0 justify-content-evenly">
      
  
              <Button
                  variant="secondary"
                  size="md"
                  className="btn btn-primary my-2  px-3 classButton"
                  data-bs-dismiss="modal"
                  
                  >
                    
                   <MdOutlineEdit/>تحرير            
              </Button>
          

       
              <Button
                  variant="secondary"
                  size="md"
           
                   data-bs-dismiss="modal"
                  className="btn btn-primary my-2  px-4 deleteD"
                // data-target="#myModal3" 
                 
                  >
                  <BsTrash color='white' />حذف
              </Button>
  

              </div>
            </div>
          </div>
        </div>
      </div>











      </div>

      
  );
};

export default Drone_card;
