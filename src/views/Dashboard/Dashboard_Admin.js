import React, { useState } from "react";
import "./dashboard.css";
import "reactochart/styles.css";
import { XYPlot, XAxis, YAxis, LineChart, PieChart } from "reactochart";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
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
import { BsCheck } from "react-icons/bs";
import EditDrone from "../../views/Drones/Edit_Drone";
import Geocode from "react-geocode";

const containerStyle = {
  width: "650px",
  height: "210px",
  borderRadius: "10px",
  boxShadow: "1px 1px 15px 1px #ebebeb",
};
const containerStyle2 = {
  width: "380px",
  height: "210px",
  borderRadius: "10px",
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

  const [doneCounting, setDoneCounting] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [dateStart, setDateStart] = useState("All");
  const [dateEnd, setDateEnd] = useState("All");
  const [refresh, setRefresh] = useState();
  const [allActive, setAllActive] = useState();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBUMSPnho9iIVnF-MKvOMgYw_bRBwc7U7Q",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  Geocode.setLanguage("ar");
  Geocode.setApiKey("AIzaSyBUMSPnho9iIVnF-MKvOMgYw_bRBwc7U7Q");

  useEffect(() => {
    Geocode.fromLatLng("24.4733131", "46.2995045").then(
      (response) => {
        const address = response.results[0].formatted_address;
        console.log(address.split("،")[1]);
        setRefresh(address);
      },
      (error) => {
        console.error(error);
      }
    );
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
        setAllActive(active.drones);
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
  const [index, setIndex] = useState(0);
  const [droneId, setDrone] = useState();
  const DeleteDrone = async (Id) => {
    const response = await fetch("/api/Drone/" + Id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      console.log("Deleted", json);
    }
  };
  const ulur = { lat: 24.455097, lng: 46.29898 };

  return (
    <>
      {index == 0 ? (
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
                  zoom={11}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                >
                  {allActive &&
                    allActive.map((Drone) => (
                      <MarkerF position={Drone.currentLocation}> </MarkerF>
                    ))}
                </GoogleMap>
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
                      underprocessingTotal,
                      unsentTotal,
                      pendingTotal,
                      closedTotal,
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
                <h5 className="active-drones-title">أحدث الدرونز المفعلة</h5>
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
                                data-bs-toggle="modal"
                                data-bs-target={"#myModal-current" + Drone._id}
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
                                <div className="modal-content">
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
                                        <div className="col-6 px-5">
                                          <img
                                            src={droneImg}
                                            class=" bg-white  mx-auto  biggerImg img-circle rounded-circle"
                                            alt="Drone"
                                          />
                                        </div>
                                        <div className="row p-2  text-center">
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
                                            mapContainerStyle={containerStyle2}
                                            center={center}
                                            zoom={12}
                                            onLoad={onLoad}
                                            onUnmount={onUnmount}
                                          >
                                            {Drone.visitedLocations &&
                                              Drone.visitedLocations.map(
                                                (location) => (
                                                  <MarkerF
                                                    position={location}
                                                  ></MarkerF>
                                                )
                                              )}
                                          </GoogleMap>
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
                                      onClick={() => {
                                        setDrone(Drone);
                                        setIndex(1);
                                      }}
                                    >
                                      <MdOutlineEdit />
                                      تحرير
                                    </Button>

                                    <Button
                                      variant="secondary"
                                      size="md"
                                      id="delete-report-button"
                                      data-bs-toggle="modal"
                                      data-bs-target={"#myModaldel" + Drone._id}
                                      className="btn btn-primary my-2  px-4 deleteD"
                                    >
                                      <BsTrash color="white" />
                                      حذف
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <div
                                key={Drone.id}
                                className="modal"
                                id={"myModaldel" + Drone._id}
                              >
                                <div className="modal-dialog modal-dialog-centered">
                                  <div className="modal-content">
                                    <div className="">
                                      <div className="row align-items-center  justify-content-end pt-2">
                                        <div className="col-6 p-0 ">
                                          <h4 className="h3 m-0 ">
                                            حذف الدرون
                                          </h4>
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
                                          <div className="row align-items-center justify-content-center   h5">
                                            هل أنت متأكد من حذف هذا الدرون؟
                                          </div>
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
                                        onClick={() => DeleteDrone(Drone._id)}
                                        className="popup3 btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#myModal-success"
                                      >
                                        {" "}
                                        حذف{" "}
                                      </Button>
                                      <Button
                                        variant="secondary"
                                        size="md"
                                        className="popup-cancle"
                                        data-bs-dismiss="modal"
                                      >
                                        {" "}
                                        إلغاء{" "}
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
                                      <div className="modal-body justify-content-center">
                                        <div className="row align-items-center  justify-content-center">
                                          <div className="row align-items-center justify-content-between">
                                            <div className="text-center  h4">
                                              تم حذف الدرون بنجاح !
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
                          </div>
                          <div
                            key={Drone._id}
                            className="modal"
                            id={"myModal-current" + Drone._id}
                          >
                            <div className="modal-dialog modal-dialog-centered">
                              <div className="modal-content">
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
                                      <div className="col-6 px-5">
                                        <img
                                          src={droneImg}
                                          class=" bg-white  mx-auto  biggerImg img-circle rounded-circle"
                                          alt="Drone"
                                        />
                                      </div>
                                      <div className="row p-2  text-center">
                                        <div className=" h3 heading">
                                          موقع {Drone.droneName} الحالي
                                        </div>
                                        <div className=" h5 heading"></div>
                                      </div>

                                      <div class="row">
                                        <h6 class="h6 text-end px-5 heading"></h6>
                                      </div>

                                      {isLoaded ? (
                                        <GoogleMap
                                          mapContainerStyle={containerStyle2}
                                          center={Drone.currentLocation}
                                          zoom={12}
                                          onLoad={onLoad}
                                          onUnmount={onUnmount}
                                        >
                                          <MarkerF
                                            position={Drone.currentLocation}
                                          ></MarkerF>{" "}
                                        </GoogleMap>
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

                                <div className="modal-footer border border-0 justify-content-evenly"></div>
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
      ) : (
        <>
          <EditDrone droId={droneId._id} />
        </>
      )}
    </>
  );
};
export default Dashboard_Admin;
