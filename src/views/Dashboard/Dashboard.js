import './dashboard.css';
import {SlLocationPin} from 'react-icons/sl';
import {IoWarningOutline} from 'react-icons/io5';
import {TbReportAnalytics,TbDrone} from 'react-icons/tb';
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
    </div>
    </>
}
export default Dashboard;