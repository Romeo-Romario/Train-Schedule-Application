import { useNavigate } from "react-router-dom";
interface Props {
  id: number;
  index: number;
  origin: string;
  destination: string;
  deppartureTime: string;
  arrivalTime: string;
  date: string;
  trainNumber: string;
  onDelete: (id: number) => void;
}

const TableEntity = ({
  id,
  index,
  origin,
  destination,
  deppartureTime,
  arrivalTime,
  date,
  trainNumber,
  onDelete,
}: Props) => {
  const navigate = useNavigate();
  const handleDetails = (e: React.MouseEvent) => {
    const isDropdownClick = (e.target as HTMLElement).closest(
      ".dropdown, .dropdown-toggle, .dropdown-menu"
    );

    if (!isDropdownClick) {
      navigate(`/schedule/${index}`, {
        state: {
          id: id,
          mode: "view",
          origin,
          destination,
          deppartureTime,
          arrivalTime,
          date,
          trainNumber,
        },
      });
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/schedule/${index}`, {
      state: {
        id: id,
        mode: "edit",
        origin,
        destination,
        deppartureTime,
        arrivalTime,
        date,
        trainNumber,
      },
    });
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await fetch(`/api/schedule/${id}`, {
        method: "DELETE",
      });
      onDelete(id);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <tr onClick={handleDetails}>
      <th scope="row">{index}</th>
      <td>{origin}</td>
      <td>{destination}</td>
      <td>{deppartureTime}</td>
      <td>{arrivalTime}</td>
      <td>{date}</td>
      <td>{trainNumber}</td>
      <td className="text-end">
        <div className="btn-group dropstart">
          <button
            type="button"
            className="btn btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            &#8942;
          </button>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li>
              <button className="dropdown-item" onClick={handleEdit}>
                ✏️ Edit
              </button>
            </li>
            <li>
              <button
                className="dropdown-item text-danger"
                onClick={handleDelete}
              >
                🗑 Delete
              </button>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default TableEntity;
