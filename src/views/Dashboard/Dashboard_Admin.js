import React, { useState } from "react";
import "./dashboard.css";
import "reactochart/styles.css";
import { XYPlot, XAxis, YAxis, LineChart, PieChart } from "reactochart";
import {GoogleMap,Marker,useJsApiLoader,MarkerF,} from "@react-google-maps/api";
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
import { Loader } from "@googlemaps/js-api-loader"

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
  const[unsentTotal,setUnsentTotal] = useState(0);
  const[pendingTotal,setPendingTotal] = useState(0);
  const[underprocessingTotal,setUnderprocessingTotal] = useState(0);
  const[closedTotal,setClosedTotal] = useState(0);
  var closed = 0;
  var pending = 0;
  var unsent = 0;
  var proc = 0;
  const[doneCounting,setDoneCounting] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [dateStart, setDateStart] = useState("All");
  const [dateEnd, setDateEnd] = useState("All");
  
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: 'AIzaSyBUMSPnho9iIVnF-MKvOMgYw_bRBwc7U7Q' ,
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
 
      const response = fetch(
        `http://localhost:3000/api/Report/report?page=${pageNumber}&start=${dateStart}&end=${dateEnd}`
      )
        .then((response) => response.json())
        .then(async ({ totalPages, reports }) => {
          await dispatch({ type: "SET_REPORTS", payload: reports })
          console.log("Reports: "+reports)
          reports.map((report) => {
            console.log("Report: "+report)
         });
   
        })
    

  }, [dispatch]);

  
   
    var jh = () =>{
      /*
      switch(report['status']){
        case 'unsent': unsent++;
        break;
        case 'pending': pending++;
        break;
        case 'under_processing': proc++;
        break;
        case 'closed': closed++;
        break;
       }
       */
          reports.map((reports) => {
            switch(reports['status']){
             case 'unsent': setUnsentTotal(unsentTotal++);
             break;
             case 'pending': setPendingTotal(pendingTotal++);
             break;
             case 'under_processing': setUnderprocessingTotal(underprocessingTotal++);
             break;
             case 'closed': setClosedTotal(closedTotal++);
             break;
            }
         }
       );
       setDoneCounting(true);
          
  }



    var jj = ()=>{
     
     reports.map((reports) => {
          switch(reports['status']){
           case 'unsent': setUnsentTotal(unsentTotal++);
           break;
           case 'pending': setPendingTotal(pendingTotal++);
           break;
           case 'under_processing': setUnderprocessingTotal(underprocessingTotal++);
           break;
           case 'closed': setClosedTotal(closedTotal++);
           break;
          }
       }
     );
     setDoneCounting(true);
     
    }

    

  const ReportsChart = (props) => (
    <PieChart data={[closedTotal, unsentTotal, pendingTotal, underprocessingTotal]} radius={60} holeRadius={45} margin={40} />
  );


  return (
    <>
    {reports?
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
                <p className="statistics-cards-number mb-0">حطين</p>
                <p className="fs-6">200 مخالفة</p>
              </div>
            </div>
          </div>
          <div style={{ width: "22%", height: "100%" }}>
            <Statistics_Card
              type={1}
              title={"عدد مخالفات هذا الأسبوع"}
              number={132}
            />
          </div>
          <div style={{ width: "22%", height: "100%" }}>
            <Statistics_Card
              type={2}
              title={"عدد بلاغات هذا الأسبوع"}
              number={182}
            />
          </div>
          <div style={{ width: "22%", height: "100%" }}>
            <Statistics_Card
              type={3}
              title={"عدد الدرونز المفعلة"}
              number={6}
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
              {
                doneCounting == true? 
                <PieChart data={[closed, unsent, pending, proc]} radius={60} holeRadius={45} margin={40} />
                :
                null
              }
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
                <ListGroup.Item>
                  <div className="active-drone-row d-flex justify-content-between p-2">
                    <div className="d-flex">
                      <img
                        src={DroneIcon}
                        className="active-drone-icon ms-5"
                      ></img>
                      <div>
                        <Row className="active-drones-drone-name">Drone76</Row>
                        <Row className="active-drones-region-name">
                          منطقة الندى
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
                      <Button variant="secondary" size="sm" id="details-button">
                        <BsArrowUpLeft /> التفاصيل
                      </Button>
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="active-drone-row d-flex justify-content-between p-2">
                    <div className="d-flex">
                      <img
                        src={DroneIcon}
                        className="active-drone-icon ms-5"
                      ></img>
                      <div>
                        <Row className="active-drones-drone-name">Drone76</Row>
                        <Row className="active-drones-region-name">
                          منطقة الندى
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
                      <Button variant="secondary" size="sm" id="details-button">
                        <BsArrowUpLeft /> التفاصيل
                      </Button>
                    </div>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        </div>
      </div>
    </>
    :
    null
    }
    </>
  );
};
export default Dashboard_Admin;
