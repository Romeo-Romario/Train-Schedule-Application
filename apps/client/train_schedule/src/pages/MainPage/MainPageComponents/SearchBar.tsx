import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
interface Props {
  setSearchType: (el: string) => void;
  setSearchText: (el: string) => void;
}

const SearchBar = ({ setSearchType, setSearchText }: Props) => {
  const [buttonText, SetButtonText] = useState("Origin");
  const navigate = useNavigate();
  const handleAddition = (_: React.MouseEvent) => {
    navigate(`/schedule/`, {
      state: {
        mode: "add",
      },
    });
  };
  return (
    <div className="d-flex px-5 gap-5 align-items-end pt-3">
      <div className="flex-grow-1">
        <input
          className="form-control"
          type="text"
          placeholder="Default input"
          aria-label="default input example"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="col-md-2" style={{ textAlign: "left" }}>
        <label htmlFor="filterDropdown" className="form-label">
          Text search filter
        </label>
        <div className="dropdown-center" id="filterDropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {buttonText}
          </button>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li
              className="dropdown-item"
              onClick={() => {
                setSearchType("origin");
                SetButtonText("Origin");
              }}
            >
              Origin
            </li>
            <li
              className="dropdown-item"
              onClick={() => {
                setSearchType("destination");
                SetButtonText("Destination");
              }}
            >
              Destination
            </li>
            <li
              className="dropdown-item"
              onClick={() => {
                setSearchType("departureTime");
                SetButtonText("Departure time");
              }}
            >
              Departure time
            </li>
            <li
              className="dropdown-item"
              onClick={() => {
                setSearchType("arrivalTime");
                SetButtonText("Arrival time");
              }}
            >
              Arrival time
            </li>
            <li
              className="dropdown-item"
              onClick={() => {
                setSearchType("date");
                SetButtonText("Date");
              }}
            >
              Date
            </li>
            <li
              className="dropdown-item"
              onClick={() => {
                setSearchType("trainNumber");
                SetButtonText("Train Number");
              }}
            >
              Train Number
            </li>
          </ul>
        </div>
      </div>
      <div className="col-md-2">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleAddition}
        >
          Add new
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
