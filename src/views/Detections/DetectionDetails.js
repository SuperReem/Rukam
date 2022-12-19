import '../Reports/ReportDetails.css';
import Waste from '../../assets/images/waste.png';
import Button from "react-bootstrap/Button"
import { BsCalendar4 } from "react-icons/bs";
import { MdOutlineModeEditOutline } from "react-icons/md";


import React from "react";


function DetectionDetails() {
  return (

    <div className="App">
        <div className="row">
          <div className="">
            <h1 class="h5 text-end">المواقع المخالفة  موقع مخالف</h1>
          </div>
        </div>
        <div className="row">
        <div className="col-sm-12">
          <div className="m-2">
          <div id="title"> موقع مخالف</div>
          </div>
        </div>
    </div>
        <div class="he shadow-sm ms-4 me-3 rounded-4">

<div className="row">
    <div className="col-sm-6 ">
      <div className="m-2 ">
        <div className="heading text-end pe-2">
          اسم الدرون
        </div>
        <hr className="hr m-0 p-2" />
        <div className="container h4  rounded p-1 mb-2 align-items-right ">
Drone21     
   </div>
        <div className="heading text-end pe-2">
          صور المخالفة
        </div>
        <hr className="hr m-0 p-2" />
        <div className="container pic rounded mb-2 shadow-sm">
        <img src={Waste} alt="Waste" />;
        </div>
        <div className="heading text-end pe-2">
          ملاحظات
        </div>
        <hr className="hr m-0 p-2" />
        <div className='ps-5 ms-5 justify-content-end'>
          <p className="h6">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem reprehenderit magni, odio eligendi laborum possimus, quaerat quos nisi, delectus sit fugiat ducimus nulla expedita libero quia totam minima eius unde!
          </p>
          </div>

      </div>
    </div>
    <div className="col-sm-6">
      <div className="m-2">
        <div className="heading text-end pe-2">
الوقت والتاريخ        </div>
        <hr className="hr m-0 p-2" />
        <div className="container time  rounded p-1 mb-2 align-items-right ">
        <BsCalendar4 color='var(--primary)' className='ms-4'/>  
        ٢٠ اكتوبر - ١٢ مساءا
        </div>
        <div className="heading text-end pe-2">
          موقع المخالفة
        </div>
        <hr className="hr m-0 p-2" />
        <div className="container pic rounded shadow-sm mb-5">
       
        </div> 
        <div className="row"> </div>
        <div className="container mt-5 pt-5">
          <div className="row">
            <div className="col-6">
            <Button variant="secondary" size="lg" className="edit justify-content-between">  

       <MdOutlineModeEditOutline color='white' />   &nbsp; تحرير
              </Button>
            </div>
            <div className="col-6">
              <Button variant="secondary" size="lg" className="send btn"> إرسال البلاغ</Button>
            </div>
            </div>
        </div>
      </div>
    </div>

  </div>
</div>
    </div>
  );
}

export default DetectionDetails;
