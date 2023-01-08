import { useState } from 'react'

const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");

    const setVal = (e) => {
        setEmail(e.target.value)
    }

    const sendLink = async (e) => {
        e.preventDefault();

        if (email === "") {
          console.log("email is required!"
            );
        } else if (!email.includes("@")) {
          console.log("includes @ in your email!");
        } else {
          console.log("above fetch")

            const res = await fetch('/api/user/forgotPassword', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email })
            });
            console.log(res )
            console.log(res.ok )


            const data = await res.json();
            console.log(data )
            console.log("status")
            console.log(data.status )

         if (data.status != 201) {
              console.log("Invalid User")
             
          } 
          else {
            console.log("??valid User")
            setEmail("");
            setMessage(true)
          }

            // if (data.status == 201 || res.ok) {
            //     setEmail("");
            //     setMessage(true)
            // } else {
            //   console.log("Invalid User")
            // }
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Enter Your Email</h1>
                    </div>

                    {message ? <p style={{ color: "green", fontWeight: "bold" }}>pasword reset link send Succsfully in Your Email</p> : ""}
                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>

                        <button className='btn' onClick={sendLink}>Send</button>
                    </form>
                    {/* <ToastContainer /> */}
                </div>
            </section>
        </>
    )
}

export default ForgotPassword



// import { useState } from "react";
// import "./ForgotPassword.css";
// import Footer from "../Footer/Footer";
// import TopNavbar from "../TopNavbar/TopNavbar";
// import Drone from "../../assets/images/DroneToFly.png";
// import validator from 'validator'
// //
// import { Link, useLocation, useNavigate, Navigate, Outlet } from "react-router-dom";
// import { useContext, useEffect } from "react";
// import { UserContext } from "../../contexts/user.context";
// ///
// import { useForgotPassword } from "../../hooks/useForgotPassword"


// function ForgotPassword() {
//   const [email, setEmail] = useState('')
//   const [emailError, setEmailError] = useState('')
//   // const {forgotPassword, error, isLoading} = useForgotPassword()


//   const setVal = (event) => {
//     setEmail( event.target.value)
//   };


// ///////////////

// const handleSubmit = async (e) => {
//   e.preventDefault()
//   console.log(email)

//   const response = await fetch('/api/user/forgotPassword', {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({ email})
//   })
//   const json = await response.json()
//   if (!response.ok) {
//     // setIsLoading(false)
//     // setError(json.error)
//     console.log("not ok")
//   }
//   if (response.ok) {
//   //  localStorage.setItem('user', JSON.stringify(json))
//   //   dispatch({type: 'LOGIN', payload: json})
//     console.log(" ok")
//   }



//   ///error
//   // await forgotPassword({email})
// }

// // useEffect(() => {
// //   const fetchEmails = async () => {
// //     const response = await fetch('/api/forgotPassword')
// //     const json = await response.json()

// //     if (response.ok) {
// //       setEmail(json)
// //     }
// //   }

// //   fetchEmails()
// // }, [])


//   return (
//     <body className=" ">
//       <div className="main-content   ">
//         {/* <!-- Header --> */}
//         <TopNavbar />
//         <img
//           src={Drone}
//           className="movingPhoto position-absolute top-50 start-0  ms-5 translate-middle"
//           height={35}
//         />

//         {/* <!-- Body --> */}
//         <div className="header bg-gradient-primary py-4 py-lg-8 ">
//           <div className="container">
//             <div className="header-body text-center mb-7">
//               <div className="row justify-content-center">
//                 <div className="col-lg-5 col-md-6">
//                   <h1 className="text-black mt-3">استعادة كلمة المرور</h1>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* <!-- Page content --> */}
//         <div className="container mt--8 pb-5">
//           <div className="row justify-content-center">
//             <div className="col-lg-5 col-md-7">
//               <div className="card bg-white bg-secondary shadow border-0 rounded-280">
//                 <div className="card-body px-lg-5 py-lg-5">
//                   <div className="text-center text-muted mb-4 text-black">
//                     <h5 className="text-black">أدخل بريدك الإلكتروني</h5>
//                   </div>
//                   <form role="form"  onSubmit={handleSubmit}>
//                     <div className="col-12 mb-4">
//                       <label
//                         className="form-label text-right col-form-label col-sm-5 pt-0 classLabel"
//                         for="email"
//                       >
//                         البريد الإلكتروني
//                       </label>
//                       <input
//                         type="email"
//                         className="form-control classInput mb-2"
//                         id="email"
//                         name="email"
//                         placeholder="Ma***@gmail.com"
//                         onChange={(e) => setEmail(e.target.value)} 
//                         value={email} 
//                         required
//                       />
//                       {/* // */}
//                       {/* {email && email.map(email => (
//           <h2 workout={email} key={email._id} />
//         ))} */}

//                       {/* /// */}
//                          <span className="text-danger mt-1 ">{emailError}</span>

//                     </div>

//                     <div className="text-center">
//                       <button
//                         type="Submit"
//                         // disabled={isLoading}
//                         // onClick={onSubmit}
//                         className="btn btn-primary my-2  px-5 classButton"
//                       >
//                         إرسال
//                       </button>
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
// }
// export default ForgotPassword;





// // import { useState, useContext, useEffect } from "react";
// // import "./ForgotPassword.css";
// // import Footer from "../Footer/Footer";
// // import TopNavbar from "../TopNavbar/TopNavbar";
// // import Drone from "../../assets/images/DroneToFly.png";
// // import validator from 'validator'
// // //
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import { UserContext } from "../../contexts/user.context";


// // function ForgotPassword() {
// //   const [form, setForm] = useState({
// //     email: "",
// //     password: "",
// //   });
// //   const [email, setEmail] = useState('')
// //   const [emailError, setEmailError] = useState('')


// //   const onFormInputChange = (event) => {
// //     const { name, value } = event.target;
// //     setForm({ ...form, [name]: value });

// //     var email = event.target.value
  
// //     if (validator.isEmail(email)) {
// //       setEmailError('')
// //     } 
// //     else {
// //       setEmailError('البريد الإلكتروني غير صالح!')
// //     }
// //   };

// // ///////////////
  

  


  

// //   return (
// //     <body className=" ">
// //       <div className="main-content   ">
// //         {/* <!-- Header --> */}
// //         <TopNavbar />
// //         <img
// //           src={Drone}
// //           className="movingPhoto position-absolute top-50 start-0  ms-5 translate-middle"
// //           height={35}
// //         />

// //         {/* <!-- Body --> */}
// //         <div className="header bg-gradient-primary py-4 py-lg-8 ">
// //           <div className="container">
// //             <div className="header-body text-center mb-7">
// //               <div className="row justify-content-center">
// //                 <div className="col-lg-5 col-md-6">
// //                   <h1 className="text-black mt-3">استعادة كلمة المرور</h1>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //         {/* <!-- Page content --> */}
// //         <div className="container mt--8 pb-5">
// //           <div className="row justify-content-center">
// //             <div className="col-lg-5 col-md-7">
// //               <div className="card bg-white bg-secondary shadow border-0 rounded-280">
// //                 <div className="card-body px-lg-5 py-lg-5">
// //                   <div className="text-center text-muted mb-4 text-black">
// //                     <h5 className="text-black">أدخل بريدك الإلكتروني</h5>
// //                   </div>
// //                   <form role="form">
// //                     <div className="col-12 mb-4">
// //                       <label
// //                         className="form-label text-right col-form-label col-sm-5 pt-0 classLabel"
// //                         for="email"
// //                       >
// //                         البريد الإلكتروني
// //                       </label>
// //                       <input
// //                         type="email"
// //                         className="form-control classInput mb-2"
// //                         id="email"
// //                         name="email"
// //                         placeholder="Ma***@gmail.com"
// //                         value={form.email}
// //                         onChange={onFormInputChange}
// //                         // onChange={(e) => validateEmail(e)}
// //                         required
// //                       />
// //                          <span className="text-danger mt-1 ">{emailError}</span>

// //                     </div>

// //                     <div className="text-center">
// //                       <button
// //                         type="Submit"
// //                         // onClick={onSubmit}
// //                         className="btn btn-primary my-2  px-5 classButton"
// //                       >
// //                         إرسال
// //                       </button>
// //                     </div>
// //                   </form>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       {/* <!-- Footer --> */}
// //       <Footer />
// //     </body>
// //   );
// // }
// // export default ForgotPassword;

