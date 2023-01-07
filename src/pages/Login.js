import { useLogin } from "../hooks/useLogin"
import { Link, useLocation, useNavigate, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext';

import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user.context";
import "./Login.css";
import Footer from "../views/Footer/Footer";
import TopNavbar from "../views/TopNavbar/TopNavbar";
import Drone from "../assets/images/DroneToFly.png";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import validator from 'validator'







const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setuserType] = useState('')
  const {login, error, isLoading} = useLogin()

  const { user } = useAuthContext()
  const location = useLocation();
  const redirectLoginUrl = `/Sidebar?redirectTo=${encodeURI(location.pathname)}`;
 


  const navigate = useNavigate();

  const [passwordShown, setPasswordShown] = useState(false);
  const changeIcon = passwordShown === true ? false : true;
  //
  const [Error, setError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')


    const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };



  const handleSubmit = async (e) => {
    e.preventDefault()

      try {
     await login(email, password)
    }
      catch (error) {
                  console.log(error);
      }
    
};



  // This function will redirect the user to the
  // appropriate page once the authentication is done.
  // const redirectNow = () => {
  //   const redirectTo = location.search.replace("?redirectTo=", "");
  //   navigate(redirectTo ? redirectTo : "/");
  // };


  return (
        user ? <Navigate to={redirectLoginUrl} /> : 

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
                  {/* <span className="text-danger mt-1 ">{Error}</span> */}
                  {error && <div className="error text-danger mt-1 ">{error}</div>}

                  <form role="form" onSubmit={handleSubmit}>
                    <div className="col-12 mb-4">
                      <label
                        className="form-label text-right col-form-label col-sm-5 pt-0 classLabel "
                        for="email"
                      >
                        البريد الإلكتروني
                      </label>
                      {/* <input type="email" className="form-control classInput" id="inputEmail" placeholder="Ma****@gmail.com" name="inputEmail" value={form.email} onChange={onFormInputChange}/> */}

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
                                        {/* <span className="text-danger mt-1 ">{emailError}</span> */}

                    </div>

                    <div className="mb-1  input-group-alternative">
                     
                      <label
                        className="form-label text-rightclassLabel"
                        for="password"
                      >
                        كلمة المرور
                      </label>

        
      <div className="pass-wrapper">

                      <input
                        type= {passwordShown ? "text" : "password"}  //"password"
                        className="form-control classInput "
                        id="password"
                        placeholder="*********"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
                      />
                           
                              <span onClick={togglePassword} className="showhide" >
                              {changeIcon ? <VscEye /> : <VscEyeClosed />}
                              </span>
                            
                              </div>
                              {/* <span className="text-danger mt-1 ">{passwordError}</span> */}

                    </div>
                    {/* <TextField
                      class="form-control classInput"
                      placeholder="********"
                      id="password"
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={onFormInputChange}
                    /> */}
                    {/* </div> */}

                    <div className=" text-left d-flex justify-content-end  mb-3">
                      {/* <a href="#" className="text-black text-decoration-none "> */}
                      <Link
                        to="/resetpassword"
                        className="text-decoration-none text-black "
                      >
                        نسيت كلمة المرور؟
                      </Link>

                      {/* </a> */}
                      {/* <a href="#" class="text-light col-2 "><small>نلمرور؟</small></a> */}
                    </div>
                    <div className="text-center">
                      <button
                   
                        // onClick={onSubmit}
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

  }
export default Login

// import { Button, TextField } from "@mui/material";
// import { useContext, useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { UserContext } from "../contexts/user.context";
// import "./Login.page.css";
// import Footer from "../views/Footer/Footer";
// import TopNavbar from "../views/TopNavbar/TopNavbar";
// import Drone from "../assets/images/DroneToFly.png";
// import { VscEye } from "react-icons/vsc";
// import { VscEyeClosed } from "react-icons/vsc";

// import validator from 'validator'
// import { useLogin } from "../hooks/useLogin"





// // import LightBrown from (--light_brown);

// const Login = () => {


//   ///
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const {login, error, isLoading} = useLogin()

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     console.log("console-1 email, password")
//     console.log(email, password)
//     await login(email, password)
//   }

//   ///
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [passwordShown, setPasswordShown] = useState(false);
//   const changeIcon = passwordShown === true ? false : true;
//   //
//   const [Error, setError] = useState('')
//   const [emailError, setEmailError] = useState('')
//   const [passwordError, setPasswordError] = useState('')

//    // Password toggle handler
//    const togglePassword = () => {
//     // When the handler is invoked
//     // inverse the boolean state of passwordShown
//     setPasswordShown(!passwordShown);
//   };


//   // We are consuming our user-management context to
//   // get & set the user details here
//   const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

//   // We are using React's "useState" hook to keep track
//   //  of the form values.
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   // This function will be called whenever the user edits the form.
//   const onFormInputChange = (event) => {
//     const { name, value } = event.target;
//     setForm({ ...form, [name]: value });

//     ///
//   };

//   // This function will redirect the user to the
//   // appropriate page once the authentication is done.
//   const redirectNow = () => {
//     const redirectTo = location.search.replace("?redirectTo=", "");
//     navigate(redirectTo ? redirectTo : "/");
//   };

//   // Once a user logs in to our app, we don’t want to ask them for their
//   // credentials again every time the user refreshes or revisits our app,
//   // so we are checking if the user is already logged in and
//   // if so we are redirecting the user to the home page.
//   // Otherwise we will do nothing and let the user to login.
//   const loadUser = async () => {
//     if (!user) {
//       const fetchedUser = await fetchUser();
//       if (fetchedUser) {
//         // Redirecting them once fetched.
//         redirectNow();
//       }
//     }
//   };

//   // This useEffect will run only once when the component is mounted.
//   // Hence this is helping us in verifying whether the user is already logged in
//   // or not.
//   useEffect(() => {
//     loadUser(); // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // This function gets fired when the user clicks on the "Login" button.
//   const onSubmit = async (event) => {
//     event.preventDefault(); //? 

//     if (form.email.trim().length == 0 && form.password.trim().length == 0) {
//       setError('يرجى تعبئة المطلوب!')
//       setEmailError('')
//       setPasswordError('')
//     } else if (form.email.trim().length == 0) {
//       setEmailError('البريد الإلكتروني فارغ!')
//       setError('')
//       setPasswordError('')
//     } else if (form.password.trim().length == 0) {
//       setPasswordError('كلمة المرور فارغة!')
//       setEmailError('')
//       setError('')
//     } else {
//       setError('')
//       setEmailError('')
//       setPasswordError('')

//       try {
//         // Here we are passing user details to our emailPasswordLogin
//         // function that we imported from our realm/authentication.js
//         // to validate the user credentials and log in the user into our App.
//         const user = await emailPasswordLogin(form.email.toLowerCase(), form.password);
       
//         if (user) {
//           console.log("Successfully logged in!", user);
//           redirectNow();
//         }
//       } catch (error) {
//         if (error.statusCode === 401) {
//           setError('البريد الإلكتروني، أو كلمة المرور خاطئة، يرجى المحاولة مجددا!')
//         } else {
//           console.log(error);
//         }
//       }
//     }
//   };

//   return (
//     <body className=" ">
//       <div className="main-content  ">
//         {/*  the header */}
//         <TopNavbar/>
//         <img src={Drone} className="movingPhoto position-absolute top-50 start-0  ms-5 translate-middle" height={35}/>

//         {/* <!-- Header --> */}
//         <div className="header bg-gradient-primary py-4 py-lg-8">
//           <div className="container">
//             <div className="header-body text-center mb-7">
//               <div className="row justify-content-center">
//                 <div className="col-lg-5 col-md-6">
//                   <h1 className="text-black mt-3">تسجيل الدخول</h1>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* <!-- Page content --> */}
//         <div className="container mt--8 pb-5">
//           <div className="row justify-content-center">
//             <div className="  col-lg-5 col-md-7 col-sm-8">
//               <div className="card bg-white bg-secondary shadow border-0 rounded-280">
//                 <div className="card-body px-lg-5 px-sm-4 px-4  pt-lg-4 pb-lg-5 ">
//                   <div className="text-center text-muted mb-4 text-black">

//                     <h5 className="text-black mb-lg-3">مرحبًا بك مجددًا</h5>
//                   </div>
//                   <span className="text-danger mt-1 ">{Error}</span>

//                   <form role="form" onSubmit={handleSubmit}>
//                     <div className="col-12 mb-4">
//                       <label
//                         className="form-label text-right col-form-label col-sm-5 pt-0 classLabel "
//                         for="email"
//                       >
//                         البريد الإلكتروني
//                       </label>
//                       {/* <input type="email" className="form-control classInput" id="inputEmail" placeholder="Ma****@gmail.com" name="inputEmail" value={form.email} onChange={onFormInputChange}/> */}

//                       <input
//                         type="email"
//                         className="form-control classInput "
//                         id="email"
//                         name="email"
//                         placeholder="ma***@gmail.com"
//                         onChange={(e) => setEmail(e.target.value)} 
//                         value={email} 
//                         required
//                       />
//                                         <span className="text-danger mt-1 ">{emailError}</span>


//                       {/* <TextField
//                         type="email"
//                         name="email"
//                         className="form-control classInput "
//                         value={form.email}
//                         id="inputEmail"
//                         placeholder="ma**@gmail.com"
//                         onChange={onFormInputChange}
//                         required
//                       /> */}
//                     </div>

//                     {/* <div class="form-group"> */}
//                     <div className="mb-1  input-group-alternative">
//                       {/* <div class="input-group-prepend">
//                  <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
//                </div> */}
//                       <label
//                         className="form-label text-rightclassLabel"
//                         for="password"
//                       >
//                         كلمة المرور
//                       </label>

        
//       <div className="pass-wrapper">

//                       <input
//                         type= {passwordShown ? "text" : "password"}  //"password"
//                         className="form-control classInput "
//                         id="password"
//                         placeholder="*********"
//                         name="password"
//                         onChange={(e) => setPassword(e.target.value)} 
//         value={password} 
//                       />
                           
//                               <span onClick={togglePassword} className="showhide" >
//                               {changeIcon ? <VscEye /> : <VscEyeClosed />}
//                               </span>
                            
//                               </div>
//                               <span className="text-danger mt-1 ">{passwordError}</span>

//                     </div>
//                     {/* <TextField
//                       class="form-control classInput"
//                       placeholder="********"
//                       id="password"
//                       type="password"
//                       name="password"
//                       value={form.password}
//                       onChange={onFormInputChange}
//                     /> */}
//                     {/* </div> */}

//                     <div className=" text-left d-flex justify-content-end  mb-3">
//                       {/* <a href="#" className="text-black text-decoration-none "> */}
//                       <Link
//                         to="/resetpassword"
//                         className="text-decoration-none text-black "
//                       >
//                         نسيت كلمة المرور؟
//                       </Link>

//                       {/* </a> */}
//                       {/* <a href="#" class="text-light col-2 "><small>نلمرور؟</small></a> */}
//                     </div>
//                     <div className="text-center">
//                       <button
//                         type="button"
//                         // onClick={onSubmit}
//                         className="btn btn-primary my-2  px-5 classButton"
//                       >
//                         تسجيل الدخول
//                       </button>


//                       {/* /// */}
//                       <button disabled={isLoading}>Log in</button>
//       {error && <div className="error">{error}</div>}
//       {/* /// */}
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* <!-- Footer --> */}
//       <Footer />
//     </body>
//   );
// };

// export default Login;
// // https://www.mongodb.com/developer/products/atlas/email-password-authentication-react/


