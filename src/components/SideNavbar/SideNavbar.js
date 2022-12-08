import React from "react";
import Logo from '../../assets/images/Logo_Dark.png';
import './SideNavbar.css';
const Sidebar = () => {
  return <div className="sideNav-container">
    <div className="nav-sub-container">
        <div className="nav-upper">
            <div className="nav-logo">
                <img src={Logo} alt='Rukam Logo' height={50}></img>
            </div>
        </div>
    </div>
  </div>
}

export default Sidebar;