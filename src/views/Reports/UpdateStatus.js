import { render } from "@testing-library/react";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import MultiStepProgressBar from "../../components/MultiStepProgressBar.js";
import "./ReportDetails.css";
import Waste from "../../assets/images/waste.png";
import { useEffect } from "react";
import { BsCalendar4 } from "react-icons/bs";
import ReportsList from "./Reports_list";
import { useReportDContext } from "../../hooks/useReportDContext";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  MarkerF,
} from "@react-google-maps/api";

function UpdateStatus({repId,repStat}) {
  const { dispatch } = useReportDContext();
  const [index, setIndex] = useState(0);
  const [timestamp, setTimestamp] = useState("");
  const [status, setStatus] = useState(repStat);
  const [image, setimage] = useState("");
  const [notes, setNotes] = useState("");
  const [location, setLocation] = useState("");


  useEffect(() => {
  
    
    const fetchReport = async () => {
      const response = await fetch(
        "/api/Report/" + repId ,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const report = await response.json();
  
        if (!response.ok) {
          
          console.log("wrong");
        }
        if (response.ok) {
          setimage(report.image);
          setNotes(report.notes);
          setLocation(report.location);
          setTimestamp(report.timestamp);
          setStatus(report.status);
          dispatch({ type: "GET_DETAILS", payload: report });
          

          console.log("get:", report);
        }
    };

    fetchReport();
  }, [ ]);

  

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
  
  
  const [currentState, setCurrentState] = useState(
    "?????????? ???????????? ?????? ?????? ???????????????? "
  );



//update status in database
useEffect(() => {
  if (status == "closed" && currentState == "?????????? ???????????? ?????? ????????") {
    setCurrentState("???????? ?????????? ????????");

  }
  updatestatus();
  console.log("change");

}, [status]);



  const updatestatus = async (e) => {
    
    const rep = {

      status: status,
    
    };

    const response = await fetch(
      "/api/Report/" + repId ,
      {
        method: "PATCH",
        body: JSON.stringify(rep),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
  
      if (!response.ok) {

        console.log("not up:");
        console.log(rep.notes);
      }
      if (response.ok) {
        dispatch({ type: "UPDATE_DETAILS", payload: json });
        console.log("updated:", json);
        console.log(status +'k');
      }
    
  
  };







  const check = () => {
  
  };
  const update = () => {
    if ( status === "pending"){
      setStatus("under_processing");
      console.log('jnj');
      setCurrentState("?????????? ???????????? ?????? ????????");

 
    }
   
    
    if (status === "under_processing") {
      setStatus("closed");
      setCurrentState("???????? ?????????? ????????");
    
     

    }
   
    if (status == "closed") console.log("dhbfh");

   
  }
  const PageNav = async (e) => {
    setIndex(1);
  };

  return (
    <>
      {index == 0 ? (
        <>
          <div className="App">
            <div className="row">
              <div className="col-sm-12">
                <div className="pageNavigation">
                  <a class="pagenav h5 text-end" onClick={PageNav}>
                    {" "}
                    ????????????????{" "}
                  </a>
                  <a></a>
                  <a class="pagenav h5 text-end">???????????? ????????????</a>
                </div>
                <div id="title"> ???????????? ????????????</div>
              </div>
            </div>
      <div class="he shadow-sm ms-4 me-3 rounded-4 pb-0">
        <div className="row">
          <div className="col-sm-6 ">
            <div className="m-2 mt-0">
              <div className="heading text-end pe-2">?????????? ????????????????</div>
              <hr className="hr m-0 p-2" />
              <div className="container time  rounded p-1 mb-4 align-items-right ">
                <BsCalendar4 color="var(--primary)" className="ms-4" />
                {timestamp   }           </div>
              <div className="heading text-end pe-2">?????? ????????????????</div>
              <hr className="hr m-0 p-2" />
              <div className="container pic rounded mb-4 shadow-sm">
              { <img src={"data:image/jpeg;base64,"+ image} /> 
              // <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4
              // //8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" />
            }
              </div>
              <div className="heading text-end pe-2">??????????????</div>
              <hr className="hr m-0 p-2" />
              <div className="ps-5 ms-5 justify-content-end">
                <p className="h6 ps-5">
              {notes}
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="m-2 mt-0">
              <div className="heading text-end pe-2">???????? ????????????</div>
              <hr className="hr m-0 p-2" />
              <div className={"reportstatus-container " + status}>
                <h6>
                  {status == "unsent"
                    ? "?????? ????????"
                    : status == "pending"
                    ? "?????? ????????????????"
                    : status == "under_processing"
                    ? "?????? ????????????????"
                    : "????????"}
                </h6>
              </div>
              <div className="heading text-end pe-2">???????? ????????????????</div>
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
                      ?????????? ???????? ????????????
                    </Button>
                  </div>
                  <div className="col-6">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="cancel btn"
                      onClick={()=> setIndex(1)}
                    >
                      {" "}
                      ??????????{" "}
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
                    <h4 className=" m-0">?????????? ????????????</h4>
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
                      <MultiStepProgressBar currentStep={status} />
                    </div>
                    <div className="row align-items-center justify-content-between pb-4 me-4 pt-2">
                      <div className="col-3 align-items-center h6">
                        ?????? ????????????????
                      </div>
                      <div className="col-3 h6">?????? ????????????????</div>
                      <div className="col-3 h6">????????</div>
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
                  ?????????? ????????????
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
      )  : (
        <ReportsList />
      )}
    </>
  );
}

export default UpdateStatus;
