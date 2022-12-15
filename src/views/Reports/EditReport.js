
import './ReportDetails.css';
import{useNavigate} from 'react-router-dom';

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
          <div className="bg-primary m-2">
            <h1 class="display-6 text-end">تفاصيل البلاغ</h1>
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
        <div className="container time bg-warning rounded p-1 mb-2">
          ٢٠ اكتوبر
        </div>
        <div className="heading text-end pe-2">
          صور المخالفة
        </div>
        <hr className="hr m-0 p-2" />
        <div className="container pic rounded bg-success mb-2">
          jnhbgv
        </div>
        <div className="heading text-end pe-2">
          ملاحظات
        </div>
        <hr className="hr m-0 p-2" />
     <textarea className="notes" id=""  rows="4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem voluptate laborum corporis laboriosam provident iste nam aut obcaecati dignissimos eligendi debitis suscipit aperiam, maxime enim molestiae distinctio rerum dolores quod!</textarea>
      </div>
    </div>
    <div className="col-sm-6">
      <div className="m-2">
        <div className="heading text-end pe-2">
          حالة البلاغ
        </div>
        <hr className="hr m-0 p-2" />
        <div className="container status bg-warning rounded p-1 mb-2">
          قيد المراجعة
        </div>
        <div className="heading text-end pe-2">
          موقع المخالفة
        </div>
        <hr className="hr m-0 p-2" />
        <div className="container pic rounded bg-success mb-5">
          jnhbgv
        </div>
        <div className="row"> </div>
        <div className="container mt-5 pt-5">
          <div className="row">
            <div className="col-6">
              <button type="button" class="btn btn-dark" >حفظ</button>
            </div>
            <div className="col-6">
              <button type="button" class="btn btn-dark" >إلغا</button>
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
