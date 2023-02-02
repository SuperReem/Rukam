import React, { useState } from "react";
import Logo from "../../assets/images/Logo_Dark.png";
import "./SideNavbar.css";
import Dashboard_Admin from "../Dashboard/Dashboard_Admin";
import DroneList from "../Drones/Drones_list";
import ReportsList from "../Reports/Reports_list";
import DetectionList from "../Detections/Detection_list";
import { RiHome6Line } from "react-icons/ri";
import { TbReportAnalytics, TbDrone } from "react-icons/tb";
import { HiOutlineLogout } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import Button from "react-bootstrap/Button";

const Sidebar = () => {
  console.log("admin sidebar");

  const [currentIndex, setCurrentIndex] = useState(0);

  const { user } = useAuthContext();
  console.log(user);

  const { logout } = useLogout();

  const onLogOut = () => {
    logout();
  };

  return (
    <>
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
                  ) : (
                    <div className="norm d-flex align-items-center ">
                      <RiHome6Line className="sidenav-icons" /> الرئيسية
                    </div>
                  )}
                </li>
                <li onClick={() => setCurrentIndex(1)}>
                  {currentIndex == 1 ? (
                    <div className="cc d-flex align-items-center ">
                      <TbReportAnalytics className="sidenav-icons" /> البلاغات
                    </div>
                  ) : (
                    <div className="norm d-flex align-items-center ">
                      <TbReportAnalytics className="sidenav-icons" /> البلاغات
                    </div>
                  )}
                </li>
                <li onClick={() => setCurrentIndex(2)}>
                  {currentIndex == 2 ? (
                    <div className="cc d-flex align-items-center ">
                      <SlLocationPin className="sidenav-icons" /> المواقع
                      المخالفة
                    </div>
                  ) : (
                    <div className=" d-flex align-items-center ">
                      <SlLocationPin className="sidenav-icons" /> المواقع
                      المخالفة
                    </div>
                  )}
                </li>
                <li onClick={() => setCurrentIndex(3)}>
                  {currentIndex == 3 ? (
                    <div className="cc d-flex align-items-center ">
                      <TbDrone className="sidenav-icons" /> قائمة الدرونز
                    </div>
                  ) : (
                    <div className=" d-flex align-items-center ">
                      <TbDrone className="sidenav-icons" /> قائمة الدرونز
                    </div>
                  )}
                </li>

                <br></br>
                <br></br>

                <br></br>
                <br></br>

                <h5 className="fullName  ms-2 border-bottomkk col col-12 mb-0 ">
                  {user.fullName}{" "}
                </h5>
                <hr className="mt-0 nameLine col col-12 mb-1 mx-0 "></hr>

                <li data-bs-toggle="modal" data-bs-target="#myModalSign">
                  <HiOutlineLogout className="sidenav-icons " />
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

      <div>
        <div className="modal" id="myModalSign">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content ">
              <div className="">
                <div className="row align-items-center  justify-content-end  pt-2 cont">
                  <div className="col-6 p-0 ">
                    <h4 className=" m-0 h3">تسجيل خروج </h4>
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
                    <div className="row align-items-center justify-content-center  h5">
                      هل انت متأكد من تسجيل الخروج؟
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
                  className="popup4 btn "
                  onClick={onLogOut}
                  data-bs-dismiss="modal"
                >
                  تسجيل خروج{" "}
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  className="popup btn "
                  data-bs-dismiss="modal"
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default Sidebar;
