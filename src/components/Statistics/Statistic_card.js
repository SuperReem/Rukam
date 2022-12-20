import './Statistic_card.css'
import {IoWarningOutline} from 'react-icons/io5';
import {TbReportAnalytics,TbDrone} from 'react-icons/tb';
const Statistics_Card = ({title,number,type}) =>{
    return <>
    <div className="statistics-cards">
        <p className='statistics-cards-title'>{title}</p>
        <div className='d-flex align-items-center'>
        {type === 1? <IoWarningOutline className='statistics-cards-icon'/> : type === 2? <TbReportAnalytics className='statistics-cards-icon'/> : <TbDrone className='statistics-cards-icon'/> }
        <div className='d-flex'>
            <p className='statistics-cards-number mb-0 mt-2'>{number}</p>
        </div>
        </div>
     </div>
    </>
}
export default Statistics_Card;