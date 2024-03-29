import "./ReportDetails.css";
import { FiSave } from "react-icons/fi";
import Waste2 from "../../assets/images/waste2.jpeg";
import Button from "react-bootstrap/Button";
import { BsCalendar4 } from "react-icons/bs";
import { useEffect } from "react";
import ReportsList from "./Reports_list";
import { useReportDContext } from "../../hooks/useReportDContext";
import { BsCheck } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import Modal from "react-bootstrap/Modal";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  MarkerF,
} from "@react-google-maps/api";
import React, { useState } from "react";
import ReportDetails from "../../views/Reports/ReportDetails";

function EditReport({ report }) {
  const { reportD, dispatch } = useReportDContext();
  const [note, setNotes] = useState(report.notes);
  const [index, setIndex] = useState(0);
  const [noteError, setNoteError] = useState("");
  const [Success2, setSuccess2] = useState(false);

  const [val1, setVal1] = useState(false);
  const updatetext = () => {

    if (note.length >= 120){
      setVal1(true);
      setNoteError("الحد الأعلى هو ١٢٠ حرف.");
    }  else {
      setNoteError("");
        setVal1(false);
      }
  };
  useEffect(() => {
    console.log(note + "j");
    updatetext();
  }, [note]);

  const rep = {
    notes: note,
  };

  const handleClose = () => {
    setSuccess2(false);
    setIndex(1);

  }; 
  const Save = async (e) => {
    const response = await fetch("/api/Report/" + report._id, {
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
 
  };
  const HandleSave = async (e) => {
    Save();
    setSuccess2(true);
   
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
                  <a className="pagenav h5 text-end pe-4" onClick={PageNav(2)}>
                    البلاغات
                  </a>
                  <p className="pagenav h5 text-end">&gt;&gt;</p>
                  <a class="pagenav h5 text-end" onClick={PageNav(1)}>
                    تفاصيل البلاغ
                  </a>
                  <p className="pagenav h5 text-end">&gt;&gt;</p>
                  <a class="pagenav h5 text-end colored">تحرير البلاغ</a>
                </div>

                <div className="pe-4" id="title">
                  {" "}
                  تحرير البلاغ
                </div>
              </div>
            </div>
            <div class="he shadow-sm ms-4 me-3 rounded-4 pb-0 mt-2">
              <div className="row">
                <div className="col-sm-6 ">
                  <div className="m-2 mt-0">
                  <div className="heading text-end pe-2"> المنطقة</div>
                    <hr className="hr m-0 p-2" />
                  <div className="container locName  ">
                      <h5>
                        {" "}
                        <SlLocationPin width={80} color="var(--primary)" className="ms-2" />
                        {report.region}
                      </h5>
                    </div>
                    <div className="heading text-end pe-2">موقع المخالفة</div>
                    <hr className="hr m-0 p-2" />
                    <div className="container loc rounded shadow-sm p-0 mb-4">
                      {isLoaded ? (
                        <GoogleMap
                          mapContainerStyle={containerStyle}
                          center={report.location}
                          zoom={11}
                          onLoad={onLoad}
                          onUnmount={onUnmount}
                        >
                          {" "}
                          <MarkerF position={report.location}></MarkerF>
                        </GoogleMap>
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <div className="heading text-end pe-2">الوقت والتاريخ</div>
                    <hr className="hr m-0 p-2" />
                    <div className="container time">
                      <h6>
                        <BsCalendar4 color="var(--primary)" className="ms-4" />
                        {Intl.DateTimeFormat("ar-EG", {
                          dateStyle: "full",
                        }).format(new Date(report.createdAt))}{" "}
                      </h6>{" "}
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
                    <div className="heading text-end pe-2">صورة المخالفة</div>
                    <hr className="hr m-0 p-2" />
                    <div className="container pic rounded mb-4 shadow-sm p-0">
                      {
                        <img src={"data:image/jpeg;base64,"+ report.image} />
                        // <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4
                        // //8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" />
                       // <img src={Waste2} alt="Waste" className="imagewaste" />
                      }
                    </div>
                    <div className="heading d-inline text-end pe-2">ملاحظات</div>
                    {val1 ? (
                          <span className="noteError  text-danger text-end  heading pe-2 "> {noteError}</span>
                        ) : (
                          <></>
                        )}
                    <hr className="hr m-0 p-2" />
                    <textarea
                      className="notes p-2"
                      id=""
                      rows="3"
                      // defaultValue={report.notes}
                      value={note}
                      maxlength="120"
                      pattern= "([A-z0-9\s]){0,120}"
                      onChange={ 
                        (event) => {
                        setNotes(event.target.value.replace(/[\/[\]<>]/g, ''));
                      }}
                    />
                    <div className="row"> </div>
                    <div className="container mt-0 pt-2">
                      <div className="row">
                        <div className="col-6">
                          <Button
                            variant="secondary"
                            size="lg"
                            className="save justify-content-between"
                          onClick={HandleSave}
                          >
                            <FiSave /> &nbsp; حفظ
                          </Button>
                        </div>
                        <div className="col-6">
                          <Button
                            variant="secondary"
                            size="lg"
                            className="cancel btn"
                            onClick={() => setIndex(1)}
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
          </div>
          <div>
          <Modal
            centered
            className="modal o1"
            show={Success2}
            onHide={handleClose}
          >
            <Modal.Body>
              {" "}
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
                  <div className="row align-items-center  justify-content-center">
                    <div className="row align-items-center justify-content-between ">
                      <div className="text-center  h4">
                        تم حفظ الملاحظات بنجاح !
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
              </div>
            </Modal.Body>
          </Modal>
         
          </div>
        </>
      ) : index == 1 ? (
        <ReportDetails repId={report._id} />
      ) : (
        <ReportsList />
      )}
    </>
  );
}

export default EditReport;
