import React, { useState } from "react";
import Logo from "../../assets/images/Logo_Light.png";
import { Link } from "react-router-dom";

function TopNavbar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        {/* <a class="navbar-brand" href="#">Navbar</a> */}
        <Link to="/homePage" className="nav-link">
          <img src={Logo} width="100" alt="" />
        </Link>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav navbar-brand">
            <li onClick={() => setCurrentIndex(0)} class="nav-item active">
              <Link to="/login" className="nav-link">
                تسجيل الدخول
              </Link>
            </li>
            <li onClick={() => setCurrentIndex(1)} class="nav-item">
              <Link to="/homePage" className="nav-link">
                الخدمات
              </Link>
            </li>
            <li onClick={() => setCurrentIndex(2)} class="nav-item">
              <a
                href="mailto:rukamservice@gmail.com"
                className="text-decoration-none nav-link"
              >
                تواصل معنا{" "}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default TopNavbar;
