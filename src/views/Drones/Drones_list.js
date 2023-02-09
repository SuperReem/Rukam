import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
//import drone from "../../assets/images/DRONE_ICON.png";
import { useDronesContext } from "../../hooks/useDronesContext";
import ArabicNumbers from "react-native-arabic-numbers/src/ArabicNumbers";
import Dropdown from "./Dropdown";
import "./Dropdown_Style.css";
import "./Drones_list.css";
import Modal from "react-bootstrap/Modal";
import droneImg from "../../assets/images/Drone.png";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowUpLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";
import { IoAddSharp } from "react-icons/io5";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import "../../views/Drones/Drones_list.css";
import { MdNoMeals, MdOutlineEdit } from "react-icons/md";
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

const ChoooseRegion = "اختر المنطقة";
// const ChoooseRegion = "";

function DroneList() {
  const [imgFile, setImgFile] = useState(droneImg);
  const [dronName, setDronName] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [errorName, setErrorName] = useState("");
  const [errorRegion, setErrorRegion] = useState("  ");

  const [droneName, setName] = useState("");
  const [region, setRegion] = useState(ChoooseRegion);
  const [image, setImage] = useState({ myFile: droneImg });

  const { drones, dispatch } = useDronesContext();
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  const [Success, setSuccess] = useState(false);
  const [addD, setAddD] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setImage({ ...image, myFile: base64 });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (droneName.trim().replace(" ", "").length == 0) {
      console.log("handel method ");
      setErrorName("الرجاء اختيار اسم الدرون");
    }
    if (region == "اختر المنطقة") {
      setErrorRegion("الرجاء اختيار المنطقة");
    }
    if (
      (errorName == "" || errorName == "الحد الأعلى هو ١٠ أحرف.") &&
      errorRegion == "" &&
      region != "اختر المنطقة"
    ) {
      console.log("good l ");
      const drone = {
        droneName,
        region,
        image: image,
        active: false,
        currentLocation: { lat: 24.717634, lng: 46.666387 },
        visitedLocations: {},
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
        setErrorName("اسم الدرون موجود مسبقًا");
      }

      if (response.ok) {
        setName("");
        setRegion(ChoooseRegion);
        setImage({ myFile: droneImg });
        console.log("new drone added:", json);
        setRefresh(!refresh);
        //  dispatch({ type: "CREATE_DRONE", payload: json });
        setAddD(false);
        setSuccess(true);
      }
    }
  };
  const DeleteDrone = async (Id) => {
    const response = await fetch("/api/Drone/" + Id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      console.log("Deleted", json);
      setRefresh(!refresh);
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
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  var droneNames = [];
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
  }, [dispatch, pageNumber, refresh]);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };
  const [index, setIndex] = useState(0);
  const [droneId, setDrone] = useState();
  const [formError, setformError] = useState("");
  const handleClose = () => {
    setAddD(false);
    setSuccess(false);
    setErrorName("");
  };
  const handleAdd = () => {
    setAddD(true);
  };

  // useEffect(() => {
  //   if (droneName.length <= 0) {
  //     setErrorName("الرجاء اختيار اسم الدرون");
  //   }

  //   setErrorRegion("الرجاء اختيار المنطقة");
  // }, []);

  return (
    <>
      {index == 0 ? (
        <>
          <div>
            <div className=" d-flex align-items-center justify-content-between">
              <div className="" id="title">
                قائمة الدرونز
              </div>

              <Button
                variant="secondary"
                size="sm"
                className="darkbtn"
                onClick={handleAdd}
              >
                <AiOutlinePlus /> إضافة درون
              </Button>
            </div>

            <div class="container-fluid bg-3 text-center divSizing">
              <div class="row text-center  mt-4  ">
                {drones &&
                  drones.map((Drone) => (
                    <>
                      <div class="col-lg-3 col-sm-6 text-center mb-4 mt-2">
                        <div class=" card mx-2 text-center mt-5 border-1 border-opacity-10 border-secondary border-opacity-25hh rounded-4  p-0 ">
                          <div className="Drones">
                            <div class=" card-body avatar mx-auto white avatar-container text-center mx-auto position-relative pb-0 pt-2 ">
                              <img
                                class="
                card-img-top bg-white mx-auto  biggerImg  border border-4 border-success
               img-circle rounded-circle   p-2  position-absolute top-0 start-50 translate-middle m-2 
                "
                                src={
                                  Drone.image
                                    ? Drone.image.myFile
                                      ? Drone.image.myFile
                                      : droneImg
                                    : droneImg
                                } //{drone.image}
                                alt=""
                              />
                              <img
                                class="
                card-img-top bg-white mx-auto  biggerImg  
               img-circle rounded-circle   p-2  position-absolute top-0 start-50 translate-middle m-2 
                "
                                src={
                                  Drone.image
                                    ? Drone.image.myFile
                                      ? Drone.image.myFile
                                      : droneImg
                                    : droneImg
                                } //{drone.image}
                                alt=""
                              />
                              {Drone.active ? (
                                <>
                                  {" "}
                                  <span>
                                    {" "}
                                    <BsCircleFill className="check-icon-active "></BsCircleFill>
                                  </span>{" "}
                                </>
                              ) : (
                                <></>
                              )}

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
                                          src={
                                            Drone.image
                                              ? Drone.image.myFile
                                                ? Drone.image.myFile
                                                : droneImg
                                              : droneImg
                                          }
                                          class="
                 bg-white  mx-auto  biggerImg 
                img-circle rounded-circle
                
                 
              
                "
                                          alt="Drone"
                                        />
                                      </div>
                                      <div className="row p-2">
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
                                          zoom={11}
                                          onLoad={onLoad}
                                          onUnmount={onUnmount}
                                        >
                                          {Drone.visitedLocations &&
                                            Drone.visitedLocations.map(
                                              (location) => (
                                                <MarkerF
                                                  position={location}
                                                ></MarkerF>
                                              )
                                            )}
                                        </GoogleMap>
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
                                    <div className="row align-items-center  justify-content-end pt-2">
                                      <div className="col-8 p-0 ">
                                        <h4 className="h3 m-0">حذف الدرون</h4>
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
                                        <div className="row align-items-center justify-content-center  h5">
                                          هل أنت متأكد من حذف هذا الدرون؟
                                        </div>
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
                                        <div className="row align-items-center justify-content-between">
                                          <div className="text-center  h4">
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
              <Modal
                className="modal o1"
                centered
                show={addD}
                onHide={handleClose}
              >
                <form onSubmit={handelSubmit}>
                  <div className="row align-items-center  justify-content-end  pt-2">
                    <div className="col-2">
                      <button
                        onClick={handleClose}
                        className="closebtn btn rounded"
                        type="button"
                      >
                        &#x2715;
                      </button>
                    </div>
                  </div>
                  <div className="modal-body justify-content-center">
                    <div className="row align-items-center  justify-content-center">
                      <div className="col-4  ">
                        <label
                          htmlFor="file-upload"
                          className="custom-file-upload"
                        >
                          <img
                            src={image.myFile}
                            alt=""
                            class="
                                card-img-top bg-white mx-auto  DroneImg   
                                img-circle rounded-circle   
                                position-absolute top-0 start-50 translate-middle m-3 
                                "
                          />
                        </label>
                        <div class="add-imgIcon p-1 m-1">
                          <IoAddCircle size={28} color="#B5864C" />
                        </div>
                        <input
                          type="file"
                          lable="Image"
                          name="myFile"
                          id="file-upload"
                          accept=".jpeg, .png, .jpg , .svg"
                          onChange={(e) => handleFileUpload(e)}
                        />
                      </div>
                      <div class="row  p-2"></div>
                      <div className="row align-items-center justify-content-between  h5">
                        <div class="row  m-0">
                          <div className="container w-75 mt-3">
                            {/* <form> */}
                            <div class="form-group ">
                              <label
                                class="form-label  classLabel"
                                for="droneName"
                              >
                                اسم الدرون
                              </label>
                              <input
                                type="text"
                                //style={{ width: "350px" }}
                                name="name"
                                id="droneName"
                                className="form-control classInput"
                                // required
                                value={droneName}
                                onChange={(e) => {
                                  setName(
                                    e.target.value.replace(
                                      /[&\/[$\]\\#,;@!+()$~%.'":*?<>{}]/g,
                                      ""
                                    )
                                  ); //(/[#[$\]\\@]/g,''));
                                  var aux = e.target.value
                                    .trim()
                                    .replace(" ", "");
                                  if (aux.length === 0) {
                                    console.log("upper");
                                    setErrorName("الرجاء اختيار اسم الدرون");
                                  } else if (e.target.value.length >= 2) {
                                    if (e.target.value.length >= 10) {
                                      setErrorName("الحد الأعلى هو ١٠ أحرف.");
                                    } else {
                                      console.log("the prob");
                                      setErrorName(""); //
                                    }
                                  } else if (e.target.value.length < 2) {
                                    setErrorName(
                                      "اسم الدرون يجب ان يحتوي على حرفين على الاقل "
                                    );
                                  }
                                  if (true) {
                                    console.log("hhhh");
                                  }
                                }}
                                pattern="([A-z0-9\s]){0,10}" //"(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{2,10}"
                                maxlength="10"
                              />
                            </div>
                            {
                              <span style={{ color: "red", fontSize: "15px" }}>
                                {errorName}
                              </span>
                            }

                            <div class="form-group">
                              <label class="form-label  classLabel" for="">
                                المنطقة
                              </label>
                              <Dropdown
                                region={region}
                                setRegion={setRegion}
                                setErrorRegion={setErrorRegion}
                                placeholder="********"
                                value={region}
                                onChange={(e) => {
                                  setRegion(e.target.value);
                                  if (e.target.value != "اختر المنطقة") {
                                    setErrorRegion("");
                                  } else {
                                    setErrorRegion("الرجاء اختيار المنطقة");
                                  }
                                }}
                              />
                            </div>
                            {
                              <span style={{ color: "red", fontSize: "15px" }}>
                                {errorRegion}
                              </span>
                            }
                            {/* </form> */}
                          </div>
                        </div>
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
                      // onClick={handle}
                      // data-bs-dismiss="modal"
                      type="Submit"
                      className="btn btn-primary my-2  px-3 classButton"
                      // disabled={!!errorName || !!errorRegion}
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
                      onClick={handleClose}
                      type="button"
                      className="btn btn-primary my-2  px-4 classButton2"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              </Modal>
            </div>
          </div>

          <Modal
            className="modal o1"
            centered
            show={Success}
            onHide={handleClose}
          >
            <Modal.Body>
              {" "}
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
                    <div className="row align-items-center justify-content-between">
                      <div className="text-center  h4">
                        تم إضافة الدرون بنجاح !
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
                  onClick={handleClose}
                  className="popup-cancle"
                >
                  {" "}
                  حسنًا{" "}
                </Button>
              </div>
            </Modal.Body>
          </Modal>
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
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
