import { useState } from "react";
import "./ResetPass.css";
import { HiCheck } from "react-icons/hi";
import Footer from "../Footer/Footer";
import TopNavbar from "../TopNavbar/TopNavbar";
import Drone from "../../assets/images/DroneToFly.png";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { useResetPass } from "../../hooks/useResetPass"
import { Link, useLocation, useNavigate, Navigate, Outlet } from "react-router-dom";




function ResetPass() {

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passError, setPassError] = useState('');

  const [passwordShown, setPasswordShown] = useState(false);
  const changeIcon = passwordShown === true ? false : true;
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const {resetPass, error, isLoading} = useResetPass()

  const handelClick = async (e) => {
    console.log("clicked");
    e.preventDefault();
  
    if (password === "" || password2==="") {
      console.log("Password is required!");
      setPassError("Password is required!");
    } else if (password !== password2) {
      console.log(" password and new must match");
      setPassError(" password and new must match");

    } else {
      console.log("above fetch")
      console.log(password)

      const userToken = window.location.href.substring(36);
      await resetPass(userToken,password)///
  
  
    }
  }


  return (
    <body className=" ">
      <div className="main-content  ">
        {/*  the header */}
        <TopNavbar/>
        <img src={Drone} className="movingPhoto position-absolute top-50 start-0  ms-5 translate-middle" height={35}/>

        {/* <!-- Header --> */}
        <div className="header bg-gradient-primary py-4 py-lg-8">
          <div className="container">
            <div className="header-body text-center mb-7">
              <div className="row justify-content-center">
                <div className="col-lg-5 col-md-6">
                  <h1 className="text-black mt-3">إعادة تعيين كلمة المرور</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Page content --> */}
        <div className="container mt--8 pb-5">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7">
              <div className="card bg-white bg-secondary shadow border-0 rounded-280">
                <div className="card-body px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4 text-black">
                    <h5 className="text-black">
                      يرجى إدخال كلمة المرور الجديدة
                    </h5>
                  </div>
                  <form role="form" onSubmit={handelClick}>
                    <div className="mb-4  input-group-alternative">
                      <label
                        className="form-label text-right mb-0 "
                        for="inputPass"
                      >
                        كلمة المرور الجديدة
                      </label>

                      <input
                        className="form-control classInput"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        id="inputPass"
                        type="password"
                      />
                      
                      <span onClick={togglePassword} className="showhide" >
                              {changeIcon ? <VscEye /> : <VscEyeClosed />}
                              </span>
                    </div>
                    <div className="mb-3  input-group-alternative">
                      <label
                        className="form-label text-right mb-0"
                        for="inputPass"
                      >
                        تأكيد كلمة المرور الجديدة
                      </label>

                      <input
                        className="form-control classInput"
                        placeholder="********"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)} 
                        id="inputPass"
                        type="password"
                      />
                    </div>
                    <div className="mb-1">
                      <i class="fas fa-cat"></i>
                      <i class="bi bi-check-lg"></i>
                      <div className="mb-0">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg d-inline" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
</svg> */}
                        <HiCheck className="check-icon" />
                        <p className="mb-0 small d-inline-block mx-1 text-black-50">
                          ٨ أحرف كحد أقصى
                        </p>
                      </div>

                      <div className="mb-0">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg d-inline" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
</svg> */}
                        <HiCheck className="check-icon" />
                        <p className="mb-0 small d-inline mx-1 text-black-50 ">
                          رقم واحد كحد أدنى
                        </p>
                      </div>

                      <div className="mb-0">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg d-inline" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
</svg> */}
                        <HiCheck className="check-icon" />
                        <p className="mb-0 small  d-inline mx-1  text-black-50">
                          أحرف كبيرة وصغيرة
                        </p>
                      </div>
                    </div>

                    <div className="text-center">
                      {/* <button
                        type="button"
                        onClick={isLoading}
                        className="btn btn-primary my-2 px-5 classButton"
                      >
                        تغيير كلمة المرور
                      </button> */}

                      <button
                   
                        // onClick={onSubmit}
                        onClick={isLoading}
                        className="btn btn-primary my-2  px-5 classButton"
                      >
                        تغيير كلمة المرور
                      </button>


                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Footer --> */}
      <Footer />
    </body>
  );
}
export default ResetPass;
