import { useState } from "react";
import RegistrationNavBar from "./RegistrationNavBar";
import LogInModal from "./LogInModal";
import SignInModal from "./SignInModal";
import "./RegistrationModalDialog.css";

const RegistrationModal = () => {
  // Registration Modal Hook
  // Style either LogIn or SignIn
  const [_, setStyle] = useState(true);

  return (
    <div
      className="modal fade"
      id="registerModal"
      tabIndex={-1}
      aria-labelledby="modalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div style={{ padding: "1.5vh" }}>
            <RegistrationNavBar
              LogIn={() => setStyle(true)}
              SignIn={() => setStyle(false)}
            ></RegistrationNavBar>
            <div className="tab-content" id="myTabContent">
              <LogInModal></LogInModal>
              <SignInModal></SignInModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
