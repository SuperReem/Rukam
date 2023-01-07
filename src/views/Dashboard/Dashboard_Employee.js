import {SlLocationPin} from 'react-icons/sl';
import Statistics_Card from '../../components/Statistics/Statistic_card';
import {IoDocumentTextOutline} from 'react-icons/io5';
import './dashboard.css'
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { BsArrowUpLeft } from "react-icons/bs";
import DroneIcon from '../../assets/images/DRONE_ICON.png';
import {XYPlot, XAxis, YAxis, LineChart, PieChart} from 'reactochart';

import {IntlProvider} from 'react-intl';

const ReportsChart = (props) => (
    <PieChart
        data={[2,3,0,5]}
        radius={60}
        holeRadius={45}
        margin={40}               
    />
);

const Dashboard_Employee = () =>{

   return <>
     <div>
       <div className="region-name-container d-flex">
          <SlLocationPin className='region-name-icon'/>
          <div className='mt-2'>
            &nbsp;
            <span> منطقة </span>
            <span className='region-name'>حطين</span>
          </div>
       </div> 
       <div className='container d-flex justify-content-between pt-4' style={{paddingRight: '0.5em', paddingLeft: '0.5em'}}>
          <div className='col-8'>
            <h5>أحدث البلاغات</h5>
            <div className='recent-reports-list'>
               <ListGroup variant="flush" id='recent-reports-ListGroup'>
                    <ListGroup.Item>
                        <div className='active-drone-row d-flex justify-content-between p-2'>
                            <div className='d-flex'>
                            <IoDocumentTextOutline className='recent-reports-icon ms-5'/>
                              <div>
                                <Row className='active-drones-drone-name'>Drone76</Row>
                                <Row className='active-drones-region-name'>منطقة الندى</Row>
                              </div>
                            </div>
                            <div>
                              <Button variant="secondary" size="sm" id="details-button">
                                  <BsArrowUpLeft /> التفاصيل
                              </Button>
                            </div>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className='active-drone-row d-flex justify-content-between p-2'>
                            <div className='d-flex'>
                              <IoDocumentTextOutline className='recent-reports-icon ms-5'/>
                              <div>
                                <Row className='active-drones-drone-name'>Drone76</Row>
                                <Row className='active-drones-region-name'>منطقة الندى</Row>
                              </div>
                            </div>
                            <div>
                              <Button variant="secondary" size="sm" id="details-button">
                                  <BsArrowUpLeft /> التفاصيل
                              </Button>
                            </div>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className='active-drone-row d-flex justify-content-between p-2'>
                            <div className='d-flex'>
                            <IoDocumentTextOutline className='recent-reports-icon ms-5'/>
                              <div>
                                <Row className='active-drones-drone-name'>Drone76</Row>
                                <Row className='active-drones-region-name'>منطقة الندى</Row>
                              </div>
                            </div>
                            <div>
                              <Button variant="secondary" size="sm" id="details-button">
                                  <BsArrowUpLeft /> التفاصيل
                              </Button>
                            </div>
                        </div>
                    </ListGroup.Item>
               </ListGroup>
            </div>
          </div>
          <div className='d-flex flex-column' style={{height: '100%', paddingTop: '0.7em', width: '25%'}}>
            <div>
              <Statistics_Card title={'إجمالي عدد البلاغات'} number={32} type={1}/>
            </div>
            <div style={{marginTop: '0.7em'}}>
              <Statistics_Card title={'عدد بلاغات هذا الأسبوع'} number={27} type={2}/>
            </div>
          </div>
       </div>
       <div style={{paddingRight: '0.5em', paddingLeft: '0.5em'}} className='pt-5'>
       <div className='reports-statistics'>
            <h5>البلاغات</h5>
            <hr className='mt-0'></hr>
            <div className='d-flex'>
              <div className='ms-4'>
                <div className='d-flex'>
                   <div className='reports-statistics-chart-keys ms-1' id="pending-key"></div>
                   <h6>بلاغات قيد الانتظار</h6>
                </div>
                <div className='d-flex'>
                   <div className='reports-statistics-chart-keys ms-1' id="underprocessing-key"></div>
                   <h6>بلاغات قيد المراجعة</h6>
                </div>
                <div className='d-flex'>
                   <div className='reports-statistics-chart-keys ms-1' id="closed-key"></div>
                   <h6>بلاغات مغلقة</h6>
                </div>
              </div>
              <ReportsChart/>
            </div>
          </div>
          <div>

          </div>
       </div>
     </div>
   </>
}
export default Dashboard_Employee;