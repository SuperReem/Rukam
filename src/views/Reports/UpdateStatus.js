import { render } from "@testing-library/react";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import MultiStepProgressBar from "../../components/MultiStepProgressBar.js";
import "./ReportDetails.css";
import Waste from "../../assets/images/waste.png";
import { BsCalendar4 } from "react-icons/bs";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  MarkerF,
} from "@react-google-maps/api";

function UpdateStatus() {
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
  const [currentState, setCurrentState] = useState(
    "تحديث الحالة الى قيد المراجعة "
  );

  const check = () => {
    if (currentIndex == 3 && currentState === "تحديث الحالة الى مغلق") {
      setCurrentState("حالة الطلب مغلق");
    }
  };
  const update = () => {
    if (currentIndex == 1) setCurrentIndex(2);
    setCurrentState("تحديث الحالة الى مغلق");
    if (currentIndex == 2) setCurrentIndex(3);

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
                ٢٠ اكتوبر - ١٢ مساءا
              </div>
              <div className="heading text-end pe-2">صور المخالفة</div>
              <hr className="hr m-0 p-2" />
              <div className="container pic rounded mb-4 shadow-sm">
                <img src={Waste} alt="Waste" />;
              </div>
              <div className="heading text-end pe-2">ملاحظات</div>
              <hr className="hr m-0 p-2" />
              <div className="ps-5 ms-5 justify-content-end">
                <p className="h6 ps-5">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Autem reprehenderit magni, odio eligendi laborum possimus,
                  quaerat quos nisi, delectus sit fugiat !
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="m-2 mt-0">
              <div className="heading text-end pe-2">حالة البلاغ</div>
              <hr className="hr m-0 p-2" />
              <div className="container status rounded p-1  d-flex justify-content-center mb-4">
                قيد المراجعة
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
                  onClick={update}
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
