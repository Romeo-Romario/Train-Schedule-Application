interface Props {
  LogIn: () => void;
  SignIn: () => void;
}

const RegistrationNavBar = ({ LogIn, SignIn }: Props) => {
  return (
    <ul
      className="nav nav-tabs nav-justified "
      data-bs-theme="dark"
      id="myTab"
      role="tablist"
    >
      <li className="nav-item" role="presentation">
        <button
          className="nav-link active"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#home-tab-pane"
          type="button"
          role="tab"
          aria-controls="home-tab-pane"
          aria-selected="true"
          onClick={LogIn}
        >
          Log In
        </button>
      </li>
      <li className={"nav-item"} role="presentation">
        <button
          className="nav-link"
          id="profile-tab"
          data-bs-toggle="tab"
          data-bs-target="#profile-tab-pane"
          type="button"
          role="tab"
          aria-controls="profile-tab-pane"
          aria-selected="false"
          onClick={SignIn}
        >
          Sign In
        </button>
      </li>
    </ul>
  );
};

export default RegistrationNavBar;
