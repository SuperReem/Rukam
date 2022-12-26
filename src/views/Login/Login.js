// import { useState } from "react";
import "./login.css";
// import Button from "react-bootstrap/Button";
import { BsArrowUpLeft } from "react-icons/bs";
import imgg from "../../assets/images/DRONE_ICON_BACKROUND.png";
//
import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
//

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/");
  };

  const loadUser = async () => {
    if (!user) {
      const fetchedUser = await fetchUser();
      if (fetchedUser) {
        // Redirecting them once fetched.
        redirectNow();
      }
    }
  };

  useEffect(() => {
    loadUser(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (event) => {
    try {
      // Here we are passing user details to our emailPasswordLogin
      // function that we imported from our realm/authentication.js
      // to validate the user credentials and log in the user into our App.
      const user = await emailPasswordLogin(form.email, form.password);
      if (user) {
        redirectNow();
      }
    } catch (error) {
      if (error.statusCode === 401) {
        alert("Invalid username/password. Try again!");
      } else {
        alert(error);
      }
    }
  };

  return;
  // bg-light
  <body className=" ">
    <div className="main-content photoHere ">
      {/*  the header */}

      {/* <!-- Header --> */}
      <div className="header bg-gradient-primary py-7 py-lg-8">
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
      {/* <!-- Page content --> */}
      <div className="container mt--8 pb-5">
        <div className="row justify-content-center">
          <div className="  col-lg-5 col-md-7 col-sm-8">
            <div className="card bg-white bg-secondary shadow border-0 rounded-280">
              <div className="card-body px-lg-5 px-sm-4 px-4  pt-lg-4 pb-lg-5 ">
                <div className="text-center text-muted mb-4 text-black">
                  <h5 className="text-black mb-lg-3">مرحبًا بك مجددًا</h5>
                </div>
                <form role="form">
                  <div className="col-12 mb-4">
                    <label
                      className="form-label text-right col-form-label col-sm-5 pt-0 classLabel"
                      for="inputEmail"
                    >
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      className="form-control classInput"
                      id="inputEmail"
                      placeholder="ma***@gmail.com"
                      value={form.email}
                      onChange={onFormInputChange}
                      required
                    />
                  </div>

                  {/* <div class="form-group"> */}
                  <div className="mb-1  input-group-alternative">
                    {/* <div class="input-group-prepend">
                      <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                    </div> */}
                    <label
                      className="form-label text-rightclassLabel"
                      for="inputPass"
                    >
                      كلمة المرور
                    </label>

                    <input
                      className="form-control classInput"
                      placeholder="********"
                      value={form.password}
                      onChange={onFormInputChange}
                      id="inputPass"
                      type="password"
                    />
                  </div>
                  {/* </div> */}

                  <div className=" text-left d-flex justify-content-end  mb-3">
                    <a href="#" className="text-black text-decoration-none  ">
                      نسيت كلمة المرور؟
                    </a>
                    {/* <a href="#" class="text-light col-2 "><small>نلمرور؟</small></a> */}
                  </div>
                  <div className="text-center">
                    <button
                      onClick={onSubmit}
                      type="button"
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
  </body>;

  // ////
  // <div id="card container container-sm border">
  //   <form>
  //     <div class="mb-3">

  //       <label class="form-label" for="inputEmail">
  //         Email

  //       </label>
  //       <input
  //         type="email"
  //         class="form-control"
  //         id="inputEmail"
  //         placeholder="Email"
  //       />
  //     </div>
  //     <div class="mb-3">
  //       <label class="form-label" for="inputPassword">
  //         Password
  //       </label>
  //       <input
  //         type="password"
  //         class="form-control"
  //         id="inputPassword"
  //         placeholder="Password"
  //       />
  //     </div>

  //     <button type="submit" class="btn btn-primary">
  //       Sign in
  //     </button>
  //   </form>
  // </div>
  // /* <body>
  //   //temp
  //   <div className=" thediv container container-fluid">
  //     <form action="" method="">
  //       <h1>test</h1>
  //       <br></br>
  //       <label htmlFor="email"> Email </label>
  //     <input type='email' name="email"/>
  //     <br/>
  //     <label htmlFor="password"> Password </label>
  //     <input type='password' name="password"/>

  //     </form>

  //   </div>
  //   </body> */
};
export default Login;
