import './ReportDetails.css';
import { FiSave } from "react-icons/fi";
import Waste from '../../assets/images/waste.png';
import Button from "react-bootstrap/Button"
import { BsCalendar4 } from "react-icons/bs";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  MarkerF,
} from "@react-google-maps/api";
import React, { useState } from "react";
import ReportDetails from "../../views/Reports/ReportDetails";



function EditReport({report}) {
  const [notes, setNotes] = useState(report.notes);
  const [index, setIndex] = useState(0);
  const [currentPageData, setCurrentPageData] = useState(new Array(5).fill());
  const items = [
    1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 1, 2, 3,
    4, 5, 6, 7, 12, 13, 14,
  ];

  const updatetext = event => {
  setNotes(event.target.value);
  }

  const rep = {
    reportId: report.reportId,
    timestamp:report.timestamp,
    status:report.status,
    region: report.region,
    image: report.image,
    notes:notes,
    location: report.location,
  };
  

  const Save = async (e) => {
    const response = await fetch(
      "/api/Report/" + report._id,
      {
        method: "PATCH",
        body: JSON.stringify(rep),
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
        console.log("new report added:", json);
      }
    
    setIndex(1);
  };



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
    <>
    {index == 0 ? (
      <>
    <div className="App">
        <div className="row">
          <div className="">
            <h1 class="h5 text-end">البلاغات  تفاصيل البلاغ</h1>
          </div>
        </div>
        <div className="row">
        <div className="col-sm-12">
          <div className="m-2 mt-0">
          <div id="title"> تحرير البلاغ</div>
          </div>
        </div>
    </div>
        <div class="he shadow-sm ms-4 me-3 rounded-4 pb-0">

<div className="row">
    <div className="col-sm-6 ">
      <div className="m-2 mt-0">
        <div className="heading text-end pe-2">
          الوقت والتاريخ
        </div>
        <hr className="hr m-0 p-2" />
        <div className="container time  rounded p-1 mb-4 align-items-right ">
<BsCalendar4 color='var(--primary)' className='ms-4'/>       
     
{report.timestamp}   </div>
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
     <textarea className="notes p-2" id=""  rows="3" defaultValue={report.notes} onChange={updatetext}/> 
  

      </div>
    </div>
    <div className="col-sm-6">
      <div className="m-2 mt-">
        <div className="heading text-end pe-2">
          حالة البلاغ
        </div>
        <hr className="hr m-0 p-2" />
        <div className="container status rounded p-1  d-flex justify-content-center mb-4">
        <div className={"report-status-container " + report.status}>
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
        </div>
        <div className="heading text-end pe-2">
          موقع المخالفة
        </div>
        <hr className="hr m-0 p-2" />
        <div className="container loc rounded shadow-sm p-0 mb-5">
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
            <Button variant="secondary" size="lg" className="edit justify-content-between" onClick={Save}>  
            <FiSave/>   &nbsp;
            حفظ

              </Button>
            </div>
            <div className="col-6">
              <Button variant="secondary" size="lg" className="cancel btn" onClick={Save}>  إلغاء </Button>
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
        <ReportDetails report={report} />
      )}
    </>
  );
}

export default EditReport;

