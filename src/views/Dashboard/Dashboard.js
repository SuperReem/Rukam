import './dashboard.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import DroneIcon from '../../assets/images/DRONE_ICON.png';
import {SlLocationPin} from 'react-icons/sl';
import {IoWarningOutline} from 'react-icons/io5';
import {TbReportAnalytics,TbDrone} from 'react-icons/tb';
import { BsArrowUpLeft } from "react-icons/bs";
const Dashboard = ()=>{
    
    return <>
    <div>
        <div className="statistics-cards-container">
            <div className="statistics-cards">
              <p className='statistics-cards-title'>المنطقة الأعلى مخالفات</p>
              <div className='d-flex'>
               <SlLocationPin className='statistics-cards-icon'/>
               <div>
                <p className='statistics-cards-number mb-0'>حطين</p>
                <p className='fs-6'>٢٠٠ مخالفة</p>
               </div>
              </div>
            </div>
            <div className="statistics-cards">
               <p className='statistics-cards-title'>عدد مخالفات هذا الأسبوع</p>
               <div className='d-flex align-items-center'>
                <IoWarningOutline className='statistics-cards-icon'/>
                <div className='d-flex'>
                 <p className='statistics-cards-number mb-0 mt-2'>182</p>
                </div>
               </div>
            </div>
            <div className="statistics-cards">
               <p className='statistics-cards-title'>عدد بلاغات هذا الأسبوع</p>
               <div className='d-flex align-items-center'>
                <TbReportAnalytics className='statistics-cards-icon'/>
                <div className='d-flex'>
                 <p className='statistics-cards-number mb-0 mt-2'>132</p>
                </div>
               </div>
            </div>
            <div className="statistics-cards">
               <p className='statistics-cards-title'>عدد الدرونز المفعلة</p>
               <div className='d-flex align-items-center'>
                <TbDrone className='statistics-cards-icon'/>
                <div className='d-flex'>
                 <p className='statistics-cards-number mb-0 mt-2'>6</p>
                </div>
               </div>
            </div>
        </div>
        <div className='active-drones-container'>
          <div className='d-flex justify-content-between pb-2'>
            <h5 className='active-drones-title'>الدرونز المفعلة</h5>
            <button id='show-all-button'>عرض الكل</button>
          </div>
          <div className='active-drones-list-container'>
            <div className='active-drones-list'>
               <ListGroup variant="flush" id='Active-Drones-ListGroup'>
                    <ListGroup.Item>
                        <Row className='active-drone-row'>
                          <Col>
                            <img src={DroneIcon} className='active-drone-icon'></img>
                          </Col>
                          <Col>
                            <Row className='active-drones-drone-name'>Drone76</Row>
                            <Row className='active-drones-region-name'>منطقة الندى</Row>
                          </Col>
                          <Col>
                          <Col>
                            <Button variant="secondary" size="sm" id="current-loc-button">
                                <SlLocationPin /> الموقع الحالي
                            </Button>
                            <Button variant="secondary" size="sm" id="details-button">
                                <BsArrowUpLeft /> التفاصيل
                            </Button>
                          </Col>
                          </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row className='active-drone-row'>
                          <Col>
                            <img src={DroneIcon} className='active-drone-icon'></img>
                          </Col>
                          <Col>
                            <Row className='active-drones-drone-name'>Dron56</Row>
                            <Row className='active-drones-region-name'>منطقة الروابي</Row>
                          </Col>
                          <Col>
                            <Button variant="secondary" size="sm" id="current-loc-button">
                                <SlLocationPin /> الموقع الحالي
                            </Button>
                            <Button variant="secondary" size="sm" id="details-button">
                                <BsArrowUpLeft /> التفاصيل
                            </Button>
                          </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row className='active-drone-row'>
                          <Col>
                           <img src={DroneIcon} className='active-drone-icon'></img>
                          </Col>
                          <Col>
                            <Row className='active-drones-drone-name'>Drone32</Row>
                            <Row className='active-drones-region-name'>منطقة حطين</Row>
                          </Col>
                          <Col>
                            <Button variant="secondary" size="sm" id="current-loc-button">
                                <SlLocationPin /> الموقع الحالي
                            </Button>
                            <Button variant="secondary" size="sm" id="details-button">
                                <BsArrowUpLeft /> التفاصيل
                            </Button>
                          </Col>
                        </Row>
                    </ListGroup.Item>
               </ListGroup>
            </div>
          </div>
        </div>
    </div>
    </>
}
export default Dashboard;