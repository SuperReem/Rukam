import "./EmailResetPassword.css";
import Footer from "../Footer/Footer";
import TopNavbar from "../TopNavbar/TopNavbar";
import Email from "../../assets/images/email.png";
import { AiOutlineArrowRight } from "react-icons/ai";
import {
  Link,
  useLocation,
} from "react-router-dom";

function EmailResetPassword() {
  const location = useLocation();
  const { userEmail } = location.state;
  console.log(userEmail);

  return (
    <body className=" ">
      <div className="main-content  ">
        {/*  the header */}
        <TopNavbar />

        {/* <!-- Header --> */}
        <div className="header bg-gradient-primary py-4 py-lg-8">
          <div className="container">
            <div className="header-body text-center mb-7">
              <div className="row justify-content-center">
                <div className="col-lg-5 col-md-6">
                  <img src={Email} className="" height={120} />
                  <h3 className="text-black mt-3">تفقد صندوقك الوارد</h3>
                  <p className=" mb-0 mt-4 ">
                    تم إرسال رابط إعادة تعيين كلمة المرور إلى
                  </p>
                  <p className=" mt-0 ">{userEmail} </p>
                  <a href="https://mail.google.com/mail/" target="_blank">
                    <button className="btn btn-primary my-2 mb-4  px-5 classButton changepass ">
                      افتح البريد
                    </button>
                    <br></br>
                  </a>
                  <span className="text-secondary">لم تستلم البريد؟ </span>

                  <span>
                    {" "}
                    <a
                      href="javascript:history.back()"
                      className="text-decoration-none brownText mb-3 "
                    >
                      {" "}
                      أعد الإرسال
                    </a>
                  </span>

                  <Link
                    to="/login"
                    className="text-decoration-none mt-4  text-secondary d-block"
                  >
                    <small className="text-secondary ">
                      <AiOutlineArrowRight></AiOutlineArrowRight>
                      العودة لتسجيل الدخول
                    </small>{" "}
                  </Link>
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
export default EmailResetPassword;

