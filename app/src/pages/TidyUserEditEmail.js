import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { tidyUserEdit, tidyUserRequest } from "../store/TidyUser/actions";
import { logoutRequest } from "../store/Auth/actions";
import { loginRequest } from "../store/Auth/actions";
import { bindActionCreators } from "redux";
import Header from "../components/Header";
import Alert from "../components/alert/Alert";
import Spinner from "../components/spinner/Spinner";

const TidyUserEditEmail = ({
  auth,
  tidyUser,
  tidyUserEdit,
  tidyUserRequest,
  logoutRequest,
  loginRequest,
}) => {
  let navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: undefined,
    password: undefined,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState(undefined);
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormErrorMessage(undefined);
    setIsSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setIsSubmitted(true);
      const newEmail = {
        email: formValues.email,
      };
      const newLogin = {
        username: formValues.email,
        password: formValues.password,
      };
      await tidyUserEdit(newEmail);
      await loginRequest(newLogin);
    }
  };
  const getTidyUser = async () => {
    await tidyUserRequest();
  };

  useEffect(() => {
    getTidyUser();
  }, []);

  const isFormValid = () => {
    if (!formValues.email) {
      setFormErrorMessage("You must inform a valid email");
      return false;
    }
    if (formValues.email === tidyUser.data.email) {
      setFormErrorMessage(
        "The informed email is identical to the previous one"
      );
      return false;
    }
    return true;
  };

  return (
    <>
      <Header></Header>
      <main>
        {isSubmitted && tidyUser.status === "rejected" ? (
          <Alert type="error" message={tidyUser.error.error_message_api} />
        ) : null}
        {isSubmitted && tidyUser.status === "succeeded" ? (
          <Alert type="success" message={"Your email was updated!"} />
        ) : null}
        {formErrorMessage ? (
          <Alert type="error" message={formErrorMessage} />
        ) : null}
        <div className="go-back-area">
          <button
            className="go-back-button"
            onClick={() => {
              navigate("/account");
            }}
          >
            &#60;&#60; Go back to user details
          </button>
        </div>
        <h2 className="page-main-title">Change your email</h2>
        <div className="account-info-container">
          <p className="account-info-text-main">Current Email: </p>
          <p className="account-info-text-sec">{tidyUser.data.email}</p>

          <p className="card-text-standard-info">
            Please indicate the new email and your current password to confirm
            the changes
          </p>
        </div>
        <form className="standard-form" onSubmit={handleSubmit}>
          <label className="standard-label" htmlFor="email">
            New Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleInputChange}
            value={formValues.email}
            className="standard-text-input"
            required
          />
          <label className="standard-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleInputChange}
            value={formValues.password}
            className="standard-text-input"
            required
          />
          <div className="card-row-buttons-center">
            <button className="card-button" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    tidyUser: state.tidyUser,
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      tidyUserEdit,
      tidyUserRequest,
      logoutRequest,
      loginRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TidyUserEditEmail);
