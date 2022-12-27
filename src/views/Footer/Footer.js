import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { useState } from "react";
import "./Footer.css";
import Logo from "../../assets/images/Logo_Light.png";
import Saudi from "../../assets/images/Saudi_Vision_2030_logo.png";

function Footer() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="footer footerimg p-lg-5  p-sm-0 pb-md-2  text-white">
      {/* <div className="container m-4 "> */}
      <div className="row   align-items-end">
        <div className="col-1 ">
          <img
            className="position-absolute bottom-0 end-0 m-3"
            width={110}
            src={Saudi}
            alt=""
          />
        </div>
        <div className="col-2 align-middle me-5 ">
          <ul class="">
            <li className="list-group-item fontBold pb-2">القائمة</li>
            <li class="list-group-item ">الصفحة الرئيسية</li>
            <li class="list-group-item">من نحن؟</li>
          </ul>
        </div>
        <div className="col-2 align-middle">
          <ul class="">
            <li className="list-group-item fontBold pb-2">الدعم</li>
            <li class="list-group-item ">سياسة الخصوصية</li>
            <li class="list-group-item  ">الدعم الفني</li>
          </ul>
        </div>
        <div className="col-2 align-middle">
          <ul class="">
            <li className="list-group-item fontBold pb-2">تواصل معنا</li>
            <li class="list-group-item ">الرقم المباشر ٣١٩</li>
            <li class="list-group-item  ">العناية بالعملاء</li>
          </ul>
        </div>
        <div className="col-1 mx-2"></div>

        <div className="col-1 ">
          <img
            className="position-absolute bottom-0 end-0 m-3"
            width={110}
            src={Saudi}
            alt=""
          />
        </div>
        <div className="col-2 align-middle me-5 ">
          <ul class="">
            <li className="list-group-item fontBold pb-2">القائمة</li>
            <li class="list-group-item ">الصفحة الرئيسية</li>
            <li class="list-group-item">من نحن؟</li>
          </ul>
        </div>
        <div className="col-2 align-middle">
          <ul class="">
            <li className="list-group-item fontBold pb-2">الدعم</li>
            <li class="list-group-item ">سياسة الخصوصية</li>
            <li class="list-group-item  ">الدعم الفني</li>
          </ul>
        </div>
        <div className="col-2 align-middle">
          <ul class="">
            <li className="list-group-item fontBold pb-2">تواصل معنا</li>
            <li class="list-group-item ">الرقم المباشر ٣١٩</li>
            <li class="list-group-item  ">العناية بالعملاء</li>
          </ul>
        </div>
        <div className="col-1 mx-2"></div>

        <div id="copy-right" className=" col-3 text-white mt-5 pt-1">
          جميع الحقوق محفوظة لــركام &copy; {new Date().getFullYear()}
        </div>
      </div>
    </div>

    // </div>
  );
}

export default Footer;
