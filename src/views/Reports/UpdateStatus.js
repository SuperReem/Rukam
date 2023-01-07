import { render } from "@testing-library/react";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import MultiStepProgressBar from "../../components/MultiStepProgressBar.js";
import "./ReportDetails.css";
import Waste from "../../assets/images/waste.png";
import { useEffect } from "react";
import { BsCalendar4 } from "react-icons/bs";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  MarkerF,
} from "@react-google-maps/api";
function hexToBase64(str) {
  return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}
function UpdateStatus({report}) {
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
      googleMapsApiKey: "AIzaSyDvPoFbe6MDqYRGifizC34rXPlgGzCd9sE",
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
    
  const [currentIndex, setCurrentIndex] = useState(1);
  const [status, setStatus] = useState(report.image);
  const [currentState, setCurrentState] = useState(
    "تحديث الحالة الى قيد المراجعة "
  );



//update status in database
useEffect(() => {
  
  console.log(status +'j');
}, [status]);
const rep = {

  status: "closed",

};
useEffect(() => {
  
  console.log(rep +'j');
}, [rep]);


  const updatestatus = async (e) => {
  
    const response = await fetch(
      "/api/Report/" + report._id ,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
  
      if (!response.ok) {
        console.log("new report not added:");
        console.log(rep.notes);
      }
      if (response.ok) {
        console.log("updated:", json);
        console.log(status +'k');
      }
    
  
  };







  const check = () => {
    if (report.status == 3 && currentState === "تحديث الحالة الى مغلق") {
      setCurrentState("حالة الطلب مغلق");
    }
  };
  const update = () => {
    if ( report.status == "pending"){
      setStatus("under_processing");
      console.log(status);
      updatestatus();
    }
   
    setCurrentState("تحديث الحالة الى مغلق");
    if (report.status == "under_processing") {
      setStatus("closed");
      console.log(status);
      updatestatus();
    }
   
    if (currentIndex == 3) console.log("dhbfh");
  };

  return (
    <div className="App">
      <div className="row">
        <div className="">
          <h1 class="h5 text-end">البلاغات تفاصيل البلاغ</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="m-2 mt-0">
            <div id="title"> تفاصيل البلاغ</div>
          </div>
        </div>
      </div>
      <div class="he shadow-sm ms-4 me-3 rounded-4 pb-0">
        <div className="row">
          <div className="col-sm-6 ">
            <div className="m-2 mt-0">
              <div className="heading text-end pe-2">الوقت والتاريخ</div>
              <hr className="hr m-0 p-2" />
              <div className="container time  rounded p-1 mb-4 align-items-right ">
                <BsCalendar4 color="var(--primary)" className="ms-4" />
                {report.timestamp   }           </div>
              <div className="heading text-end pe-2">صور المخالفة</div>
              <hr className="hr m-0 p-2" />
              <div className="container pic rounded mb-4 shadow-sm">
              { <img src={"data:image/jpeg;base64,"+ report.image} /> 
              // <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4
              // //8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" />
            }
              </div>
              <div className="heading text-end pe-2">ملاحظات</div>
              <hr className="hr m-0 p-2" />
              <div className="ps-5 ms-5 justify-content-end">
                <p className="h6 ps-5">
              {report.notes}
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="m-2 mt-0">
              <div className="heading text-end pe-2">حالة البلاغ</div>
              <hr className="hr m-0 p-2" />
              <div className={"reportstatus-container " + report.status}>
                <h6>
                  {report.status == "unsent"
                    ? "غير مرسل"
                    : report.status == "pending"
                    ? "قيد الإنتظار"
                    : report.status == "under_processing"
                    ? "قيد المراجعة"
                    : "مغلق"}
                </h6>
              </div>
              <div className="heading text-end pe-2">موقع المخالفة</div>
              <hr className="hr m-0 p-2" />
              <div className="container pic rounded shadow-sm mb-5 p-0">
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
              <div className="container mt-5 pt-5">
                <div className="row">
                  <div className="col-6">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="send btn"
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                    >
                      تحديث حالة البلاغ
                    </Button>
                  </div>
                  <div className="col-6">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="cancel btn"
                    >
                      {" "}
                      إلغاء{" "}
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
                <div className="row align-items-center  justify-content-end mb-4 pt-2">
                  <div className="col-6 p-0 ">
                    <h4 className=" m-0">تحديث الحالة</h4>
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
                    <div className="col-8 progressbar  pb-4">
                      <MultiStepProgressBar currentStep={currentIndex} />
                    </div>
                    <div className="row align-items-center justify-content-between pb-4 me-4 pt-2">
                      <div className="col-3 align-items-center h6">
                        قيد الإنتظار
                      </div>
                      <div className="col-3 h6">قيد المراجعة</div>
                      <div className="col-3 h6">مغلق</div>
                    </div>
                    <div className="row justify-content-start align-items-start">
                      <div className="col-8 h5">
                        {check()}
                        {currentState}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div></div>

              <div className="modal-footer border border-0 justify-content-center">
                <Button
                  variant="secondary"
                  size="md"
                  className="updatS btn"
                  onClick={updatestatus}
                >
                  {" "}
                  تحديث الحالة
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateStatus;
