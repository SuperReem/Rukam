import './ReportDetails.css';
import { FiSave } from "react-icons/fi";
import Waste2 from '../../assets/images/waste2.jpeg';
import Button from "react-bootstrap/Button"
import { BsCalendar4 } from "react-icons/bs";
import { useEffect } from "react";
import ReportsList from "./Reports_list";
import { useReportDContext } from "../../hooks/useReportDContext";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  MarkerF,
} from "@react-google-maps/api";
import React, { useState } from "react";
import ReportDetails from "../../views/Reports/ReportDetails";



function EditReport({report}) {
  const { reportD, dispatch } = useReportDContext();
  const [note, setNotes] = useState(report.notes);
  const [index, setIndex] = useState(0);


  const updatetext = event => {
  setNotes(event.target.value);
  }
  useEffect(() => {
  
    console.log(note +'j');
  }, [note]);

  const rep = {

    notes:note,

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
        dispatch({ type: "UPDATE_DETAILS", payload: json });
        console.log("new report not added:");
        console.log(rep.notes);
      }
      if (response.ok) {
        console.log("new report added:", json);
      }
      console.log(report._id);
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

    const PageNav = (i) => () => {
      setIndex(i);
    };
    
  return (
    <>
    {index == 0 ? (
      <>
      <div className="App">
            <div className="row">
              <div className="col-sm-12">
                <div className="pageNavigation">
                  <a class="pagenav h5 text-end" onClick={PageNav(2)}>
                    {" "}
                    البلاغات{" "}
                  </a>
                  <a></a>
                  <a class="pagenav h5 text-end" onClick={PageNav(1)} >تفاصيل البلاغ </a>
                  <a></a>
                  <a class="pagenav h5 text-end">تحرير البلاغ</a>
                </div>
                <div id="title"> تحرير البلاغ</div>
              </div>
            </div>
        <div class="he shadow-sm ms-4 me-3 rounded-4 pb-0 mt-2">

<div className="row">
    <div className="col-sm-6 ">
      <div className="m-2 mt-0">
        <div className="heading text-end pe-2">
          الوقت والتاريخ
        </div>
        <hr className="hr m-0 p-2" />
        <div className="container time">
<h6><BsCalendar4 color='var(--primary)' className='ms-4'/>       
     
{   Intl.DateTimeFormat("ar-EG", {
                                dateStyle: "full",
                              }).format(new Date(report.createdAt))} </h6> </div>
        <div className="heading text-end pe-2">
          صور المخالفة
        </div>
        <hr className="hr m-0 p-2" />
        <div className="container pic rounded mb-4 shadow-sm p-0">
        { 
        //<img src={"data:image/jpeg;base64,"+ report.image} /> 
              // <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4
              // //8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" />
              <img src={Waste2} alt="Waste" className='imagewaste'/>
            }
        </div>
        <div className="heading text-end pe-2">
          ملاحظات
        </div>
        <hr className="hr m-0 p-2" />
     <textarea className="notes p-2" id=""  rows="3" defaultValue={report.notes} onChange={updatetext}/> 
  

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
              <Button variant="secondary" size="lg" className="cancel btn" onClick={()=>setIndex(1)}>  إلغاء </Button>
            </div>
            </div>
        </div>
      </div>
    </div>

  </div>
</div>
    </div>
    </>
      ) :index == 1? (
        <ReportDetails repId={report._id} />
      ):  <ReportsList/>}
    </>
  );
}

export default EditReport;

