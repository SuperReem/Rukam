import "../Reports/ReportDetails.css";
import Waste2 from "../../assets/images/waste2.jpeg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsCalendar4 } from "react-icons/bs";
import { BsCheckLg } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { useIntl } from "react-intl";
import { BsCheck } from "react-icons/bs";
import { useDetectionsContext } from "../../hooks/useDetectionsContext";
import { MdOutlineModeEditOutline } from "react-icons/md";
import DetectionList from "../Detections/Detection_list";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  MarkerF,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import React from "react";

function DetectionDetails({ detection }) {
  const [index, setIndex] = useState(0);
  const [Success, setSuccess] = useState(false);
  const [Success2, setSuccess2] = useState(false);
  const [currentPageData, setCurrentPageData] = useState(new Array(5).fill());
  const items = [
    1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 1, 2, 3,
    4, 5, 6, 7, 12, 13, 14,
  ];

  const { dispatch } = useDetectionsContext();

  const containerStyle = {
    width: "100%;",
    height: "100%",
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

  const Accept = async (e) => {

    const report = {
      droneId:"5555",
      reportId: "9898",
      timestamp: detection.createdAt,
      status: "unsent",
      region: detection.region,
      image: detection.image,
      notes: "",
      location:{ lang: detection.location.latitude,
      lat:detection.location.longitude},
      filter: filterSlice,
    };
    const response = await fetch("/api/Report/", {
      method: "POST",
      body: JSON.stringify(report),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log("new report not added:");
    }
    if (response.ok) {
      console.log("new report added:", json);
    }
    DeleteDetection();
  };

  const HandleAccept = () => {
    Accept();
    setSuccess(true); 
  };

  const HandleDecline = () => {
    DeleteDetection();
    setSuccess2(true); 
  };

  const handleClose = () =>{setIndex(1); setSuccess(false); setSuccess2(false)}


  useEffect(() => {
    console.log(filterSlice);
  }, [filterSlice]);
  var filterStr = detection.createdAt;
  var filterSlice = filterStr.toString().slice(0, 10);

  const DeleteDetection = async () => {
    const response = await fetch("/api/Detection/" + detection._id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      console.log("jknswcdj:", json);
    
    }
  };



  const PageNav = async (e) => {
    setIndex(2);
  };
  return (
    <>
      {index == 0 ? (
        <>
          <div className="App">
            <div className="row">
              <div className="col-sm-12">
              <div className="pageNavigation">
                  <a className="pagenav h5 text-end pe-4" onClick={PageNav}>المواقع المخالفة</a>
                  <p className="pagenav h5 text-end">&gt;&gt;</p>
                  <a class="pagenav h5 text-end colored">موقع مخالف</a>
                </div>
             
                <div className="pe-4" id="title"> تفاصيل المخالفة</div>
              </div>
            </div>
            <div class="he shadow-sm ms-4 me-3 rounded-4 pb-0 mt-2">
              <div className="row">
                <div className="col-sm-6 ">
                  <div className="m-2 mt-0">
                    <div className="heading text-end pe-2">اسم الدرون</div>
                    <hr className="hr m-0 p-2" />
                    <div className="container h4  rounded p-1 mb-4 align-items-right ">
                      {detection.droneId}
                    </div>
                    <div className="heading text-end pe-2">صور المخالفة</div>
                    <hr className="hr m-0 p-2" />
                    <div className="container pic rounded mb-4 shadow-sm p-0">
                      {
                        //<img src={"data:image/jpeg;base64,"+ detection} />
                        // <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4
                        // //8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" />
                        <img src={Waste2} alt="Waste" className="imagewaste" />
                      }
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="m-2 mt-0">
                    <div className="heading text-end pe-2">الوقت والتاريخ </div>
                    <hr className="hr m-0 p-2" />
                    <div className="container time ">
                      <h6>
                        {" "}
                        <BsCalendar4 color="var(--primary)" className="ms-4" />
                        {   Intl.DateTimeFormat("ar-EG", {
                                dateStyle: "full",
                              }).format(new Date(detection.createdAt))}
                      </h6>
                    </div>
                    <div className="heading text-end pe-2">موقع المخالفة</div>
                    <hr className="hr m-0 p-2" />
                    <div className="container loc rounded shadow-sm mb-5 p-0">
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
                    </div>
                    <div className="row"> </div>
                    <div className="container mt-4 mb-4 pt-3">
                      <div className="row">
                        <div className="col-6">
                          <Button
                            variant="secondary"
                            size="lg"
                            className="edit justify-content-between"
                            data-bs-toggle="modal"
                            data-bs-target="#myModal2"
                          >
                            <BsCheckLg color="white" /> &nbsp; قبول المخالفة
                          </Button>
                        </div>
                        <div className="col-6">
                          <Button
                            variant="secondary"
                            size="lg"
                            className="deleteD btn"
                            data-bs-toggle="modal"
                            data-bs-target="#myModal"
                          >
                            {" "}
                            <BsTrash color="white" /> رفض المخالفة
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>





            <div>
              <div className="modal" id="myModal">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="">
                      <div className="row align-items-center  justify-content-end  pt-2">
                        <div className="col-6 p-0 ">
                          <h4 className=" m-0 h3">رفض المخالفة </h4>
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
                          <div className="row align-items-center justify-content-center   h5">
                            هل انت متأكد من رفض المخالفة؟
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
                        className="popup3 btn "
                        onClick={HandleDecline}
                        data-bs-toggle="modal"
                        data-bs-target="#myModal-success2">
                      
                        رفض المخالفة{" "}
                      </Button>

                      <Button
                        variant="secondary"
                        size="md"
                        className="popup btn "
                        data-bs-dismiss="modal"
                      >
                        إلغاء
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>




            <div>
              <div className="modal" id="myModal2">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="">
                      <div className="row align-items-center  justify-content-end  pt-2">
                        <div className="col-6 p-0 ">
                          <h4 className=" m-0 h3">قبول المخالفة </h4>
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
                          <div className="row align-items-center justify-content-center   h5">
                            هل انت متأكد من قبول المخالفة؟
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
                        className="popup2 btn "
                        onClick={HandleAccept}
                        data-bs-dismiss="modal"
          >
                      
                        قبول المخالفة{" "}
                      </Button>
                      <Button
                        variant="secondary"
                        size="md"
                        className="popup btn "
                        data-bs-dismiss="modal"
                      >
                        إلغاء
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>





          <Modal className="modal o1" centered show={Success} onHide={handleClose}>
    <Modal.Body>  <div class="icon-box">
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
                        تم قبول البلاغ بنجاح !
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
              </div></Modal.Body>
  </Modal>





  <Modal centered className="modal o1" show={Success2} onHide={handleClose}>
    <Modal.Body>  <div class="icon-box">
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
                <div className="modal-body justify-content-center ">
                  <div className="row align-items-center  justify-content-center">
                    <div className="row align-items-center justify-content-between ">
                      <div className="text-center  h4">
                        تم رفض البلاغ بنجاح !
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
              </div></Modal.Body>
  </Modal>

        </>
      ) : (
        <DetectionList />
      )}
    </>
  );
}

export default DetectionDetails;
