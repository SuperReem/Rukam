import React, { useState } from "react";
import Logo from "../../assets/images/Logo_Dark.png";
import "./SideNavbar.css";
import Dashboard_Admin from "../Dashboard/Dashboard_Admin";
import Dashboard_Employee from "../Dashboard/Dashboard_Employee";
import DroneList from "../Drones/Drones_list";
import ReportsList from "../Reports/Reports_list";
import DetectionList from "../Detections/Detection_list";
import { RiHome6Line } from "react-icons/ri";
import { TbReportAnalytics, TbDrone } from "react-icons/tb";
import { HiOutlineLogout } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import { useContext } from "react";
import ReportDetails from "../Reports/ReportDetails";
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom'
import { Navigate, Outlet, useLocation } from "react-router-dom";
 



const Sidebar = () => {
  console.log("admin sidebar")

  const [currentIndex, setCurrentIndex] = useState(0);


  const { user } = useAuthContext()
  console.log(user)


  const location = useLocation();
  const redirectLoginUrl = `/login?redirectTo=${encodeURI(location.pathname)}`;
 
  
  const { logout } = useLogout()

  const onLogOut = () => {
    logout()
  }


  return (
    !user ? <Navigate to={redirectLoginUrl} /> : 
    <div id="main-container">
      <div className="sideNav-container">
        <div className="nav-sub-container">
          <div className="nav-upper">
            <div className="nav-logo">
              <img src={Logo} alt="Rukam Logo" height={50}></img>
            </div>
          </div>
          {/* // */}
      
          <div className="nav-list-container">
            <ul className="nav-list">
              <li onClick={() => setCurrentIndex(0)}>
                <RiHome6Line className="sidenav-icons" /> الرئيسية
              </li>
              <li onClick={() => setCurrentIndex(1)}>
                <TbReportAnalytics className="sidenav-icons" /> البلاغات
              </li>
              <li onClick={() => setCurrentIndex(2)}>
                <SlLocationPin className="sidenav-icons" /> المواقع المخالفة
              </li>
              <li onClick={() => setCurrentIndex(3)}>
                <TbDrone className="sidenav-icons" /> قائمة الدرونز
              </li>
              <br></br>
              <br></br>
            
              <br></br>
              <br></br>

              <h5 className="fullName  ms-2 border-bottom ">{user.fullName}   </h5>
              <li onClick={onLogOut}>
                <HiOutlineLogout className="sidenav-icons" />
                تسجيل الخروج
              </li>
            </ul>
          </div>
          <div></div>
        </div>
      </div>
      <main className="page-container">
        <div className="background fs-1">
          {currentIndex === 0 ? (
            <Dashboard_Admin />
          ) : currentIndex === 1 ? (
            <ReportsList />
          ) : currentIndex === 2 ? (
            <DetectionList />
          ) : (
            <DroneList />
          )}
        </div>
        <div id="footer-copy-right">
          جميع الحقوق محفوظة لــركام &copy; {new Date().getFullYear()}
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
