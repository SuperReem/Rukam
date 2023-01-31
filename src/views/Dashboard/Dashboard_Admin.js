import React, { useState } from "react";
import "./dashboard.css";
import "reactochart/styles.css";
import { XYPlot, XAxis, YAxis, LineChart, PieChart } from "reactochart";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  MarkerF,
} from "@react-google-maps/api";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DroneIcon from "../../assets/images/DRONE_ICON.png";
import { SlLocationPin } from "react-icons/sl";
import { BsArrowUpLeft } from "react-icons/bs";
import Statistics_Card from "../../components/Statistics/Statistic_card";
import { useEffect } from "react";
import { useDetectionsContext } from "../../hooks/useDetectionsContext";
import { useReportContext } from "../../hooks/useReportContext";
import { Loader } from "@googlemaps/js-api-loader";
import { ArabicNumbers } from "react-native-arabic-numbers";
import droneImg from "../../assets/images/Drone.png";
import { MdOutlineEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
const containerStyle = {
  width: "650px",
  height: "210px",
  borderRadius: "10px",
  boxShadow: "1px 1px 15px 1px #ebebeb",
};

const center = {
  lat: 24.72,
  lng: 46.62,
};

const Dashboard_Admin = () => {
  const { reports, dispatch } = useReportContext();
  var [unsentTotal, setUnsentTotal] = useState(0);
  var [pendingTotal, setPendingTotal] = useState(0);
  var [underprocessingTotal, setUnderprocessingTotal] = useState(0);
  var [closedTotal, setClosedTotal] = useState(0);
  var [highestRegion, sethighestRegion] = useState("");
  var [detectionWeek, setdetectionWeek] = useState(0);
  var [reportWeek, setreportWeek] = useState(0);
  var [activeDrones, setactiveDrones] = useState(0);
  var [activeDronesList, setactiveDronesList] = useState();

  var [highestDetections, sethighestDetections] = useState(0);

  var closed = 0;
  var pending = 0;
  var unsent = 0;
  var proc = 0;
  const [doneCounting, setDoneCounting] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [dateStart, setDateStart] = useState("All");
  const [dateEnd, setDateEnd] = useState("All");
  const [refresh, setRefresh] = useState(false);

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
  useEffect(() => {
    const fetchDetectionsWeek = async () => {
      const response = await fetch("/api/Detection/week", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const week = await response.json();
      if (!response.ok) {
        console.log("wrong");
      }
      if (response.ok) {
        setdetectionWeek(week.total);
        console.log(week.total);
        console.log(week.firstday);
        console.log(week.lastday);
      }
    };
    const fetchReportsWeek = async () => {
      const response = await fetch("/api/Report/week", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const week = await response.json();
      if (!response.ok) {
        console.log("wrong");
      }
      if (response.ok) {
        setreportWeek(week.total);
        console.log(week.total);
        console.log(week.firstday);
        console.log(week.lastday);
      }
    };
    const fetchHighest = async () => {
      const response = await fetch("/api/Detection/highest", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const highest = await response.json();
      if (!response.ok) {
        console.log("wrong");
      }
      if (response.ok) {
        console.log(new Date().toISOString());

        sethighestDetections(highest.detections[0].count);
        sethighestRegion(highest.detections[0]._id);
      }
    };

    const fetchActive = async () => {
      const response = await fetch("/api/Drone/active", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const active = await response.json();
      if (!response.ok) {
        console.log("wrong");
      }
      if (response.ok) {
        setactiveDrones(active.total);
      }
    };
    const fetchActiveList = async () => {
      const response = await fetch("/api/Drone/activeList", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const active = await response.json();
      if (!response.ok) {
        console.log("wrong");
      }
      if (response.ok) {
        setactiveDronesList(active);
      }
    };
    fetchActiveList();
    fetchActive();
    fetchHighest();
    fetchReportsWeek();
    fetchDetectionsWeek();
  }, []);

  useEffect(() => {
    var fetchReports = async () => {
      const response = await fetch(
        `http://localhost:3000/api/Report/report?page=${pageNumber}&start=${dateStart}&end=${dateEnd}`
      )
        .then((response) => response.json())
        .then(
          async ({
            totalPages,
            reports,
            totalClosed,
            totalPending,
            totalUnderproc,
            totalUnsent,
          }) => {
            await dispatch({ type: "SET_REPORTS", payload: reports });

            setUnsentTotal(totalUnsent);

            setPendingTotal(totalPending);

            setUnderprocessingTotal(totalUnderproc);

            setClosedTotal(totalClosed);
          }
        );
      console.log("unsent: " + unsentTotal);
      console.log("pending: " + pendingTotal);
      console.log("underproc: " + underprocessingTotal);
      console.log("closed: " + closedTotal);
    };

    fetchReports();
  }, [dispatch]);

  return (
    <>
      {reports ? (
        <>
          <div>
            <div className="statistics-cards-container">
              <div
                className="statistics-cards"
                style={{ width: "22%", height: "100%" }}
              >
                <p className="statistics-cards-title">المنطقة الأعلى مخالفات</p>
                <div className="d-flex">
                  <SlLocationPin className="statistics-cards-icon" />
                  <div>
                    <p className="statistics-cards-number mb-0">
                      {highestRegion}
                    </p>
                    <p className="fs-6">
                      {ArabicNumbers(highestDetections)} مخالفات
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ width: "22%", height: "100%" }}>
                <Statistics_Card
                  type={1}
                  title={"عدد مخالفات هذا الأسبوع"}
                  number={ArabicNumbers(detectionWeek)}
                />
              </div>
              <div style={{ width: "22%", height: "100%" }}>
                <Statistics_Card
                  type={2}
                  title={"عدد بلاغات هذا الأسبوع"}
                  number={ArabicNumbers(reportWeek)}
                />
              </div>
              <div style={{ width: "22%", height: "100%" }}>
                <Statistics_Card
                  type={3}
                  title={"عدد الدرونز المفعلة"}
                  number={ArabicNumbers(activeDrones)}
                />
              </div>
            </div>
            <div
              style={{
                padding: "1em 0.5em 0.1em 0.5em",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={2}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                ></GoogleMap>
              ) : (
                <div>Loading...</div>
              )}
              <div className="reports-statistics">
                <h5>البلاغات</h5>
                <hr className="mt-0"></hr>
                <div className="d-flex">
                  <div className="ms-4">
                    <div className="d-flex">
                      <div
                        className="reports-statistics-chart-keys ms-1"
                        id="unsent-key"
                      ></div>
                      <h6>بلاغات غير مرسلة</h6>
                    </div>
                    <div className="d-flex">
                      <div
                        className="reports-statistics-chart-keys ms-1"
                        id="pending-key"
                      ></div>
                      <h6>بلاغات قيد الانتظار</h6>
                    </div>
                    <div className="d-flex">
                      <div
                        className="reports-statistics-chart-keys ms-1"
                        id="underprocessing-key"
                      ></div>
                      <h6>بلاغات قيد المراجعة</h6>
                    </div>
                    <div className="d-flex">
                      <div
                        className="reports-statistics-chart-keys ms-1"
                        id="closed-key"
                      ></div>
                      <h6>بلاغات مغلقة</h6>
                    </div>
                  </div>

                  <PieChart
                    data={[
                      closedTotal,
                      unsentTotal,
                      pendingTotal,
                      underprocessingTotal,
                    ]}
                    radius={60}
                    holeRadius={45}
                    margin={40}
                  />
                </div>
              </div>
            </div>
            <div className="active-drones-container">
              <div className="d-flex justify-content-between pb-2">
                <h5 className="active-drones-title">الدرونز المفعلة</h5>
                <button id="show-all-button">عرض الكل</button>
              </div>
              <div className="active-drones-list-container">
                <div className="active-drones-list">
                  <ListGroup variant="flush" id="Active-Drones-ListGroup">
                    {activeDronesList &&
                      activeDronesList.map((Drone) => (
                        <ListGroup.Item>
                          <div className="active-drone-row d-flex justify-content-between p-2">
                            <div className="d-flex">
                              <img
                                src={DroneIcon}
                                className="active-drone-icon ms-5"
                              ></img>
                              <div>
                                <Row className="active-drones-drone-name">
                                  {Drone.droneName}
                                </Row>
                                <Row className="active-drones-region-name">
                                  {Drone.region}
                                </Row>
                              </div>
                            </div>
                            <div>
                              <Button
                                variant="secondary"
                                size="sm"
                                id="current-loc-button"
                                className="ms-3"
                              >
                                <SlLocationPin /> الموقع الحالي
                              </Button>
                              <Button
                                variant="secondary"
                                size="sm"
                                id="details-button"
                                data-bs-toggle="modal"
                                data-bs-target={"#myModal2" + Drone._id}
                              >
                                <BsArrowUpLeft /> التفاصيل
                              </Button>
                            </div>
                          </div>
                          <div>
                            <div
                              key={Drone._id}
                              className="modal"
                              id={"myModal2" + Drone._id}
                            >
                              <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content col-3">
                                  <div className="">
                                    <div className="row align-items-center  justify-content-end  pt-2 ">
                                      <div className="col-2">
                                        <button
                                          data-bs-dismiss="modal"
                                          className="closebtn btn rounded"
                                        >
                                          &#x2715;
                                        </button>
                                      </div>
                                    </div>

                                    <div className="modal-body justify-content-center p-0">
                                      <div className="row align-items-center  justify-content-center">
                                        <div className="col-6 p-0 ">
                                          <img
                                            src={droneImg}
                                            class="
       bg-white  mx-auto  biggerImg 
      img-circle rounded-circle
      
       
    
      "
                                            alt="Drone"
                                          />
                                        </div>
                                        <div className="row p-2">
                                          <div className=" h3 heading">
                                            {Drone.droneName}
                                          </div>
                                          <div className=" h5 heading">
                                            منطقة {Drone.region}
                                          </div>
                                        </div>

                                        <div class="row">
                                          <h6 class="h6 text-end px-5 heading">
                                            المواقع التي تمت زيارتها مسبقا
                                          </h6>
                                        </div>

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

                                        <div className="row justify-content-start align-items-start">
                                          <div className="col-8 h5"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div></div>

                                  <div className="modal-footer border border-0 justify-content-evenly">
                                    <Button
                                      variant="secondary"
                                      size="md"
                                      className="btn btn-primary my-2  px-3 classButton"
                                      data-bs-dismiss="modal"
                                    >
                                      <MdOutlineEdit />
                                      تحرير
                                    </Button>

                                    <Button
                                      variant="secondary"
                                      size="md"
                                      data-bs-dismiss="modal"
                                      className="btn btn-primary my-2  px-4 deleteD"
                                      // data-target="#myModal3"
                                    >
                                      <BsTrash color="white" />
                                      حذف
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
export default Dashboard_Admin;
