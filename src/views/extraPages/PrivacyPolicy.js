import Footer from "../Footer/Footer";
import TopNavbar from "../TopNavbar/TopNavbar";
import "./PrivacyPolicy.css";

function PrivacyPolicy() {
  return (
    <body className=" ">
      {/* <!-- Header --> */}
      <TopNavbar />
      <div className="container pt-1kk ">
        <div className="rowkk pe-3kk">
          <div className="container my-2 col col-10">
            <div className="card bg-white shadow  border-0 rounded-280 cardHigkk pt-3kk px-3  mb-0 ">
              <div className="card-body  rowkk align-items-centerkk">
                <div className="position-relative colk col-2k text-centerkk align-self-centerkk">
                  <h4 className="textColor BoldFont mb-0 pb-0 align-self-start pt-2">
                  جمع البيانات
                  </h4>

                  <hr className="mt-0 hrLine2 "></hr>
                </div>
                <p className="  colkk col-10kk my-4 ">
                 <ul>
                 <li className=" pb-1">
                    بمجرد زيارة المستخدم موقع الوزارة الإلكتروني أو المنصات الإلكترونية التابعة للوزارة، يقوم الخادم الخاص بتسجيل عنوان بروتوكول شبكة الإنترنت IP الخاص بالمستخدم وتاريخ ووقت الزيارة والعنوان URL الخاص بأي موقع إلكتروني تتم منه إحالتك إلى بوابة الوزارة.
                    </li>
                    <li className=" pb-1">
                    كما يقوم الخادم الخاص بموقع الوزارة الإلكتروني أو المنصات الإلكترونية التابعة للوزارة, بجمع البيانات الشخصية ذات الصلة، سواء من صاحبها مُباشرةً أو ممن يُمثله أو ممن له الولاية الشرعية عليه أو من طرف آخر، بما يتوافق مع أحكام نظام حماية البيانات الشخصية.
                    </li>
                 </ul>
                </p>

                <div className="position-relative colk col-2k text-centerkk align-self-centerkk">
                  <h4 className="textColor BoldFont mb-0 pb-0 align-self-start pt-2">
                  الموافقة على إشعار الخصوصية
                  </h4>

                  <hr className="mt-0 hrLine2 "></hr>
                </div>
                <p className="  col col-10 my-4">
                <ul>
                <li className=" pb-1">
                    زيارة المستخدم لموقع الوزارة والمنصات التابعة لها تعتبر موافقة منه على هذا الإشعار.
                    </li>
                   
                 </ul>
                </p>

                <div className="position-relative colk col-2k text-centerkk align-self-centerkk">
                  <h4 className="textColor BoldFont mb-0 pb-0 align-self-start pt-2">
                  أحكام عامة
                  </h4>

                  <hr className="mt-0 hrLine2 "></hr>
                </div>
                <p className="  col col-10 my-4">
                <ul>
                    <li className=" pb-1">
                    يعد استخدامك للموقع والمنصات الإلكترونية بعد هذه التعديلات قبولاً بها، كما ينبغي الاطلاع على إشعار الخصوصية بشكل دوري للتأكد من معرفتك بأحدث نسخة منها.
                   </li>
                   <li className=" pb-1">
                    تكون قوانين المملكة العربية السعودية وحدها هي القوانين واجبة التطبيق في كل ما يتعلق بالنزاعات التي قد تنشأ من جراء استخدام هذا الموقع الإلكتروني
                   </li>
                   <li className=" pb-0">
                   تختص محاكم المملكة العربية السعودية حصرياً بالنظر في تلك النزاعات والبت فيها.
                  </li>
                 </ul>
                </p>
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
export default PrivacyPolicy;
