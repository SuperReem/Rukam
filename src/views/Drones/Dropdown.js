import { useState } from "react";


function Dropdown({ region, setRegion }) {
  const [isActive, setIsActive] = useState(false);
  const options = ["حطين", "عرقه", "النخيل"];
  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
        <span className="fas fa-caret-down"></span>
        {region}
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
