import './ReportDetails.css';
import { FiSave } from "react-icons/fi";
import Waste from '../../assets/images/waste.png';
import Button from "react-bootstrap/Button"
import { BsCalendar4 } from "react-icons/bs";



import React from "react";


function EditReport() {
  return (
    <div className="App">
        <div className="row">
          <div className="">
            <h1 class="h5 text-end">البلاغات  تفاصيل البلاغ</h1>
          </div>
        </div>
        <div className="row">
        <div className="col-sm-12">
          <div className="m-2">
          <div id="title"> تحرير البلاغ</div>
          </div>
        </div>
    </div>
        <div class="he shadow-sm ms-4 me-3 rounded-4">

<div className="row">
    <div className="col-sm-6 ">
      <div className="m-2 ">
        <div className="heading text-end pe-2">
          الوقت والتاريخ
        </div>
        <hr className="hr m-0 p-2" />
        <div className="container time  rounded p-1 mb-2 align-items-right ">
<BsCalendar4 color='var(--primary)' className='ms-4'/>       
     
٢٠ اكتوبر - ١٢ مساءا
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
     <textarea className="notes p-2" id=""  rows="3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem voluptate laborum corporis laboriosam provident iste nam aut obcaecati dignissimos eligendi debitis suscipit aperiam, maxime enim molestiae distinctio rerum dolores quod!</textarea>
  

      </div>
    </div>
    <div className="col-sm-6">
      <div className="m-2">
        <div className="heading text-end pe-2">
          حالة البلاغ
        </div>
        <hr className="hr m-0 p-2" />
        <div className="container status rounded p-1  d-flex justify-content-center mb-2">
          قيد المراجعة
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
            <FiSave/>   &nbsp;
            حفظ

              </Button>
            </div>
            <div className="col-6">
              <Button variant="secondary" size="lg" className="cancel btn">  إلغاء </Button>
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

export default EditReport;

