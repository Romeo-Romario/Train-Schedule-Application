import React from "react";
import TableEntity from "./TableEntity";
import { ScheduleEntity } from "../Types/SceduleEntity";
import { useState, useEffect } from "react";

interface Props {
  searchedType?: string;
  searchText?: string;
  sortBy: string;
  setSortBy: (el: string) => void;
}

const ScheduleTable = ({
  searchedType,
  searchText,
  sortBy,
  setSortBy,
}: Props) => {
  const [data, setData] = useState<ScheduleEntity[]>([]);

  const handleDelete = (deletedId: number) => {
    setData((prev) => prev.filter((schedule) => schedule.id !== deletedId));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = searchText
          ? `/api/schedule/search?param1=${searchedType}&param2=${searchText}`
          : `/api/schedule/all`;

        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error("Error fetching schedule data:", err);
      }
    };

    fetchData();
  }, [searchedType, searchText]);

  return (
    <div style={{ padding: "1.5vh" }}>
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" onClick={() => setSortBy("origin")}>
              Origin
            </th>
            <th scope="col" onClick={() => setSortBy("destination")}>
              Destination
            </th>
            <th scope="col" onClick={() => setSortBy("departureTime")}>
              Departure Time
            </th>
            <th scope="col" onClick={() => setSortBy("arrivalTime")}>
              Arrival Time
            </th>
            <th scope="col" onClick={() => setSortBy("date")}>
              Date
            </th>
            <th scope="col" onClick={() => setSortBy("trainNumber")}>
              Train Number
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((entity, index) => (
            <TableEntity
              key={entity.id}
              id={entity.id}
              index={index + 1}
              origin={entity.origin}
              destination={entity.destination}
              deppartureTime={entity.departureTime}
              arrivalTime={entity.arrivalTime}
              date={entity.date}
              trainNumber={entity.trainNumber}
              onDelete={handleDelete}
            ></TableEntity>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
