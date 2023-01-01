import "./report_card.css";
import Button from "react-bootstrap/Button";
import { BsArrowUpLeft } from "react-icons/bs";
import { FiTrash } from "react-icons/fi";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/ar";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import ReportDetails from "../../views/Reports/ReportDetails";
import React, { useState } from "react";

function ReportCard({ report }) {
  const formatter = buildFormatter(frenchStrings);
  const [index, setIndex] = useState(0);
  const [rep, setReport] = useState();
  const [currentPageData, setCurrentPageData] = useState(new Array(5).fill());
  const items = [
    1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 1, 2, 3,
    4, 5, 6, 7, 12, 13, 14,
  ];
  const handle = async (e) => {
    e.preventDefault();

    const report = {
      reportId: "888",
      timestamp: "٢٠ اكتوبر -١٢ مساءا",
      status: "under_processing",
      region: "حطين",
      image: "تر نط",
      notes: "منو",
      location: "ذتنري",
    };

    const response = await fetch("/api/Report", {
      method: "POST",
      body: JSON.stringify(report),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log("new report not added:");
    }
    if (response.ok) {
      console.log("new report added:", json);
    }
  };
  return (
    <>
      {index == 0 ? (
        <>
          <div className="report-card-container">
            <div className="report-card">
              <div className={"report-status-container " + report.status}>
                <h6>
                  {report.status == "unsent"
                    ? "غير مرسل"
                    : report.status == "pending"
                    ? "قيد الإنتظار"
                    : report.status == "under_processing"
                    ? "قيد المراجعة"
                    : "مغلق"}
                </h6>
              </div>
              <div
                className="report-card-content d-flex flex-column flex-md-row justify-content-between align-items-end pt-3"
                id="report-info"
              >
                <div className="d-flex">
                  <h5 className="ms-5"> {report.region}</h5>
                  <p className="report-time">
                    {" "}
                    <TimeAgo date={report.createdAt} formatter={formatter} />;
                  </p>
                </div>
                <div>
                  <Button
                    id="details-button"
                    onClick={() => {
                      setIndex(1);
                    }}
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
                    <Button
                      variant="secondary"
                      size="md"
                      id="delete-report-button"
                    >
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
      ) : (
        <ReportDetails report={report} />
      )}
    </>
  );
}

export default ReportCard;
