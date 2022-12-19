import React, { useState } from "react";
import Logo from '../../assets/images/Logo_Dark.png';
import './SideNavbar.css';
import Dashboard from "../Dashboard/Dashboard";
//import DroneList from "../Drones/Drones_list";
import AddDrone from "../Drones/Add_Drone";
//import DroneDetails from "../Drones/Drone_Details";
import ReportsList from "../Reports/Reports_list";
import DetectionList from "../Detections/Detection_list";

const Sidebar = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  return <div id="main-container">
    <div className="sideNav-container">
      <div className="nav-sub-container">
          <div className="nav-upper">
              <div className="nav-logo">
                  <img src={Logo} alt='Rukam Logo' height={50}></img>
              </div>
          </div>
          <div className="nav-list-container">
            <ul className="nav-list">
              <li onClick={()=>setCurrentIndex(0)}>الرئيسية</li>
              <li onClick={()=>setCurrentIndex(1)}>البلاغات</li>
              <li onClick={()=>setCurrentIndex(2)}>المواقع المخالفة</li>
              <li onClick={()=>setCurrentIndex(3)}>قائمة الدرونز</li>
            </ul>
          </div>
      </div>
    </div>
    <main className="page-container">
      <div className="background fs-1">
         {currentIndex === 0? <Dashboard/> : currentIndex === 1? <ReportsList/> : currentIndex === 2? <DetectionList/> : <AddDrone/>}
      </div>
    </main>
  </div>
}

export default Sidebar;