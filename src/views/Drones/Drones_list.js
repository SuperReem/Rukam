import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
//import drone from "../../assets/images/DRONE_ICON.png";
import Drone_card from "../../components/Drones/Drone_card";
import { useDronesContext } from "../../hooks/useDronesContext";
import ArabicNumbers from "react-native-arabic-numbers/src/ArabicNumbers";
import Dropdown from "./Dropdown";
import "./Dropdown_Style.css";
import "./Drones_list.css";
import droneImg from "../../assets/images/Drone.png";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowUpLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";
import { IoAddSharp } from "react-icons/io5";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import "../../views/Drones/Drones_list.css";
import { MdOutlineEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { BsCheck } from "react-icons/bs";
// import ReportDetails from "../../views/Reports/ReportDetails";
import EditDrone from "../../views/Drones/Edit_Drone";
import React from "react";
import { BsCircleFill } from "react-icons/bs";

// import Dropdown from "../../views/Drones/Dropdown";
// // import "views/Drones/Dropdown_Style.css";
// // import 'views/Drones/Drones.css';

import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  MarkerF,
} from "@react-google-maps/api";

function DroneList() {
  const [imgFile, setImgFile] = useState("");
  const [dronName, setDronName] = useState("");
  // const [Drones, setDrones] = useState(null);

  // useEffect(() => {
  //   const fetchDrones = async () => {
  //     const response = await fetch("/api/Drone/drones");
  //     const json = await response.json();

  //     if (response.ok) {
  //       setDrones(json);
  //       console.log("okay");
  //     }
  //   };

  //   fetchDrones();
  // }, []);
  const [droneName, setName] = useState("");
  const [region, setRegion] = useState("اختر المنطقه");
  const [image, setImage] = useState("");

  const { drones, dispatch } = useDronesContext();
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  const handle = async (e) => {
    e.preventDefault();

    const drone = {
      droneName,
      region,
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
      setName("");
      setRegion("");
      console.log("new drone added:", json);
      //  dispatch({ type: "CREATE_DRONE", payload: json });
    }
  };
  const DeleteDrone = async (Id) => {
    const response = await fetch("/api/Drone/" + Id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      console.log("Deleted", json);
      // setRefresh(!refresh);
    }
  };

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
  useEffect(() => {
    var fetchDrones = async () => {
      const response = await fetch(
        `http://localhost:3000/api/Drone/drones?page=${pageNumber}`
      )
        .then((response) => response.json())
        .then(({ totalPages, drones }) => {
          dispatch({ type: "SET_DRONES", payload: drones });
          setNumberOfPages(totalPages);
        });
    };

    fetchDrones();
  }, [dispatch, pageNumber]);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };
  const [index, setIndex] = useState(0);
  const [droneId, setDrone] = useState();
  return (
    <>
      {index == 0 ? (
        <>
          <div>
            <div className=" d-flex align-items-center justify-content-between">
              <div className="" id="title">
                قائمة الدرون
              </div>

              <Button
                variant="secondary"
                size="sm"
                className="darkbtn"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
              >
                <AiOutlinePlus /> إضافة درون
              </Button>
            </div>

            <div class="container-fluid bg-3 text-center divSizing">
              {/* <div class="row"> */}

              {/* <div class=""> */}

              <div class="row text-center  mt-4  ">
                {/* mt-sm-5 mt-lg-1 */}

                {drones &&
                  drones.map((Drone) => (
                    <>
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

                              <h4 class="card-title mb-0 nameDown">
                                {Drone.droneName}
                              </h4>

                              <Button
                                variant="secondary"
                                size="sm"
                                className="mt-0 mb-0"
                                id="button-details2"
                                data-bs-toggle="modal"
                                data-bs-target={"#myModal2" + Drone._id}
                              >
                                <BsArrowUpLeft /> التفاصيل
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div
                            key={Drone._id}
                            className="modal"
                            id={"myModal2" + Drone._id}
                          >
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
                                        <img
                                          src={droneImg}
                                          class="
                 bg-white  mx-auto  biggerImg 
                img-circle rounded-circle
                
                 
              
                "
                                          alt="Drone"
                                        />
                                      </div>
                                      <div className="row p-2 align-items-center justify-content-center">
                                        <div className=" h3 heading">
                                          {Drone.droneName}
                                        </div>
                                        <div className=" h5 heading">
                                          منطقة {Drone.region}
                                        </div>
                                      </div>

                                      <div class="row">
                                        <h6 class="h6 text-end px-5 heading">
                                          المواقع التي تمت زيارتها مسبقا
                                        </h6>
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
                                        <div className="col-8 h5"></div>
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
                                    onClick={() => {
                                      setDrone(Drone);
                                      setIndex(1);
                                    }}
                                  >
                                    <MdOutlineEdit />
                                    تحرير
                                  </Button>

                                  <Button
                                    variant="secondary"
                                    size="md"
                                    // data-bs-dismiss="modal"
                                    id="delete-report-button"
                                    data-bs-toggle="modal"
                                    data-bs-target={"#myModaldel" + Drone._id}
                                    className="btn btn-primary my-2  px-4 deleteD"
                                    // onClick={() => DeleteDrone(Drone._id)}
                                  >
                                    <BsTrash color="white" />
                                    حذف
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div
                              key={Drone.id}
                              className="modal"
                              id={"myModaldel" + Drone._id}
                            >
                              <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                  <div className="">
                                    <div className="row align-items-center  justify-content-end mb-4 pt-2">
                                      <div className="col-6 p-0 ">
                                        <h4 className=" m-3 ">حذف الدرون</h4>
                                      </div>
                                      <div className="col-2">
                                        <button
                                          data-bs-dismiss="modal"
                                          className="closebtn btn rounded"
                                        >
                                          &#x2715;
                                        </button>
                                      </div>
                                    </div>
                                    <div className="modal-body justify-content-center">
                                      <div className="row align-items-center  justify-content-center">
                                        <div className="row align-items-center justify-content-between   pt-2">
                                          <div className="justify-content-center  h4">
                                            هل أنت متأكد من حذف هذا الدرون؟
                                          </div>
                                        </div>
                                        <div className="row justify-content-start align-items-start">
                                          <div className="col-8 h5"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div></div>
                                  <div className="modal-footer border border-0 justify-content-center">
                                    <Button
                                      variant="secondary"
                                      size="md"
                                      onClick={() => DeleteDrone(Drone._id)}
                                      className="popup3 btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#myModal-success"
                                    >
                                      {" "}
                                      حذف{" "}
                                    </Button>
                                    <Button
                                      variant="secondary"
                                      size="md"
                                      className="popup-cancle"
                                      data-bs-dismiss="modal"
                                    >
                                      {" "}
                                      إلغاء{" "}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="modal" id="myModal-success">
                              <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                  <div class="icon-box">
                                    <i id="material-icons">
                                      {" "}
                                      <BsCheck size={108} />{" "}
                                    </i>
                                  </div>
                                  <div className="">
                                    <div className="row align-items-center  justify-content-end mb-4 pt-2">
                                      <div className="col-6 p-0 ">
                                        <h4 className=" m-5"> </h4>
                                      </div>
                                      <div className="col-1"></div>
                                    </div>
                                    <div className="modal-body justify-content-center">
                                      <div className="row align-items-center  justify-content-center">
                                        <div className="row align-items-center justify-content-between pb-4  pt-2">
                                          <div className="text-center  h3">
                                            تم حذف الدرون بنجاح !
                                          </div>
                                        </div>
                                        <div className="row justify-content-start align-items-start">
                                          <div className="col-8 h5"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div></div>
                                  <div className="modal-footer border border-0 justify-content-center">
                                    <Button
                                      variant="secondary"
                                      size="md"
                                      data-bs-dismiss="modal"
                                      className="popup-cancle"
                                    >
                                      {" "}
                                      حسنًا{" "}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </div>

            <div>
              <div id="pagination">
                {pageNumber + 1 == 1 ? (
                  <button class="btn btn-primary btn-circle btn-smdis" disabled>
                    <BsChevronRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={gotoPrevious}
                    class="btn btn-primary btn-circle btn-sm"
                  >
                    <BsChevronRight size={18} />
                  </button>
                )}
                {pages.map((pageIndex) =>
                  pageNumber == pageIndex ? (
                    <button
                      key={pageIndex}
                      onClick={() => setPageNumber(pageIndex)}
                      class="btn btn-primary btn-circle btn-smpree"
                    >
                      {ArabicNumbers(pageIndex + 1)}
                    </button>
                  ) : (
                    <button
                      key={pageIndex}
                      onClick={() => setPageNumber(pageIndex)}
                      class="btn btn-primary btn-circle btn-sm"
                    >
                      {ArabicNumbers(pageIndex + 1)}
                    </button>
                  )
                )}
                {pageNumber + 1 == numberOfPages ? (
                  <button class="btn btn-primary btn-circle btn-smdis" disabled>
                    <BsChevronLeft size={18} />
                  </button>
                ) : (
                  <button
                    onClick={gotoNext}
                    class="btn btn-primary btn-circle btn-sm"
                  >
                    <BsChevronLeft size={18} />
                  </button>
                )}
              </div>

              <div id="page-number2">
                {" "}
                صفحة {ArabicNumbers(pageNumber + 1)} -{" "}
                {ArabicNumbers(numberOfPages)}
              </div>
            </div>

            <div>
              <div className="modal" id="myModal">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="">
                      <div className="row align-items-center  justify-content-end  pt-2">
                        <div className="col-2">
                          <button
                            data-bs-dismiss="modal"
                            className="closebtn btn rounded"
                          >
                            &#x2715;
                          </button>
                        </div>
                      </div>
                      <div className="modal-body justify-content-center">
                        <div className="row align-items-center  justify-content-center">
                          <div className="col-4 p-0 ">
                            <div class="add-img">
                              <IoAddCircle color="#B5864C" />
                            </div>
                            <img
                              src={droneImg}
                              class="
       bg-white  mx-auto  biggerImg 
      img-circle rounded-circle
      
      
    
      "
                              alt="Drone"
                            />
                          </div>

                          <div className="row align-items-center justify-content-between  h5">
                            <div class="row  m-0">
                              <div className="container w-75 m-3">
                                <form>
                                  <div class="form-group ">
                                    <label
                                      class="form-label  classLabel"
                                      for="droneName"
                                    >
                                      اسم الدرون
                                    </label>
                                    <input
                                      type="text"
                                      style={{ width: "350px" }}
                                      name="name"
                                      id="droneName"
                                      className="form-control classInput"
                                      required
                                      value={droneName}
                                      onChange={(e) => setName(e.target.value)}
                                    />
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
                                      value={droneName}
                                      onChange={(e) =>
                                        setRegion(e.target.value)
                                      }
                                    />
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                          {/* <div className="row justify-content-start align-items-start">
                      <div className="col-8 h5">
             
                      </div>
                    </div> */}
                        </div>
                      </div>
                    </div>

                    <div></div>

                    <div className="modal-footer border border-0 justify-content-evenly">
                      {/* <Button
                  variant="secondary"
                  size="md"
                  className="popup btn "
         // onClick={Accept}
          data-bs-dismiss="modal"
                >
           
إضافة
               </Button> */}
                      <button
                        onClick={handle}
                        data-bs-dismiss="modal"
                        type="button"
                        className="btn btn-primary my-2  px-3 classButton"
                      >
                        <IoAddSharp />
                        إضافة
                      </button>

                      {/* <Button
                  variant="secondary"
                  size="md"
                  className="popup btn "
                  data-bs-dismiss="modal"
                >
           
               إلغاء
                </Button> */}
                      <button
                        data-bs-dismiss="modal"
                        type="button"
                        className="btn btn-primary my-2  px-4 classButton2"
                      >
                        إلغاء
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <EditDrone droId={droneId._id} />
        </>
      )}
    </>
  );
}

export default DroneList;
