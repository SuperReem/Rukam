import '../Reports/ReportDetails.css';
import Waste from '../../assets/images/waste.png';
import Button from "react-bootstrap/Button"
import { BsCalendar4 } from "react-icons/bs";
import { BsCheckLg } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { useIntl } from "react-intl";
import { useDetectionsContext } from "../../hooks/useDetectionsContext";
import { MdOutlineModeEditOutline } from "react-icons/md";
import DetectionList from "../Detections/Detection_list";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  MarkerF,
} from "@react-google-maps/api";
import { useState } from "react";
import React from "react";


function DetectionDetails({detection}) {
  const [index, setIndex] = useState(0);

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
    
    const Accept = async (e) => {
      e.preventDefault();
  
      const report = {
        reportId: "9898",
        timestamp: detection.time,
        status: "unsent",
        region: detection.region,
        image: detection.image,
        notes: "",
        location: detection.location,
      };
  
      const response = await fetch("/api/Report", {
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
      setIndex(1);
    };
  

    const DeleteDetection = async () => {
      const response = await fetch(
        "/api/Detection/" + detection._id,
        {
          method: "DELETE",
        }
      );
      const json = await response.json();
      if (response.ok) {
        console.log("jknswcdj:", json);
      }
    };

    const Decline = async (e) => {
      DeleteDetection();
      setIndex(1);
    }
  return (
    <>
    {index == 0 ? (
      <>
    <div className="App">
        <div className="row">
          <div className="">
            <h1 class="h5 text-end">المواقع المخالفة  موقع مخالف</h1>
          </div>
        </div>
        <div className="row">
        <div className="col-sm-12">
          <div className="m-2 mt-0">
          <div id="title"> موقع مخالف</div>
          </div>
        </div>
    </div>
        <div class="he shadow-sm ms-4 me-3 rounded-4 pb-0">

<div className="row">
    <div className="col-sm-6 ">
      <div className="m-2 mt-0">
        <div className="heading text-end pe-2">
          اسم الدرون
        </div>
        <hr className="hr m-0 p-2" />
        <div className="container h4  rounded p-1 mb-4 align-items-right ">
        {detection.droneId}
   </div>
        <div className="heading text-end pe-2">
          صور المخالفة
        </div>
        <hr className="hr m-0 p-2" />
        <div className="container pic rounded mb-4 shadow-sm">
        <img src={Waste} alt="Waste" />;
        </div>
     

      </div>
    </div>
    <div className="col-sm-6">
      <div className="m-2 mt-0">
        <div className="heading text-end pe-2">
الوقت والتاريخ        </div>
        <hr className="hr m-0 p-2" />
        <div className="container time  rounded p-1 mb-4 align-items-right ">
        <BsCalendar4 color='var(--primary)' className='ms-4'/>  
        {detection.time}
        </div>
        <div className="heading text-end pe-2">
          موقع المخالفة
        </div>
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
        <div className="container mt-5 pt-5">
          <div className="row">
            <div className="col-6">
            <Button variant="secondary" size="lg" className="edit justify-content-between" onClick={Accept}>  

       <BsCheckLg color='white' />   &nbsp; قبول المخالفة
              </Button>
            </div>
            <div className="col-6">
              <Button variant="secondary" size="lg" className="cancel btn" onClick={Decline}>  <BsTrash color='white' /> رفض المخالفة</Button>
            </div>
            </div>
        </div>
      </div>
    </div>

  </div>
</div>
    </div>
    </>
      ) : (
        <DetectionList/>
      )}
    </>
  );
}

export default DetectionDetails;
