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
import Dronelist from "../../views/Drones/Drones_list";
import droneImg from "../../assets/images/Drone.png";

const EditDrone = ({ droId }) => {
  const [droneName, setName] = useState("");
  const [region, setRegion] = useState("");
  const [image, setImage] = useState();
  const [dro, setDrone] = useState();
  const [visitedLocations, setVisitedLocations] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const { drones, dispatch } = useDronesContext();
  const [index, setIndex] = useState(0);

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

  const updatename = (event) => {
    setName(event.target.value);
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setImage({ ...image, myFile: base64 });
  };
  const Save = async (e) => {
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
      dispatch({ type: "UPDATE_DETAILS", payload: json });
      console.log("Drone is not updated:");
      console.log(drn.droneName);
    }
    if (response.ok) {
      console.log("Drone is updated:", json);
    }
    setIndex(1);
    console.log(droId);
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
                    قائمة الدرون
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
              <div class="row  m-2">
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
                     bg-white  mx-auto  biggerImg
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
                    accept=".jpeg, .png, .jpg"
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
                        onChange={updatename}
                        defaultValue={droneName}
                        id="droneName"
                        className="form-control classInput"
                        required
                      />
                    </div>

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
                            className="btn btn-primary my-4  px-3 classButton"
                            onClick={Save}
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
                            onClick={PageNav(1)}
                          >
                            إلغاء
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Dronelist />
        </>
      )}
    </>
  );
};

export default EditDrone;
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
