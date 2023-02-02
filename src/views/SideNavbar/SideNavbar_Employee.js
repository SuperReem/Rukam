import React, { useState } from "react";
import Logo from "../../assets/images/Logo_Dark.png";
import "./SideNavbar.css";
import Dashboard_Admin from "../Dashboard/Dashboard_Admin";
import Dashboard_Employee from "../Dashboard/Dashboard_Employee";
import DroneList from "../Drones/Drones_list";
import ReportsListEmployee from "../Reports/Report_list_Employee";
import DetectionList from "../Detections/Detection_list";
import { RiHome6Line } from "react-icons/ri";
import { TbReportAnalytics, TbDrone } from "react-icons/tb";
import { HiOutlineLogout } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import { useContext } from "react";
import ReportDetails from "../Reports/ReportDetails";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const SidebarEmployee = () => {
  console.log("Employee sidebar");
  const [currentIndex, setCurrentIndex] = useState(0);

  const { user } = useAuthContext();
  const location = useLocation();
  const redirectLoginUrl = `/login?redirectTo=${encodeURI(location.pathname)}`;

  const { logout } = useLogout();

  const onLogOut = () => {
    logout();
  };

  return !user ? (
    <Navigate to={redirectLoginUrl} />
  ) : (
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
              {currentIndex == 0 ? (
              <div className="cc d-flex align-items-center ">
                <RiHome6Line className="sidenav-icons" /> الرئيسية
                </div>
              ):  <div className=" d-flex align-items-center ">
              <RiHome6Line className="sidenav-icons" /> الرئيسية
              </div>}
              </li>
              <li onClick={() => setCurrentIndex(1)}>
              {currentIndex == 1 ? (
                 <div className="cc d-flex align-items-center ">
                <TbReportAnalytics className="sidenav-icons" /> البلاغات
                </div>):
                  <div className=" d-flex align-items-center ">
                  <TbReportAnalytics className="sidenav-icons" /> البلاغات
                  </div>}
              </li>

              <br></br>
              <br></br>

              <br></br>
              <br></br>

              <h5 className="fullName  ms-2 border-bottom ">
                {user.fullName}{" "}
              </h5>

              {/* <h5 className="fullName  ms-2 mt-0 ">____________</h5> */}
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
          {currentIndex == 0 ? <Dashboard_Employee /> : <ReportsListEmployee />}
        </div>
        <div id="footer-copy-right">
          جميع الحقوق محفوظة لــركام &copy; {new Date().getFullYear()}
        </div>
      </main>
    </div>
  );
};

export default SidebarEmployee;
