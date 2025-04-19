import TableEntity from "./TableEntity";
import { ScheduleEntity } from "../Types/SceduleEntity";
import { useState, useEffect } from "react";

interface Props {
  searchedType?: string;
  searchText?: string;
  sortBy: string;
  setSortBy: (value: string) => void;
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
        const params = new URLSearchParams();
        if (searchedType && searchText) {
          params.append("param1", searchedType);
          params.append("param2", searchText);
        }
        if (sortBy) {
          params.append("sortBy", sortBy);
        }

        const url = searchText
          ? `${
              import.meta.env.VITE_API_URL
            }/schedule/search?${params.toString()}`
          : `${import.meta.env.VITE_API_URL}/schedule/all?${params.toString()}`;

        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error("Error fetching schedule data:", err);
      }
    };

    fetchData();
  }, [searchedType, searchText, sortBy]);

  return (
    <div style={{ padding: "1.5vh" }}>
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setSortBy("origin")}
              >
                Origin
              </button>
            </th>
            <th scope="col">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setSortBy("destination")}
              >
                Destination
              </button>
            </th>
            <th scope="col">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setSortBy("departureTime")}
              >
                Departure Time
              </button>
            </th>
            <th scope="col">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setSortBy("arrivalTime")}
              >
                Arrival Time
              </button>
            </th>
            <th scope="col">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setSortBy("date")}
              >
                Date
              </button>
            </th>
            <th scope="col">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setSortBy("trainNumber")}
              >
                Train Number
              </button>
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
