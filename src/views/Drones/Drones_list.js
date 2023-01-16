import Button from "react-bootstrap/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowUpLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./Drones_list.css";
import { useEffect, useState } from "react";
import drone from "../../assets/images/DRONE_ICON.png";
import Drone_card from "../../components/Drones/Drone_card";
import { useDronesContext } from "../../hooks/useDronesContext";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import ArabicNumbers from "react-native-arabic-numbers/src/ArabicNumbers";

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

  const { drones, dispatch } = useDronesContext();
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

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

        <Button variant="secondary" size="sm" className="darkbtn">
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
    </div>
  );
}

export default DroneList;
