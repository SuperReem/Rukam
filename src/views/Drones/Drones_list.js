import Button from "react-bootstrap/Button";
import { AiOutlinePlus } from "react-icons/ai";
import "./Drones_list.css";
import { useState } from "react";
import drone from "../../assets/images/DRONE_ICON.png"


function DroneList() {
  const [imgFile, setImgFile] = useState('');
  const [dronName, setDronName] = useState('');


  return (
    <>

      <div className=" d-flex align-items-center justify-content-between">
        <div className="">قائمة الدرون</div>
        <Button variant="secondary" size="sm" className="darkbtn">
          <AiOutlinePlus /> إضافة درون
        </Button>
      </div>


      <div className="position-relative mt-4 ">
      <img src={drone} alt="" className=" position-absolute translate-middle  rounded-circle  border border-white  border-5  " height={100} width={100}/>

      <div className="statistics-cards">


              {/* <p className='statistics-cards-title'>المنطقة الأعلى مخالفات</p> */}
              <div className='d-flex'>
               {/* <SlLocationPin className='statistics-cards-icon'/> */}
               <div>
                <p className='statistics-cards-number mb-0'>حطين</p>
                <p className='fs-6'>٢٠٠ مخالفة</p>
               </div>
              </div>
              </div>
            </div>
    </>
  );
}

export default DroneList;
