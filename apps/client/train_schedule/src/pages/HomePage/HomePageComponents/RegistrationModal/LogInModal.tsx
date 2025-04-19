import React, { FormEvent, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
const LogInModal = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [navigateToMain, setNavigateToMain] = React.useState(false);

  // Check Validity
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputInvalid, setInputInvalid] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const form = formRef.current;

    if (form && form.checkValidity()) {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/user/check?email=${email}&password=${password}`
        );

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const isValid = await response.json();

        if (isValid) {
          setNavigateToMain(true);
        } else {
          setInputInvalid(true);
        }
      } catch (err) {
        setInputInvalid(true);
        console.error("Login error:", err);
      }
    }
  };

  if (navigateToMain) {
    const modalBackdrop = document.querySelector(".modal-backdrop");
    if (modalBackdrop) modalBackdrop.remove();

    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";

    const modal = document.querySelector(".modal");
    if (modal) modal.classList.remove("show");
    return <Navigate to="/main" />;
  }
  return (
    <div
      className="tab-pane fade show active"
      id="home-tab-pane"
      role="tabpanel"
      aria-labelledby="home-tab"
      tabIndex={0}
    >
      <form
        ref={formRef}
        className="row g-3 p-3 needs-validation"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="col-md-15">
          <label htmlFor="validationCustomUsername" className="form-label">
            Email
          </label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend">
              @
            </span>
            <input
              type="email"
              className={`form-control ${inputInvalid ? " is-invalid" : ""}`}
              id="validationCustomUsername"
              aria-describedby="inputGroupPrepend"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="invalid-feedback">Wrong</div>
          </div>
        </div>
        <div className="col-md-15">
          <label htmlFor="validationCustom03" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${inputInvalid ? " is-invalid" : ""}`}
            id="validationCustom03"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="invalid-feedback">Wrong</div>
        </div>
        <div className="col-12">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

// TODO: Needs to be implemented

export default LogInModal;
