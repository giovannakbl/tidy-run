import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { tidyUserEdit, tidyUserRequest } from "../store/TidyUser/actions";
import { logoutRequest } from "../store/Auth/actions";
import { bindActionCreators } from "redux";
import Header from '../components/Header';
import Alert from "../components/alert/Alert";
import Spinner from "../components/spinner/Spinner";

const TidyUserEditPassword = ({ auth, tidyUser, tidyUserEdit, tidyUserRequest, logoutRequest }) => {
  let navigate = useNavigate();
  const [formValues, setFormValues] = useState({ password: undefined });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState(undefined);
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(formValues);
    setFormErrorMessage(undefined);
    setIsSubmitted(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setIsSubmitted(true);
    await tidyUserEdit(formValues);
    handleLogout(); }
  };
  const getTidyUser = async () => {
    await tidyUserRequest();
  };
  const handleLogout = async () => {
    // await logoutRequest();
  };
  useEffect(() => {
    getTidyUser();
  }, []);

  const isFormValid = () => {
    if (
      !formValues.password 
    ) {
      setFormErrorMessage("You must inform a valid password");
      return false;
    }
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

  // if (!auth.loading && !auth.authenticated) return <Navigate to="/login" replace />;

  return (
    <>
    <Header></Header>
    <main>
    {isSubmitted && tidyUser.status === "rejected" && (
          <Alert type="error" message={tidyUser.error.error_message_api} />
        )}
        {isSubmitted && tidyUser.status === "succeeded" && (
          <Alert
            type="success"
            message={
              "Your password was updated"
            }
          />
        )}
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
      <h2>Change your password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">New Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleInputChange}
          value={formValues.password}
          className="input-text"
        />
        <button type="submit">Save Changes</button>
      </form>
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    tidyUser: state.tidyUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      tidyUserEdit,
      tidyUserRequest,
      logoutRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TidyUserEditPassword);
