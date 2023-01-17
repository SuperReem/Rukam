import { useState } from "react";
import { IoChevronDownSharp } from 'react-icons/io5';

function Dropdown({ region, setRegion }) {
  const [isActive, setIsActive] = useState(false);
  const options = ["حطين", "عرقه", "النخيل"];
  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
       
        {region}
        <span className="fas fa-caret-down" style={{paddingRight:"14.5rem",color:"black"}}> 
        <IoChevronDownSharp/>

        </span>
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
