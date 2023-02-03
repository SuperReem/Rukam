import "./ReportDetails.css";
import { FiSave } from "react-icons/fi";
import Waste2 from "../../assets/images/waste2.jpeg";
import Button from "react-bootstrap/Button";
import { BsCalendar4 } from "react-icons/bs";
import { useEffect } from "react";
import ReportsList from "./Reports_list";
import { useReportDContext } from "../../hooks/useReportDContext";
import { BsCheck } from "react-icons/bs";
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

  const updatetext = (event) => {
    setNotes(event.target.value);
  };
  useEffect(() => {
    console.log(note + "j");
  }, [note]);

  const rep = {
    notes: note,
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
    setIndex(1);
  };
  const HandleSave = async (e) => {
    Save();
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
                    <div className="heading text-end pe-2">صورة المخالفة</div>
                    <hr className="hr m-0 p-2" />
                    <div className="container pic rounded mb-4 shadow-sm p-0">
                      {
                        //<img src={"data:image/jpeg;base64,"+ report.image} />
                        // <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4
                        // //8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" />
                        <img src={Waste2} alt="Waste" className="imagewaste" />
                      }
                    </div>
                    <div className="heading text-end pe-2">ملاحظات</div>
                    <hr className="hr m-0 p-2" />
                    <textarea
                      className="notes p-2"
                      id=""
                      rows="3"
                      defaultValue={report.notes}
                      onChange={updatetext}
                    />
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
                    <div className="container loc rounded shadow-sm p-0 mb-5">
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
                            data-bs-toggle="modal"
                            data-bs-target="#myModal-success"
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
                            تم حفظ البلاغ بنجاح !
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
                      onClick={HandleSave}
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
        <ReportDetails repId={report._id} />
      ) : (
        <ReportsList />
      )}
    </>
  );
}

export default EditReport;
