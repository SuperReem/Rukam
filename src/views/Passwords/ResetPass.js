import { useState, useEffect } from "react";
import "./ResetPass.css";
import { HiCheck } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import Footer from "../Footer/Footer";
import TopNavbar from "../TopNavbar/TopNavbar";
import Drone from "../../assets/images/DroneToFly.png";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { useResetPass } from "../../hooks/useResetPass";
import { Link } from "react-router-dom";

function ResetPass() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [passwordShown, setPasswordShown] = useState(false);
  const changeIcon = passwordShown === true ? false : true;
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const [val1, setVal1] = useState(false);
  const [val2, setVal2] = useState(false);
  const [val3, setVal3] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const validatPassword = () => {
    const thePassword = password.trim();

    const uppercaseRegExp = /(?=.*[A-Z])/;
    const lowercaseRegExp = /(?=.*[a-z])/;
    const digitsRegExp = /^(?=.*[0-9])/;
    const minLengthRegExp = /.{7,}/;
    // const wspace = /^\S*$/;

    const uppercasePassword = uppercaseRegExp.test(thePassword);
    const lowercasePassword = lowercaseRegExp.test(thePassword);
    const digitsPassword = digitsRegExp.test(thePassword);
    const minLengthPassword = minLengthRegExp.test(thePassword);
    // const wspacePassword = wspace.test(thePassword);

    if (minLengthPassword) {
      setVal1(true);
    } else {
      setVal1(false);
    }
    if (digitsPassword) {
      setVal2(true);
    } else {
      setVal2(false);
    }
    if (uppercasePassword && lowercasePassword) {
      setVal3(true);
    } else {
      setVal3(false);
    }
  };

  useEffect(() => {
    validatPassword();
    checkSimilarity();
  });

  //confirm password
  const [passwordShown2, setPasswordShown2] = useState(false);
  const changeIcon2 = passwordShown2 === true ? false : true;
  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2);
  };

  const checkSimilarity = () => {
    if (password !== password2) {
      setConfirming(false);
    }
    if (password !== "") {
      if (password == password2) {
        setConfirming(true);
      }
    }
  };

  const { resetPass } = useResetPass();
  const disable = val1 && val2 && val3 && confirming;

  const handelClick = async (e) => {
    e.preventDefault();

    const userToken = window.location.href.substring(36);
    await resetPass(userToken, password);
  };

  return (
    <body>
      <div className="main-content  ">
        {/* <!-- Header --> */}
        <TopNavbar />
        <img
          src={Drone}
          className="movingPhotoLogin position-absolute top-50 start-0  ms-5"
          height={35}
        />

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
                <div className="card-body px-lg-5 py-lg-4  ">
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

                      <div className="position-relative ">
                        <input
                          type={passwordShown ? "text" : "password"}
                          className="form-control classInput"
                          placeholder="********"
                          value={password}
                          onChange={(e) => setPassword(e.target.value.replace(" ", ""))}
                          id="inputPass"
                          pattern="^(?=.*?[A-Za-z0-9#!@$%^&*()+=])\S{8,35}$"
                          required
                        />

                        <span
                          onClick={togglePassword}
                          className="showhide position-absolute top-50  translate-middle "
                        >
                          {changeIcon ? <VscEye /> : <VscEyeClosed />}
                        </span>
                      </div>
                    </div>
                    <div className="mb-3  input-group-alternative ">
                      <label
                        className="form-label text-right mb-0"
                        for="inputPass"
                      >
                        تأكيد كلمة المرور الجديدة
                      </label>

                      <div className="position-relative ">
                        <input
                          type={passwordShown2 ? "text" : "password"}
                          className="form-control classInput"
                          placeholder="********"
                          value={password2}
                          onChange={(e) => setPassword2(e.target.value.replace(" ", ""))}
                          id="inputPass"
                          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                          required
                        />
                        <span
                          onClick={togglePassword2}
                          className="showhide2 position-absolute top-50  translate-middle  "
                        >
                          {changeIcon2 ? <VscEye /> : <VscEyeClosed />}
                        </span>
                      </div>
                    </div>
                    <div className="mb-1">
                      <i class="fas fa-cat"></i>
                      <i class="bi bi-check-lg"></i>
                      <div className="mb-0">
                        {val1 ? (
                          <HiCheck className="check-icon" />
                        ) : (
                          <HiOutlineX className="uncheck-icon " />
                        )}
                        <p className="mb-0 small d-inline-block mx-1 text-black-50">
                          ٨ أحرف كحد أدنى
                        </p>
                      </div>

                      <div className="mb-0">
                        {val2 ? (
                          <HiCheck className="check-icon" />
                        ) : (
                          <HiOutlineX className="uncheck-icon " />
                        )}
                        <p className="mb-0 small d-inline mx-1 text-black-50 ">
                          رقم واحد كحد أدنى
                        </p>
                      </div>

                      <div className="mb-0">
                        {val3 ? (
                          <HiCheck className="check-icon" />
                        ) : (
                          <HiOutlineX className="uncheck-icon " />
                        )}
                        <p className="mb-0 small  d-inline mx-1  text-black-50">
                          أحرف كبيرة وصغيرة
                        </p>
                      </div>
                      <div className="mb-0">
                        {confirming ? (
                          <HiCheck className="check-icon" />
                        ) : (
                          <HiOutlineX className="uncheck-icon " />
                        )}
                        <p className="mb-0 small  d-inline mx-1  text-black-50">
                          كلمتا المرور متطابقتان
                        </p>
                      </div>
                    </div>

                    <div className="text-center">
                      <button
                        disabled={!disable}
                        className="btn btn-primary my-2  px-5 classButton changepass "
                      >
                        <Link to="/login" className="nav-link">
                          تغيير كلمة المرور
                        </Link>
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
