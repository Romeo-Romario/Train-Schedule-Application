import TrainImg from "../../assets/images/trainStaing.gif";
import SearchBar from "./MainPageComponents/SearchBar";
import ScheduleTable from "./MainPageComponents/ScheduleTable";
import "./MainPage.css";
import { useState } from "react";

const MainPage = () => {
  const [searchText, SetSearchText] = useState("");
  const [searchType, SetSearchType] = useState("origin");
  const [sortStyle, SetSortStyle] = useState("origin");

  return (
    <div>
      <div className="background-image">
        <img src={TrainImg} alt="Background" />
      </div>
      <div className="container text-center top-container">
        <div className="card" style={{ minWidth: "769px" }}>
          <div className="row justify-content-between">
            <div className="col-4">
              <h2 className="card-title">Train Schedule</h2>
            </div>
          </div>
          <SearchBar
            setSearchType={SetSearchType}
            setSearchText={SetSearchText}
          ></SearchBar>
          <ScheduleTable
            searchedType={searchType}
            searchText={searchText}
            sortBy={sortStyle}
            setSortBy={SetSortStyle}
          ></ScheduleTable>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
