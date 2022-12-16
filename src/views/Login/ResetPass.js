import { useState } from "react";
import './ResetPass.css';



function ResetPass() {
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

  return (


    
<body className=" "> 
  <div className="main-content photoHere ">
    {/*  the header */}
        
    {/* <!-- Header --> */}
    <div className="header bg-gradient-primary py-7 py-lg-8">
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
                <h5 className="text-black">يرجى إدخال كلمة المرور الجديدة</h5>
              </div>
              <form role="form">

              <div className="mb-1  input-group-alternative">
                 
                                <label className="form-label text-right " for="inputPass">كلمة المرور الجديدة</label>

                    <input className="form-control" placeholder="********" value={password} id='inputPass' type="password"/>
                  </div>
                  <div className="mb-1  input-group-alternative">
                   
                                <label className="form-label text-right " for="inputPass">تأكيد كلمة المرور الجديدة</label>

                    <input className="form-control" placeholder="********" value={password2} id='inputPass' type="password"/>
                  </div>
             

                <div className="text-center">
               
                  <button type="button" className="btn btn-primary my-2">تغيير كلمة المرور</button>
                </div>
              </form>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  </div>
  {/* <!-- Footer --> */}
  
</body>


  );
}
export default ResetPass;
