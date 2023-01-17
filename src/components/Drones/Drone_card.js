import Button from "react-bootstrap/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowUpLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "../../views/Drones/Drones_list.css";
import { useEffect, useState } from "react";
import droneImg from "../../assets/images/Drone.png";
// import { MdOutlineEdit } from "react-icons/md";
// import { AiOutlineDelete } from "react-icons/ai";
// import { BsTrash } from "react-icons/bs";
// // import swal from 'sweetalert';
// import { IoAddCircle } from "react-icons/io5";
// import { IoAddSharp } from "react-icons/io5";
// import { BiSave } from "react-icons/bi";

// import Dropdown from "../../views/Drones/Dropdown";
// // import "views/Drones/Dropdown_Style.css";
// // import 'views/Drones/Drones.css';

// import {
//   GoogleMap,
//   Marker,
//   useJsApiLoader,
//   MarkerF,
// } from "@react-google-maps/api";
// import React from "react";
// import DroneList from "../../views/Drones/Drones_list";

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

  // console.log("thisi is one drone", drone);
  // const [dr, setDrone] = useState();

  // const containerStyle = {
  //   width: "450px",
  //   height: "210px",
  //   borderRadius: "10px",
  // };
  // const center = {
  //   lat: 24.72,
  //   lng: 46.62,
  // };

  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: "AIzaSyDvPoFbe6MDqYRGifizC34rXPlgGzCd9sE",
  // });

  // const [map, setMap] = React.useState(null);

  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds(center);
  //   map.fitBounds(bounds);
  //   setMap(map);
  // }, []);

  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null);
  // }, []);

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
            <Button variant="secondary" size="sm" className="mt-0 mb-0" id="button-details2">
            {/* <div className="col ">
                    <div className="row "> */}
            {/* <Button
              variant="secondary"
              size="sm"
              className="mt-0 mb-0"
              id="button-details2"
              data-bs-toggle="modal"
              data-bs-target={"#myModal2" + drone._id}
            > */}
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
      </div>

      
  );
};

export default Drone_card;
