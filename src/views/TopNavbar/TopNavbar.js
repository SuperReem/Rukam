import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from "react";
import Logo from "../../assets/images/Logo_Light.png";
import Login from "../Login/Login";


function TopNavbar() {

    const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
{/*      
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  {/* <a class="navbar-brand" href="#">Navbar</a> */}
  <a class="navbar-brand" href="#">
    <img src={Logo} width="100" alt=""/>
  </a>
  {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon">hh</span>
  </button> */}
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li onClick={()=>setCurrentIndex(0)} class="nav-item active">
        <a class="nav-link" href="#">تسجيل الدخول<span class="sr-only"></span></a>
      </li>
      <li onClick={()=>setCurrentIndex(1)} class="nav-item">
        <a class="nav-link" href="#">الخدمات</a>
      </li>
      <li onClick={()=>setCurrentIndex(2)} class="nav-item">
        <a class="nav-link" href="#Login">تواصل معنا</a>
      </li>
      
    </ul>
  </div>
  {/* <main className="page-container">
      <div className="background fs-1">
         {currentIndex === 0? <Login/> : currentIndex === 1? <Login/> : currentIndex === 2? <Login/> : <Login/>}
      </div>
      <div id='copy-right'>
            جميع الحقوق محفوظة لــركام &copy; {new Date().getFullYear()}
      </div>
    </main>
     */}
</nav>
    </>
  );
}

export default TopNavbar;