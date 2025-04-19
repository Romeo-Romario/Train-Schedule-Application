import React, { FormEvent, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
const SignInModal = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [navigateToMain, setNavigateToMain] = React.useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setInvalid] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const form = formRef.current;

    const userData = {
      firstName: firstName as string,
      lastName: lastName as string,
      email: email as string,
      password: password as string,
    };

    if (form && form.checkValidity()) {
      try {
        const response = await fetch("/api/user/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
        console.log(response);
        if (response.ok) {
          setNavigateToMain(true);
        }
      } catch (error) {
        setInvalid(true);
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
      className="tab-pane fade"
      id="profile-tab-pane"
      role="tabpanel"
      aria-labelledby="profile-tab"
      tabIndex={1}
    >
      <form
        ref={formRef}
        className="row g-3 needs-validation"
        noValidate
        onSubmit={handleSubmit}
        style={{ paddingTop: "1.5vh" }}
      >
        <div className="col-md-15">
          <label htmlFor="validationDefault01" className="form-label">
            First name
          </label>
          <input
            type="text"
            className={`form-control ${isInvalid ? " is-invalid" : ""}`}
            id="validationDefault01"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-15">
          <label htmlFor="validationDefault02" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className={`form-control ${isInvalid ? " is-invalid" : ""}`}
            id="validationDefault02"
            defaultValue="Otto"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-15">
          <label htmlFor="validationDefault03" className="form-label">
            Email
          </label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend">
              @
            </span>
            <input
              type="email"
              className={`form-control ${isInvalid ? " is-invalid" : ""}`}
              id="validationDefault03"
              aria-describedby="inputGroupPrepend"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="invalid-feedback">Please enter your email</div>
          </div>
        </div>
        <div className="col-md-15">
          <label htmlFor="validationDefault04" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${isInvalid ? " is-invalid" : ""}`}
            id="validationDefault04"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="invalid-feedback">Please enter a valid password</div>
        </div>

        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInModal;
