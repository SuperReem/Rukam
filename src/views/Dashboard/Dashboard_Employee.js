import { SlLocationPin } from "react-icons/sl";
import React, { useRef } from "react";

import Statistics_Card from "../../components/Statistics/Statistic_card";
import { IoDocumentTextOutline } from "react-icons/io5";
import "./dashboard.css";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { BsArrowUpLeft } from "react-icons/bs";
import DroneIcon from "../../assets/images/DRONE_ICON.png";
import { XYPlot, XAxis, YAxis, LineChart, PieChart } from "reactochart";
import { useReportContext } from "../../hooks/useReportContext";
import { ArabicNumbers } from "react-native-arabic-numbers";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
//
import { Chart } from "react-charts";
import * as V from "victory";
import { IntlProvider } from "react-intl";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTickStyleObject,
  VictoryArea,
  VictoryTheme,
  VictoryLabel,
} from "victory";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { ResponsiveStream } from "@nivo/stream";
import { ResponsiveLine } from "@nivo/line";
//const { faker } = require('@faker-js/faker');
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
const datum = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];
const MyResponsiveLine = ({ data /* see data tab */ }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
    }}
    pointSize={8}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
  />
);

const MyResponsiveStream = ({ data /* see data tab */ }) => (
  <ResponsiveStream
    data={data}
    keys={["Raoul"]}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendOffset: 36,
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendOffset: -40,
    }}
    enableGridX={true}
    enableGridY={false}
    offsetType="silhouette"
    colors={{ scheme: "nivo" }}
    fillOpacity={0.85}
    borderColor={{ theme: "background" }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "#2c998f",
        size: 4,
        padding: 2,
        stagger: true,
      },
      {
        id: "squares",
        type: "patternSquares",
        background: "inherit",
        color: "#e4c912",
        size: 6,
        padding: 2,
        stagger: true,
      },
    ]}
    fill={[
      {
        match: {
          id: "Paul",
        },
        id: "dots",
      },
      {
        match: {
          id: "Marcel",
        },
        id: "squares",
      },
    ]}
    dotSize={8}
    dotColor={{ from: "color" }}
    dotBorderWidth={2}
    dotBorderColor={{
      from: "color",
      modifiers: [["darker", 0.7]],
    }}
  />
);

const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },

    y: {
      grid: {
        // display: false,
        color: "#e9e9e9",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    title: {
      display: true,
      text: "البلاغات",
    },
  },
};

const labels = [
  "ديسمبر",
  "نوفمبر",
  "أكتوبر",
  "سبتمبر",
  "أغسطس",
  "يوليو",
  "يونيو",
  "مايو",
  "أبريل",
  "مارس",
  "فبراير",
  "يناير",
];
const data = {
  labels,
  datasets: [
    {
      fill: true,
      data: labels.map(() => faker.datatype.number({ min: 0, max: 300 })),
      borderColor: "#034C3C",
      backgroundColor: "rgba(181, 134, 76, 0.385)",
    },
  ],
};

const Dashboard_Employee = () => {
  var [pendingTotal, setPendingTotal] = useState(0);
  var [underprocessingTotal, setUnderprocessingTotal] = useState(0);
  var [closedTotal, setClosedTotal] = useState(0);
  var [total, setTotal] = useState(0);
  var [totalWeek, setTotalWeek] = useState(0);
  const { reports, dispatch } = useReportContext();
  const { user } = useAuthContext();
  useEffect(() => {
    var fetchReports = async () => {
      const response = await fetch(
        `http://localhost:3000/api/Report/dash?region=${user.region}`
      )
        .then((response) => response.json())
        .then(
          ({
            reports,
            total,
            totalWeek,
            totalClosed,
            totalPending,
            totalUnderproc,
          }) => {
            dispatch({ type: "SET_REPORTS", payload: reports });
            setTotal(total);
            setTotalWeek(totalWeek);
            setPendingTotal(totalPending);
            setUnderprocessingTotal(totalUnderproc);
            setClosedTotal(totalClosed);
          }
        );
    };

    fetchReports();
  }, [dispatch]);

  return (
    <>
      <div>
        <div className="region-name-container d-flex">
          <SlLocationPin className="region-name-icon" />
          <div className="mt-2">
            &nbsp;
            <span> منطقة </span>
            {/* //3 */}
            <span className="region-name">{user.region}</span>
            {/* // */}
          </div>
        </div>
        <div
          className="container d-flex justify-content-between pt-4"
          style={{ paddingRight: "0.5em", paddingLeft: "0.5em" }}
        >
          <div className="col-8">
            <h5>أحدث البلاغات</h5>
            <div className="recent-reports-list">
              <ListGroup variant="flush" id="recent-reports-ListGroup">
                {reports &&
                  reports.map((report) => (
                    <>
                      <ListGroup.Item>
                        <div className="active-drone-row d-flex justify-content-between p-1">
                          <div className="d-flex">
                            <IoDocumentTextOutline className="recent-reports-icon ms-5" />
                            <div>
                              <Row className="active-drones-drone-name">
                                {report.droneId}
                              </Row>
                              <Row className="active-drones-region-name">
                                منطقة {report.region}
                              </Row>
                            </div>
                          </div>
                          <div>
                            <Button
                              variant="secondary"
                              size="sm"
                              id="details-button"
                            >
                              <BsArrowUpLeft /> التفاصيل
                            </Button>
                          </div>
                        </div>
                      </ListGroup.Item>
                    </>
                  ))}
              </ListGroup>
            </div>
          </div>
          <div
            className="d-flex flex-column"
            style={{ height: "100%", paddingTop: "0.7em", width: "25%" }}
          >
            <div>
              <Statistics_Card
                title={"إجمالي عدد البلاغات"}
                number={ArabicNumbers(total)}
                type={1}
              />
            </div>
            <div style={{ marginTop: "0.5em" }}>
              <Statistics_Card
                title={"عدد بلاغات هذا الأسبوع"}
                number={ArabicNumbers(totalWeek)}
                type={2}
              />
            </div>
          </div>
        </div>
        <div
          class="d-flex justify-content-between pt-4"
          style={{
            height: "275px",
            paddingRight: "0.5em",
            paddingLeft: "0.5em",
          }}
        >
          <div className="reports-statistics">
            <h5>البلاغات</h5>
            <hr className="mt-0"></hr>
            <div className="d-flex">
              <div className="ms-4">
                <div className="d-flex">
                  <div
                    className="reports-statistics-chart-keys ms-1"
                    id="pending-key"
                  ></div>
                  <h6>بلاغات قيد الانتظار</h6>
                </div>
                <div className="d-flex">
                  <div
                    className="reports-statistics-chart-keys ms-1"
                    id="underprocessing-key"
                  ></div>
                  <h6>بلاغات قيد المراجعة</h6>
                </div>
                <div className="d-flex">
                  <div
                    className="reports-statistics-chart-keys ms-1"
                    id="closed-key"
                  ></div>
                  <h6>بلاغات مغلقة</h6>
                </div>
              </div>
              <PieChart
                data={[pendingTotal, underprocessingTotal, 0, closedTotal]}
                radius={60}
                holeRadius={45}
                margin={40}
              />
            </div>
          </div>
          <div className="reports-statistics col-7 pb-5 pt-4">
            <h5 className="mb-0">إجمالي البلاغات لكل شهر</h5>

            <VictoryChart width={1300} height={400} maxDomain={{ y: 8 }}>
              <VictoryArea
                interpolation="natural"
                style={{
                  data: {
                    fill: "rgba(181, 134, 76, 0.5)",
                    fillOpacity: 0.4,
                    stroke: "#034C3C",
                    strokeOpacity: 0.7,
                    strokeWidth: 3,
                  },
                }}
                data={[
                  { x: "ديسمبر", y: 4, y0: 1 },
                  { x: "نوفمبر", y: 3, y0: 1 },
                  { x: "أكتوبر", y: 5, y0: 1 },
                  { x: "سبتمبر", y: 4, y0: 1 },
                  { x: "أغسطس", y: 6, y0: 1 },
                  { x: "يوليو", y: 6, y0: 1 },
                  { x: "يونيو", y: 6, y0: 1 },
                  { x: "مايو", y: 6, y0: 1 },
                  { x: "أبريل", y: 6, y0: 1 },
                  { x: "مارس", y: 6, y0: 1 },
                  { x: "فبراير", y: 7, y0: 1 },
                  { x: "يناير", y: 7, y0: 1 },
                ]}
              />
              <VictoryAxis
                dependentAxis
                tickValues={[2.0, 4.0, 6.0, 8.0]}
                padding={{ left: 20 }}
              />
              <VictoryAxis padding={{ bottom: 90 }} />
            </VictoryChart>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard_Employee;
