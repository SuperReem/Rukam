import Footer from "../Footer/Footer";
import TopNavbar from "../TopNavbar/TopNavbar";
import "./HomePage.css";

function HomePage() {
  return (
    <body className=" ">
      {/* <!-- Header --> */}
      <TopNavbar />
      <p class="serline" height={35}>
        _____________
      </p>
      <div className="container pt-3 ">
        <div className="row pe-3">
          <div className="container my-3 col col-10">
            <div className="card bg-white  border-0 rounded-280 cardHig ">
              <div className="card-body  row align-items-center">
                <div className="position-relative col col-2 text-center text-black  align-self-center">
                  <h4 className="textColor BoldFont mb-0 pb-0 align-self-center">
                    لمحة عامة
                  </h4>
                  <p className="textColor position-absolute top-50 start-50 translate-middle pt-3 ">
                    ________________
                  </p>
                </div>
                <p className="  col col-10">
                  بدأ تأسيس ركام منذ عام ٢٠٢٢ لتكون الخدمة المساعدة للحد من
                  التشوه البصري في المملكة العربية السعودية. اعتمادًا على
                  الطائرات المسيرة بدون طيار، لتجوب أحياء محددة من قبل الرئيس
                  وتلتقط الصور عبر الكامرا وتقوم بتحديد ما اذا كانت المنطقة تحوي
                  مخلفات بناء وهدم. إذا احتوت هذه المنطقة على مخلفات، يتم رفع
                  بلاغ مع إرفاق الموقع المحدد ليتم مخالفة المتسببين.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row pe-3 mt-3 ">
          <div className=" col col-1"></div>
          <div className="container my-3 col col-5">
            <div className="card bg-white  border-0 rounded-280 cards ms-1">
              <div className="card-body row align-items-center">
                <div className="position-relative col col-3 text-center mb-4 text-black  align-self-center">
                  <h4 className="BoldFont mb-0 pb-0 textColor">الرسالة</h4>
                  <p className="textColor position-absolute top-50 start-50 translate-middle pt-3 ">
                    ___________
                  </p>
                </div>
                <p className="  col col-9">
                  الارتقاء بجودة شوارع المدن السعودية من خلال من خلال تعزيز
                  التنمية الحضرية المستدامة.
                </p>
              </div>
            </div>
          </div>

          <div className="container my-3 col col-5 ">
            <div className="card bg-white  border-0 rounded-280 cards me-1">
              <div className="card-body row align-items-center">
                <div className="position-relative col col-3 text-center mb-4 text-black  align-self-center">
                  <h4 className=" textColor BoldFont mb-0 pb-0 ">الرؤية</h4>
                  <p className=" textColor position-absolute top-50 start-50 translate-middle pt-3 ">
                    __________
                  </p>
                </div>
                <p className="  col col-9">
                  لمملكة منظمة ومستدامة وخالية من التشوه البصري.
                </p>
              </div>
            </div>
          </div>
          <div className=" col col-1"></div>
        </div>

        <div className="row mb-4ll pe-0 mt-3">
          <div className="container mt-2 col col-11 ms-3 ">
            <div className="position-relative col col-2 text-center text-black">
              <h4 className="textColor BoldFont mb-0 pb-0 ">الخدمات</h4>
            </div>
          </div>
        </div>

        {/* الخدمات */}
        <div className="row pe-kk mx-5 pe-3  justify-content-end">
          <div className="container my-3 col col-3 ">
            <div className="card bg-white  border-0 rounded-280 cards ">
              <div className="card-body row align-items-center">
                <h4 className="textColor BoldFont mb-0 pb-0 text-center align-self-center">
                  أتمتة رفع البلاغات
                </h4>
              </div>
            </div>
          </div>

          <div className="container my-3 col col-3 ">
            <div className="card bg-white  border-0 rounded-280 cards">
              <div className="card-body  row align-items-center">
                <h4 className="textColor BoldFont mb-0 pb-0 text-center align-self-center">
                  معالجة البلاغات
                </h4>
              </div>
            </div>
          </div>

          <div className="container my-3 col col-3 ">
            <div className="card bg-white  border-0 rounded-280 cards">
              <div className="card-body row align-items-center">
                <h4 className=" textColor BoldFont mb-0 pb-0 text-center  align-self-center">
                  إغلاق المخالفات
                </h4>
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
export default HomePage;
