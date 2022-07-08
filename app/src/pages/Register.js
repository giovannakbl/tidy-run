import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { createTidyUserRequest } from "../store/TidyUser/actions";
import { bindActionCreators } from "redux";
import Alert from "../components/alert/Alert";

const Register = ({ createTidyUserRequest, tidyUser }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: undefined,
    password: undefined,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState(undefined);
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setIsSubmitted(false);
    setFormErrorMessage(undefined);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setIsSubmitted(true);
      await createTidyUserRequest(formValues);
    }
  };
  const isFormValid = () => {
    if (/\s/g.test(formValues.password)) {
      setFormErrorMessage("The password cannot contain blank spaces");
      return false;
    }
    if ((formValues.password).length < 6) {
      setFormErrorMessage("The password must contain at least 6 characters");
      return false;
    }
    return true;
  };

  return (
    <>
      <main>
        {isSubmitted && tidyUser.status === "rejected" && (
          <Alert type="error" message={tidyUser.error.error_message_api} />
        )}
        {isSubmitted && tidyUser.status === "succeeded" && (
          <Alert
            type="success"
            message={
              "Your account was created with the email " +
              tidyUser.data.email +
              " You can now proceed to Login"
            }
          />
        )}
        {formErrorMessage ? (
          <Alert type="error" message={formErrorMessage} />
        ) : null}
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleInputChange}
            value={formValues.email}
            className="input-text"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleInputChange}
            value={formValues.password}
            className="input-text"
            required
          />
          <button type="submit">Create account</button>
        </form>
        <button
          className="register-login-button"
          onClick={() => navigate("/login")}
        >
          <p className="standard-info">Allready have an account?</p>
          <p className="custom-info">Go to Login</p>
        </button>
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    tidyUser: state.tidyUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      createTidyUserRequest,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
