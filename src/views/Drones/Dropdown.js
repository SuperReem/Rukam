import { useState } from "react";
import { IoChevronDownSharp } from 'react-icons/io5';

function Dropdown({ region, setRegion }) {
  const [isActive, setIsActive] = useState(false);
  const options = ["حطين", "عرقه", "النخيل"];
  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
       <div className="row">
        <div className="col-11">
        {region}
        </div>
        <div className="col-1 p-0">
        <span className="fas fa-caret-down " style={{color:"black"}}> 
        <IoChevronDownSharp/>
        </span>
        </div>
        </div>
      </div>
     
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              onClick={(e) => {
                setRegion(option);
                setIsActive(false);
              }}
              className="dropdown-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
