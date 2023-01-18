import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
//import drone from "../../assets/images/DRONE_ICON.png";
import Drone_card from "../../components/Drones/Drone_card";
import { useDronesContext } from "../../hooks/useDronesContext";
import ArabicNumbers from "react-native-arabic-numbers/src/ArabicNumbers";
import Dropdown from "./Dropdown";
import "./Dropdown_Style.css";
import "./Drones_list.css";
import droneImg from "../../assets/images/Drone.png";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowUpLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { IoAddCircle } from 'react-icons/io5';
import {IoAddSharp } from 'react-icons/io5';
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";

function DroneList() {


  const [imgFile, setImgFile] = useState("");
  const [dronName, setDronName] = useState("");
  // const [Drones, setDrones] = useState(null);

  // useEffect(() => {
  //   const fetchDrones = async () => {
  //     const response = await fetch("/api/Drone/drones");
  //     const json = await response.json();

  //     if (response.ok) {
  //       setDrones(json);
  //       console.log("okay");
  //     }
  //   };

  //   fetchDrones();
  // }, []);
  const [droneName , setName] = useState('')
  const [region , setRegion] = useState("اختر المنطقه")
  const [image , setImage] = useState('')
  
  const { drones, dispatch } = useDronesContext();
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  const handle = async (e) => {
    e.preventDefault();

    const drone = {
      droneName,
      region,
      image: "kkkkk",
    };

    const response = await fetch("/api/Drone", {
      method: "POST",
      body: JSON.stringify(drone),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log("new drone not added:");
    }
    if (response.ok) {
      setName('')
      setRegion('')
     console.log("new drone added:", json);
    //  dispatch({ type: "CREATE_DRONE", payload: json });
    }
  };


  useEffect(() => {
    var fetchDrones = async () => {
      const response = await fetch(
        `http://localhost:3000/api/Drone/drones?page=${pageNumber}`
      )
        .then((response) => response.json())
        .then(({ totalPages, drones }) => {
          dispatch({ type: "SET_DRONES", payload: drones });
          setNumberOfPages(totalPages);
        });
    };

    fetchDrones();
  }, [dispatch, pageNumber]);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };
  return (
    <div>
      <div className=" d-flex align-items-center justify-content-between">
        <div className="" id="title">
          قائمة الدرون
        </div>

        <Button variant="secondary" size="sm" className="darkbtn" data-bs-toggle="modal"
                      data-bs-target="#myModal" >
          <AiOutlinePlus /> إضافة درون
        </Button>
      </div>

      <div class="container-fluid bg-3 text-center divSizing">
        {/* <div class="row"> */}

        {/* <div class=""> */}

        <div class="row text-center  mt-4  ">
          {/* mt-sm-5 mt-lg-1 */}

          {drones &&
            drones.map((Drone) => <Drone_card drone={Drone} key={Drone._id} />)}
        </div>

        {/* <div class=" card-body avatar mx-auto white avatar-container text-center mx-auto position-relative pb-0 pt-2">
                    <img
                      class="
      card-img-top bg-white  mx-auto  shadow-sm 
     img-circle rounded-circle   p-1  position-absolute top-0 start-50 translate-middle 
      "
                      src={drone}
                      alt=""
                    />
                   
                      <h4 class="card-title mt-5 mb-0">Drone514</h4>
                      <Button variant="secondary" size="sm" className="mt-0 mb-0">
                        <BsArrowUpLeft /> التفاصيل
                      </Button>
                   
                  </div> */}
                 </div>  

                 <div>

                 
        <div id="pagination">
          {pageNumber + 1 == 1 ? (
            <button class="btn btn-primary btn-circle btn-smdis" disabled>
              <BsChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={gotoPrevious}
              class="btn btn-primary btn-circle btn-sm"
            >
              <BsChevronRight size={18} />
            </button>
          )}
          {pages.map((pageIndex) =>
            pageNumber == pageIndex ? (
              <button
                key={pageIndex}
                onClick={() => setPageNumber(pageIndex)}
                class="btn btn-primary btn-circle btn-smpree"
              >
                {ArabicNumbers(pageIndex + 1)}
              </button>
            ) : (
              <button
                key={pageIndex}
                onClick={() => setPageNumber(pageIndex)}
                class="btn btn-primary btn-circle btn-sm"
              >
                {ArabicNumbers(pageIndex + 1)}
              </button>
            )
          )}
          {pageNumber + 1 == numberOfPages ? (
            <button class="btn btn-primary btn-circle btn-smdis" disabled>
              <BsChevronLeft size={18} />
            </button>
          ) : (
            <button
              onClick={gotoNext}
              class="btn btn-primary btn-circle btn-sm"
            >
              <BsChevronLeft size={18} />
            </button>
          )}
        </div>

        <div id="page-number2">
          {" "}
          صفحة {ArabicNumbers(pageNumber + 1)} - {ArabicNumbers(numberOfPages)}
        </div>
     </div>



     <div>
        <div className="modal" id="myModal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="">
                <div className="row align-items-center  justify-content-end  pt-2">
                
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

                  <div className="col-4 p-0 ">
                  <div class="add-img" >
      <IoAddCircle color="#B5864C"/> 
      </div>
                  <img src = {droneImg} class="
       bg-white  mx-auto  biggerImg 
      img-circle rounded-circle
      
      
    
      "  alt="Drone"/>
      
                  </div>

                    <div className="row align-items-center justify-content-between  h5">
                 
                    <div class="row  m-0" >
      <div className="container w-75 m-3">
        <form >
          
          <div class="form-group ">
          <label class="form-label  classLabel" 
          for="droneName">
                  اسم الدرون
           </label>
           <input 
           
           type="text"
           style={{width: "350px" ,}}
          name="name"
          id="droneName" 
          className="form-control classInput" 
          required 
           value={droneName}
           onChange={(e) => setName(e.target.value)}
          />
          </div>



          <div class="form-group">

          <label class="form-label  classLabel" 
          for="">
               المنطقة 
           </label>
           <Dropdown 
           region={region} setRegion={setRegion} 
            value={droneName}
             onChange={(e) => setRegion(e.target.value)}
           />

          </div>
          </form>
          </div>
          </div>



                    </div>
                    {/* <div className="row justify-content-start align-items-start">
                      <div className="col-8 h5">
             
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              <div></div>

              <div className="modal-footer border border-0 justify-content-evenly">
      
  
              {/* <Button
                  variant="secondary"
                  size="md"
                  className="popup btn "
         // onClick={Accept}
          data-bs-dismiss="modal"
                >
           
إضافة
               </Button> */}
                <button 
                onClick={handle}
                data-bs-dismiss="modal"
                        type="button"
                        className="btn btn-primary my-2  px-3 classButton">
                        <IoAddSharp/>
                      إضافة

                        </button>
          

       
              {/* <Button
                  variant="secondary"
                  size="md"
                  className="popup btn "
                  data-bs-dismiss="modal"
                >
           
               إلغاء
                </Button> */}
                <button
                data-bs-dismiss="modal"
                        type="button"
                        className="btn btn-primary my-2  px-4 classButton2">إلغاء</button>
  

              </div>
            </div>
          </div>
        </div>
      </div>




    </div>
  );
}

export default DroneList;
