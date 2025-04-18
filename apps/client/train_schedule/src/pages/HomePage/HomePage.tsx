import Train from "../../assets/images/train.png";
import TitleCard from "./HomePageComponents/Cards/TitleCard";
import GridCard from "./HomePageComponents/Cards/GridCard";
import RegistrationModal from "./HomePageComponents/RegistrationModal/RegistrationModal";
import { useEffect } from "react";
import "./HomePage.css";
const HomePage = () => {
  useEffect(() => {
    const modalEl = document.getElementById("exampleModal");
    const inputEl = document.getElementById("myInput");

    if (modalEl && inputEl) {
      modalEl.addEventListener("shown.bs.modal", () => {
        inputEl.focus();
      });
    }
  }, []);
  return (
    <div className="container text-center" style={{}}>
      <img src={Train} style={{ width: "40%" }} />
      <h1>
        Wizard railway <br /> Works!
      </h1>
      <TitleCard headerText="Now we are open for our new customers!">
        We are delighted to announce that our key online services are now fully
        restored and operating smoothly once again, ready to enhance your
        magical journeys.
      </TitleCard>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title p-3" style={{ paddingTop: "1.5vh" }}>
            You can once more access:
          </h3>
          <div className="row row-cols-2">
            <GridCard>
              Our official website and the enchanted scroll on your device for
              purchasing your enchanted passage.
            </GridCard>
            <GridCard>
              Our passenger portal featuring the schedule of all our mystical
              routes and any important travel updates.
            </GridCard>
            <GridCard>
              The dedicated site for our swift and convenient "City Charms
              Express" services.
            </GridCard>
            <GridCard>
              Our online services portal for all your additional magical travel
              needs.
            </GridCard>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "5vh",
        }}
      >
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{ width: "50%", alignItems: "center", padding: "1.5vh" }}
          data-bs-toggle="modal"
          data-bs-target="#registerModal"
        >
          Register Now
        </button>
      </div>
      <RegistrationModal></RegistrationModal>
    </div>
  );
};

export default HomePage;
