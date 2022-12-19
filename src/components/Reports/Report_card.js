import "./report_card.css";
import Button from "react-bootstrap/Button";
import { BsArrowUpLeft } from "react-icons/bs";
import { FiTrash } from "react-icons/fi";
function ReportCard({ status }) {
  return (
    <>
      <div className="report-card-container">
        <div className="report-card">
          <div className={"report-status-container " + status}>
            <h6>
              {status == "unsent"
                ? "غير مرسل"
                : status == "pending"
                ? "قيد الإنتظار"
                : status == "under_processing"
                ? "قيد المراجعة"
                : "مغلق"}
            </h6>
          </div>
          <div
            className="report-card-content d-flex flex-column flex-md-row justify-content-between align-items-end pt-3"
            id="report-info"
          >
            <div className="d-flex">
              <h5 className="ms-5">حي حطين، شارع الورد</h5>
              <p className="report-time">منذ 3 ساعات</p>
            </div>
            <div>
              <Button
                variant="secondary"
                size="md"
                id="details-button"
                className="ms-3"
              >
                <BsArrowUpLeft /> التفاصيل
              </Button>
              <Button
                variant="secondary"
                size="md"
                id="delete-report-button"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
              >
                <FiTrash /> حذف البلاغ
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="modal" id="myModal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="">
                <div className="row align-items-center  justify-content-end mb-4 pt-2">
                  <div className="col-6 p-0 ">
                    <h4 className=" m-3">حذف البلاغ</h4>
                  </div>
                  <div className="col-2">
                    <button
                      data-bs-dismiss="modal"
                      className="closebtn btn rounded"
                    >
                      &#x2715;
                    </button>
                  </div>
                </div>
                <div className="modal-body justify-content-center">
                  <div className="row align-items-center  justify-content-center">
                    <div className="col-8 progressbar  pb-4"></div>
                    <div className="row align-items-center justify-content-between pb-4 me-5 pt-2">
                      <div className="justify-content-center me-3 h4">
                        هل انت متأكد من حذف هذا البلاغ؟
                      </div>
                    </div>
                    <div className="row justify-content-start align-items-start">
                      <div className="col-8 h5"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div></div>

              <div className="modal-footer border border-0 justify-content-center">
                <Button variant="secondary" size="md" id="delete-report-button">
                  {" "}
                  حذف{" "}
                </Button>
                <Button variant="secondary" size="md" id="details-button">
                  {" "}
                  إلغاء{" "}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportCard;
