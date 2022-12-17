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
            <h5>
              {status == "unsent"
                ? "غير مرسل"
                : status == "pending"
                ? "قيد الإنتظار"
                : status == "under_processing"
                ? "قيد المراجعة"
                : "مغلق"}
            </h5>
          </div>
          <div className="report-card-content d-flex flex-column flex-md-row justify-content-between align-items-end pt-3">
            <div className="d-flex">
              <h5 className="ms-4">حي حطين، شارع الورد</h5>
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
              <Button variant="secondary" size="md" id="delete-report-button">
                <FiTrash /> حذف البلاغ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportCard;
