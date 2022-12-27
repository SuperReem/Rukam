import '../Reports/ReportDetails.css';
import Waste from '../../assets/images/waste.png';
import Button from "react-bootstrap/Button"
import { BsCalendar4 } from "react-icons/bs";
import { MdOutlineModeEditOutline } from "react-icons/md";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  MarkerF,
} from "@react-google-maps/api";
import { useState } from "react";
import React from "react";


function DetectionDetails({ detection }) {
  const [index, setIndex] = useState(0);
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
    
  return (

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
Drone21     
   </div>
        <div className="heading text-end pe-2">
          صور المخالفة
        </div>
        <hr className="hr m-0 p-2" />
        <div className="container pic rounded mb-4 shadow-sm">
        <img src={Waste} alt="Waste" />;
        </div>
        <div className="heading text-end pe-2">
          ملاحظات
        </div>
        <hr className="hr m-0 p-2" />
        <div className='ps-5 ms-5 justify-content-end'>
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
        <div className="heading text-end pe-2">
الوقت والتاريخ        </div>
        <hr className="hr m-0 p-2" />
        <div className="container time  rounded p-1 mb-4 align-items-right ">
        <BsCalendar4 color='var(--primary)' className='ms-4'/>  
        ٢٠ اكتوبر - ١٢ مساءا
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
            <Button variant="secondary" size="lg" className="edit justify-content-between">  

       <MdOutlineModeEditOutline color='white' />   &nbsp; قبول المخالفة
              </Button>
            </div>
            <div className="col-6">
              <Button variant="secondary" size="lg" className="cancel btn">  رفض المخالفة</Button>
            </div>
            </div>
        </div>
      </div>
    </div>

  </div>
</div>
    </div>
  );
}

export default DetectionDetails;
