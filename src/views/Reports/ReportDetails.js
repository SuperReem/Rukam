import "./ReportDetails.css";
import { useEffect } from "react";
import React, { useState } from "react";
import Waste2 from "../../assets/images/waste2.jpeg";
import Button from "react-bootstrap/Button";
import { BsCalendar4 } from "react-icons/bs";
import EditReport from "../../views/Reports/EditReport";
import { useReportDContext } from "../../hooks/useReportDContext";
import { BsCheck } from "react-icons/bs";
import { MdOutlineModeEditOutline } from "react-icons/md";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  MarkerF,
} from "@react-google-maps/api";
import ReportsList from "./Reports_list";

function ReportDetails({ repId }) {
  const [index, setIndex] = useState(0);
  const { dispatch } = useReportDContext();
  const [timestamp, setTimestamp] = useState("");
  const [rep, setReport] = useState();
  const [status, setStatus] = useState("");
  const [image, setimage] = useState("");
  const [notes, setNotes] = useState("");
  const [location, setLocation] = useState("");
  const [disable, setDisable] = useState(true);

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
          console.log(repId);
        }
        if (response.ok) {
          dispatch({ type: "GET_DETAILS", payload: report });
          setReport(report);
          setimage(report.image);
          setNotes(report.notes);
          setLocation(report.location);
          setTimestamp(Intl.DateTimeFormat("ar-EG", {
            dateStyle: "full",
          }).format(new Date(report.createdAt)));
          setStatus(report.status);
          console.log("get:", report);
          if(report.status === "unsent"){
            setDisable(false);
            console.log(disable);
          }
        }
    };
    fetchReport();
  }, [ ]);

  const Send = async (e) => {
    const rep = {
      status: "pending",
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
      const repU = await response.json();
  
      if (!response.ok) {
       
        console.log("new report not added:");
      }
      if (response.ok) {
        dispatch({ type: "UPDATE_DETAILS", payload: repU });
        console.log("updated:", repU);
        console.log(status +'k');
        setStatus(repU.status);
        setDisable(true);
      }
    
  
  };

  const Edit = async (e) => {
    setIndex(1);
  };
  const PageNav = async (e) => {
    setIndex(2);
  };
  





//location
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










  return (
    <>
      {index == 0 ? (
        <>
          <div className="App">
            <div className="row">
              <div className="col-sm-12">
                <div className="pageNavigation">
                  <a className="pagenav h5 text-end pe-4" onClick={PageNav}>البلاغات</a>
                  <p className="pagenav h5 text-end">&gt;&gt;</p>
                  <a class="pagenav h5 text-end colored">تفاصيل البلاغ</a>
                </div>
                <div className="pe-4" id="title"> تفاصيل البلاغ</div>
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
                      <div className="container time  ">
                      <h6>   <BsCalendar4 color="var(--primary)" className="ms-4" />
                      {  timestamp}
                    </h6>
                      </div>
                      <div className="heading text-end pe-2">صور المخالفة</div>
                      <hr className="hr m-0 p-2" />
                      <div className="container pic rounded mb-4 shadow-sm p-0">
                      { 
                      //<img src={"data:image/jpeg;base64,"+ image} /> 
              // <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4
              // //8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" />
              <img src={Waste2} alt="Waste" className='imagewaste'/>
            }
                      </div>
                      <div className="heading text-end pe-2">ملاحظات</div>
                      <hr className="hr m-0 p-2" />
                      <div className="ps-5 ms-5 justify-content-end">
                      <p className="h6 ps-5">{notes}</p> 
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="m-2 mt-0">
                    <div className="heading text-end pe-2">حالة البلاغ</div>
              <hr className="hr m-0 p-2" />
          <div className={"reportstatus-container " +status}>
                <h6>
                  {status == "unsent"
                    ? "غير مرسل"
                    : status == "pending"
                    ? "قيد الإنتظار"
                    : status == "under_processing"
                    ? "قيد المراجعة"
                    : "مغلق"}
                </h6>
              </div>
                      <div className="heading text-end pe-2">موقع المخالفة</div>
                      <hr className="hr m-0 p-2" />
                      <div className="container loc rounded mb-5 shadow-sm p-0">
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
                              className="edit justify-content-between"
                              onClick={Edit}
                            >
                              <MdOutlineModeEditOutline color="white" /> &nbsp;
                              تحرير
                            </Button>
                          </div>
                          <div className="col-6">
                            <Button
                              variant="secondary"
                              size="lg"
                              className="send btn"
                              data-bs-toggle="modal"
                      data-bs-target="#myModal"
                              disabled={disable}
                            >
                              {" "}
                              إرسال البلاغ
                            </Button>
                          </div>
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
                    <h4 className=" m-0 h3" >إرسال البلاغ   </h4>
                  </div>
                  <div className="col-2">
                    <button
                      data-bs-dismiss="modal"
                      className="closebtn btn rounded" >
                      &#x2715;
                    </button>
                  </div>
                </div>
                <div className="modal-body justify-content-center">
                  <div className="row align-items-center  justify-content-center">
                    <div className="row align-items-center justify-content-center  h5">
                    هل انت متأكد من إرسال البلاغ؟
                    </div>
                    <div className="row justify-content-start align-items-start">
                      <div className="col-8 h5">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
              </div>
              <div className="modal-footer border border-0 justify-content-evenly">
              <Button
                  variant="secondary"
                  size="md"
                  className="popup4 btn "
                  onClick={Send}
                  data-bs-toggle="modal"
                  data-bs-target="#myModal-success">
              إرسال البلاغ
              </Button>
              <Button
                  variant="secondary"
                  size="md"
                  className="popup btn "
                  data-bs-dismiss="modal">
إلغاء
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>





      <div>
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
                <div className="modal-body justify-content-center ">
                  <div className="row align-items-center  justify-content-center ">
                    <div className="row align-items-center justify-content-between ">
                      <div className="text-center  h4">
                        تم إرسال البلاغ بنجاح !
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
                >
                  {" "}
                  حسنًا{" "}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
      ) : index == 1 ? (
        <EditReport report={rep} />
      ) : (
        <ReportsList />
      )}
    </>
  );
}

export default ReportDetails;
