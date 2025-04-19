import { useLocation, useParams } from "react-router-dom";
import TrainImg from "../../assets/images/vibeTrainMoving.gif";
import "./SceduleDetailPage.css";
import { useRef, FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
const ScheduleDetailPage = () => {
  const { state } = useLocation() as {
    state?: {
      mode: "view" | "edit" | "add";
      index?: number;
      id: number;
      origin?: string;
      destination?: string;
      deppartureTime?: string;
      arrivalTime?: string;
      date?: string;
      trainNumber?: string;
    };
  };
  const mode = state?.mode ?? "view";
  const isReadOnly = mode === "view";
  const isEdit = mode === "edit";
  const isAdd = mode === "add";
  const { index } = useParams();

  const [navigateToMain, setNavigateToMain] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isInvalid, SetinValid] = useState(false);
  if (!state)
    return <div className="container text-center">No data found.</div>;

  const [id, _] = useState(state.id);
  const [origin, setOrigin] = useState(state.origin);
  const [destination, setDestination] = useState(state.destination);
  const [departureTime, setDepartureTime] = useState(state.deppartureTime);
  const [arrivalTime, setArrivalTime] = useState(state.arrivalTime);
  const [date, setDate] = useState(state.date);
  const [trainNumber, setTrainNumber] = useState(state?.trainNumber);

  const handleAddition = async (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const form = formRef.current;

    if (form && form.checkValidity()) {
      const scheduleDto = {
        origin,
        destination,
        departureTime,
        arrivalTime,
        date,
        trainNumber,
      };

      try {
        let response;
        if (isAdd) {
          response = await fetch(
            `${import.meta.env.VITE_API_URL}/schedule/create`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(scheduleDto),
            }
          );
        }
        if (isEdit) {
          console.log(id);
          response = await fetch(
            `${import.meta.env.VITE_API_URL}/schedule/${id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(scheduleDto),
            }
          );
        }
        const data = await response!.json();
        console.log(data.message);
        setNavigateToMain(true);
      } catch (err) {
        console.log("Bad request", err);
        SetinValid(true);
      }
    } else {
      console.log("Bad form");
      console.log(form!.checkValidity());
      console.log(form);

      SetinValid(true);
    }
  };

  if (navigateToMain) {
    return <Navigate to="/main" />;
  }

  return (
    <div>
      <div className="background-image">
        <img src={TrainImg} alt="Background" />
      </div>
      <div className="container text-center top-container">
        <div className="card">
          <h2>Train Schedule #{index}</h2>
          <form
            ref={formRef}
            className="row g-5 needs-validation p-5"
            noValidate
            onSubmit={handleAddition}
          >
            <div className="col-md-6">
              <label htmlFor="validationCustom01" className="form-label">
                <strong>Origin: </strong>
              </label>
              <input
                type="text"
                value={origin}
                className={`form-control ${isInvalid ? " is-invalid" : ""}`}
                id="validationCustom01"
                readOnly={isReadOnly}
                required
                onChange={(e) => setOrigin(e.target.value)}
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="validationCustom02" className="form-label">
                <strong>Destination</strong>
              </label>
              <input
                type="text"
                className={`form-control ${isInvalid ? " is-invalid" : ""}`}
                id="validationCustom02"
                value={destination}
                readOnly={isReadOnly}
                required
                onChange={(e) => setDestination(e.target.value)}
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="validationCustomUsername" className="form-label">
                <strong>Departure time:</strong>
              </label>
              <div className="input-group has-validation">
                <input
                  type="text"
                  className={`form-control ${isInvalid ? " is-invalid" : ""}`}
                  id="validationCustomUsername"
                  aria-describedby="inputGroupPrepend"
                  value={departureTime}
                  readOnly={isReadOnly}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  required
                />
                <div className="invalid-feedback">Something wrong</div>
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="validationCustom03" className="form-label">
                <strong>Arrival Time:</strong>
              </label>
              <input
                type="text"
                className={`form-control ${isInvalid ? " is-invalid" : ""}`}
                id="validationCustom03"
                value={arrivalTime}
                readOnly={isReadOnly}
                onChange={(e) => setArrivalTime(e.target.value)}
                required
              />
              <div className="invalid-feedback">Please enter arrival time.</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="validationCustom04" className="form-label">
                <strong>Date:</strong>
              </label>
              <input
                type="text"
                className={`form-control ${isInvalid ? " is-invalid" : ""}`}
                id="validationCustom04"
                value={date}
                readOnly={isReadOnly}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <div className="invalid-feedback">Please enter date.</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="validationCustom05" className="form-label">
                <strong>Train Number: </strong>
              </label>
              <input
                type="text"
                className={`form-control ${isInvalid ? " is-invalid" : ""}`}
                id="validationCustom05"
                value={trainNumber}
                readOnly={isReadOnly}
                onChange={(e) => setTrainNumber(e.target.value)}
                required
              />
              <div className="invalid-feedback">Something wrong</div>
            </div>
            {!isReadOnly && (
              <div className="col-12">
                <button
                  className={`btn btn-${isEdit ? "success" : "primary"} btn-lg`}
                  type="submit"
                >
                  {isEdit ? "Save Changes" : "Add Schedule"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetailPage;
