import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { useState } from "react";
import "./Footer.css";
import Logo from "../../assets/images/Logo_Light.png";
import Login from "../Login/Login";
import Saudi from "../../assets/images/Saudi_Vision_2030_logo.png";

function Footer() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className=" footerimg p-5  text-white">
      <div className="container m-4 ">
        <div className="row   align-items-end">


          <div className="col-1 ">
            <img
              className="position-absolute bottom-0 end-0 m-4"
              width={120}
              src={Saudi}
              alt=""
            />
          </div>
          <div className="col-2 align-middle me-5">
            <ul class="">
              <li className="list-group-item fontBold">القائمة</li>
              <li class="list-group-item ">الصفحة الرئيسية</li>
              <li class="list-group-item">من نحن؟</li>
            </ul>
          </div>
          <div className="col-2 align-middle">
            <ul class="">
              <li className="list-group-item fontBold">الدعم</li>
              <li class="list-group-item ">سياسة الخصوصية</li>
              <li class="list-group-item  ">الدعم الفني</li>
            </ul>
          </div>
          <div className="col-2 align-middle">
            <ul class="">
              <li className="list-group-item fontBold">تواصل معنا</li>
              <li class="list-group-item ">الرقم المباشر ٣١٩</li>
              <li class="list-group-item  ">العناية بالعملاء</li>
            </ul>
          </div>
          <div className="col-1 mx-2"></div>

          <div id='copy-right' className="align-middle col-3 text-white">
            جميع الحقوق محفوظة لــركام &copy; {new Date().getFullYear()}
      </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
