import { useLogin } from "../hooks/useLogin";
import { Link, useLocation, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import "./Login.css";
import Footer from "../views/Footer/Footer";
import TopNavbar from "../views/TopNavbar/TopNavbar";
import Drone from "../assets/images/DroneToFly.png";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const { user } = useAuthContext();
  const location = useLocation();
  const redirectLoginUrl = `/Sidebar?redirectTo=${encodeURI(
    location.pathname
  )}`;

  const [passwordShown, setPasswordShown] = useState(false);
  const changeIcon = passwordShown === true ? false : true;

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.match(isValidEmail)) {
      setEmailError("البريد الإلكتروني غير صالح");
    } else{

    try {
      setEmailError("");
      await login(email.toLowerCase(), password);
    } catch (error) {}
  }
  };

  return user ? (
    <Navigate to={redirectLoginUrl} />
  ) : (
    <body className=" ">
      <div className="main-content  ">
        {/* <!-- Header --> */}
        <TopNavbar />
        <hr className="mt-0 logline "></hr>
     
        <img
          src={Drone}
          class="movingPhotoLogin position-absolute top-50 start-0  ms-5"
          height={35}
        />
        {/* <!-- Page content --> */}
        <div className="header bg-gradient-primary py-4 py-lg-8">
          <div className="container">
            <div className="header-body text-center mb-7">
              <div className="row justify-content-center">
                <div className="col-lg-5 col-md-6">
                  <h1 className="text-black mt-3">تسجيل الدخول</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt--8 pb-5">
          <div className="row justify-content-center">
            <div className="  col-lg-5 col-md-7 col-sm-8">
              <div className="card bg-white bg-secondary shadow border-0 rounded-280">
                <div className="card-body px-lg-5 px-sm-4 px-4  pt-lg-4-pb-lg-5 py-lg-4">
                  <div className="text-center text-muted mb-2 text-black">
                    <h5 className="text-black mb-lg-1 ">مرحبًا بك مجددًا</h5>
                  </div>
                  <div className="errordiv">
                    {error && (
                      <div className="error text-danger mt-1 ">{error}</div>
                    )}
                    {emailError && (
                    <div className="error text-danger mt-1 ">{emailError}</div>
                  )}

                  </div>
                  <form role="form" onSubmit={handleSubmit}>
                    <div className="col-12 mb-4">
                      <label
                        className="form-label text-right col-form-label col-sm-5 pt-0 classLabel "
                        for="email"
                      >
                        البريد الإلكتروني
                      </label>

                      <input
                        type="email"
                        className="form-control classInput "
                        id="email"
                        name="email"
                        placeholder="ma***@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      />
                    </div>

                    <div className="mb-1  input-group-alternative">
                      <label
                        className="form-label text-rightclassLabel"
                        for="password"
                      >
                        كلمة المرور
                      </label>

                      <div className="pass-wrapper position-relative">
                        <input
                          type={passwordShown ? "text" : "password"}
                          className="form-control classInput "
                          id="password"
                          placeholder="*********"
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          required
                        />

                        <span
                          onClick={togglePassword}
                          className="showhide  position-absolute top-50  translate-middle "
                        >
                          {changeIcon ? <VscEye /> : <VscEyeClosed />}
                        </span>
                      </div>
                    </div>

                    <div className=" text-left d-flex justify-content-end  mb-3">
                      <Link
                        to="/forgotPassword"
                        className="text-decoration-none text-black "
                      >
                        نسيت كلمة المرور؟
                      </Link>
                    </div>
                    <div className="text-center">
                      <button
                        onClick={isLoading}
                        className="btn btn-primary my-2  px-5 classButton"
                      >
                        تسجيل الدخول
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
};
export default Login;
