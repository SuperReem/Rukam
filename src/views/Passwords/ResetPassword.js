import { useState } from "react";
import "./ResetPassword.css";
import Footer from "../Footer/Footer";
import TopNavbar from "../TopNavbar/TopNavbar";
import Drone from "../../assets/images/DroneToFly.png";
import { useNavigate } from "react-router-dom";
import { useForgotPassword } from "../../hooks/useForgotPassword";

function ResetPassword() {
  let Navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const { forgotPassword } = useForgotPassword();

  const setVal = (e) => {
    setEmail(e.target.value);
  };
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const sendLink = async (e) => {
    e.preventDefault();

    if (email === "") {
      setEmailError("يرجى إدخال البريد الإلكتروني");
    } else if (!email.match(isValidEmail)) {
      setEmailError("البريد الإلكتروني غير صالح");
    } else{
      setEmailError("");
      await forgotPassword(email.toLowerCase()).then(NavigateReset(email));
    }
  };
  const NavigateReset = (email) => {
    Navigate("/EmailResetPassword", { state: { userEmail: email } });
  };
  return (
    <body className=" ">
      <div className="main-content   ">
        {/* <!-- Header --> */}
        <TopNavbar />
        <img
          src={Drone}
          className="movingPhotoLogin position-absolute top-50 start-0  ms-5"
          height={35}
        />

        {/* <!-- Body --> */}
        <div className="header bg-gradient-primary py-4 py-lg-8 ">
          <div className="container">
            <div className="header-body text-center mb-7">
              <div className="row justify-content-center">
                <div className="col-lg-5 col-md-6">
                  <h1 className="text-black mt-3">استعادة كلمة المرور</h1>
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
                <div className="card-body px-lg-5 py-lg-5- py-lg-4">
                  <div className="text-center text-muted mb-4 text-black">
                    <h5 className="text-black">أدخل بريدك الإلكتروني</h5>
                  </div>
                  {emailError && (
                    <div className="error text-danger mt-1 ">{emailError}</div>
                  )}

                  <form role="form">
                    <div className="col-12 mb-4">
                      <label
                        className="form-label text-right col-form-label col-sm-5 pt-0 classLabel"
                        for="email"
                      >
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        className="form-control classInput mb-2"
                        id="email"
                        name="email"
                        placeholder="Ma***@gmail.com"
                        value={email}
                        onChange={setVal}
                        required
                      />
                    </div>

                    <div className="text-center">
                      <button
                        type="Submit"
                        onClick={sendLink}
                        className="btn btn-primary my-2  px-5 classButton"
                      >
                        إرسال
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
export default ResetPassword;
