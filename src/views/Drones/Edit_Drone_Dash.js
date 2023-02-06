import React from "react";
import "./Drones.css";
import Drone from "../../assets/images/Drone.png";
import "bootstrap/dist/css/bootstrap.css";
// import {DropdownButton , Dropdown} from 'react-bootstrap';
import { MdOutlineEdit } from "react-icons/md";
import { BiSave } from "react-icons/bi";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { useDronesContext } from "../../hooks/useDronesContext";
import Dashboard_Admin from "../../views/Dashboard/Dashboard_Admin";
import droneImg from "../../assets/images/Drone.png";
import { BsCheck } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";

const EditDroneDash = ({ droId }) => {
  const [droneName, setName] = useState("");
  const [region, setRegion] = useState("");
  const [image, setImage] = useState();
  const [dro, setDrone] = useState();
  const [visitedLocations, setVisitedLocations] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const { drones, dispatch } = useDronesContext();
  const [index, setIndex] = useState(0);
  const [errorName, setErrorName] = useState("");
  const [Success, setSuccess] = useState(false);
  const [addD, setAddD] = useState(false);

  const handleClose = () => {
    setAddD(false);
    setSuccess(false);
    setErrorName("");
  };

  useEffect(() => {
    const fetchDrones = async () => {
      const response = await fetch("/api/Drone/" + droId, {
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
        setDrone(drone);
        setName(drone.droneName);
        setImage(drone.image);
        setRegion(drone.region);
        setCurrentLocation(drone.currentLocation);
        setVisitedLocations(drone.visitedLocations);
      }
    };
    fetchDrones();
  }, []);

  // const updatename = (event) => {
  //   setName(event.target.value);
  // };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setImage({ ...image, myFile: base64 });
  };
  const Save = async (e) => {
    if (droneName.replace(" ", "").length == 0) {
      setErrorName("الرجاء اختيار اسم الدرون");
    }
    if (droneName.length == 0) {
      setErrorName("الرجاء اختيار اسم الدرون");
    }

    if (errorName == "" || errorName == "الحد الأعلى هو ١٠ أحرف.") {
      const drn = {
        droneName: droneName,
        region: region,
        image: image,
        currentLocation: currentLocation,
        visitedLocations: visitedLocations,
      };
      const response = await fetch("/api/Drone/" + droId, {
        method: "PATCH",
        body: JSON.stringify(drn),

        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (!response.ok) {
        // dispatch({ type: "UPDATE_DETAILS", payload: json });
        console.log("Drone is not updated:");
        console.log(drn.droneName);
        setErrorName("اسم الدرون موجود مسبقًا");
      }
      if (response.ok) {
        console.log("Drone is updated:", json);
        setAddD(false);
        setSuccess(true);
      }
      console.log(droId);
    }
  };

  const HandleSave = async (e) => {
    Save();
  };

  const PageNav = (i) => () => {
    setIndex(i);
  };

  return (
    <>
      {index == 0 ? (
        <>
          <div class="App">
            <div className="row">
              <div className="col-sm-12">
                <div className="pageNavigation">
                  <a class="pagenav h5 text-end pe-4" onClick={PageNav(1)}>
                    الرئيسية
                  </a>
                  <p className="pagenav h5 text-end">&gt;&gt;</p>

                  <a class="pagenav h5 text-end" onClick={PageNav(1)}>
                    تفاصيل الدرون{" "}
                  </a>
                  <p className="pagenav h5 text-end">&gt;&gt;</p>
                  <a class="pagenav h5 text-end colored">تحرير الدرون</a>
                </div>
                <div className="pe-4" id="title">
                  {" "}
                  تحرير الدرون
                </div>
              </div>
            </div>

            <div class="box">
              <div class="row ">
                <div class="img">
                  <label htmlFor="file-upload" className="custom-file-upload">
                    <img
                      src={
                        image
                          ? image.myFile
                            ? image.myFile
                            : droneImg
                          : droneImg
                      }
                      alt="Drone"
                      //     class="
                      //  bg-white  mx-auto  biggerImg
                      // img-circle rounded-circle

                      // "

                      // src={image.myFile || droneImg}
                      // alt=""
                      class="
                     bg-white  mx-auto  droneImage
                    img-circle rounded-circle

                    "
                    />
                  </label>
                  <div class="edit-img">
                    <MdOutlineEdit className="editicon" />
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
              </div>

              <div class="row  m-0">
                <div className="container w-75 ">
                  <form>
                    <div class="form-group">
                      <label class="form-label  classLabel" for="droneName">
                        اسم الدرون
                      </label>
                      <input
                        type="text"
                        name="name"
                        onChange={(e) => {
                          // updatename
                          setName(
                            e.target.value.replace(
                              /[&\/[$\]\\#,;@!+()$~%.'":*?<>{}]/g,
                              ""
                            )
                          );
                          var aux = e.target.value.trim().replace(" ", "");
                          if (aux.length === 0) {
                            console.log("upper");
                            setErrorName("الرجاء اختيار اسم الدرون");
                          } else if (e.target.value.length >= 2) {
                            if (e.target.value.length >= 10) {
                              setErrorName("الحد الأعلى هو ١٠ أحرف.");
                            } else {
                              setErrorName("");
                            }
                          } else if (e.target.value.length < 2) {
                            setErrorName(
                              "اسم الدرون يجب ان يحتوي على حرفين على الاقل "
                            );
                          }
                        }}
                        defaultValue={droneName}
                        id="droneName"
                        className="form-control classInput"
                        required
                        pattern="([A-z0-9\s]){0,10}" //"(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{2,10}"
                        maxlength="10"
                      />
                    </div>

                    {
                      <p
                        style={{ color: "red", fontSize: "15px" }}
                        class="error"
                      >
                        {errorName}
                      </p>
                    }

                    <div class="form-group">
                      <label class="form-label  classLabel" for="">
                        المنطقة
                      </label>
                      <Dropdown
                        region={region}
                        setRegion={setRegion}
                        onChange={(e) => setRegion(e.target.value)}
                      />
                    </div>

                    <div className="row px-md-5">
                      <div className="col">
                        <div className="text-center">
                          <button
                            type="button"
                            className="btn btn-primary my-4   classButton"
                            onClick={HandleSave}
                            // data-bs-toggle="modal"
                            // data-bs-target="#myModal-success"
                            // disabled={errorName != ""}
                          >
                            <BiSave />
                            حفظ
                          </button>
                        </div>
                      </div>
                      <div className="col">
                        <div className="text-center">
                          <button
                            type="button"
                            className="btn btn-primary my-4  px-4 classButton2"
                            onClick={() => setIndex(1)}
                          >
                            إلغاء
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* <div>
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
                                تم تحرير الدرون بنجاح !
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
                          // onClick={HandleSave}
                            onClick={PageNav(1)}
                        >
                          {" "}
                          حسنًا{" "}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

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
                            تم حفظ الدرون بنجاح !
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
                      onClick={PageNav(1)}
                      className="popup-cancle"
                    >
                      {" "}
                      حسنًا{" "}
                    </Button>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </>
      ) : (
        <>
          <Dashboard_Admin />
        </>
      )}
    </>
  );
};

export default EditDroneDash;
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
