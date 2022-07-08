import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { tidyUserEdit, tidyUserRequest } from "../store/TidyUser/actions";
import { logoutRequest } from "../store/Auth/actions";
import { bindActionCreators } from "redux";
import Header from '../components/Header';
import Alert from "../components/alert/Alert";

const TidyUserEditHomeName = ({
  auth,
  tidyUser,
  tidyUserEdit,
  tidyUserRequest,
  logoutRequest,
}) => {
  let navigate = useNavigate();
  const [formValues, setFormValues] = useState({ password: undefined });
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(formValues);
    setFormErrorMessage(undefined);
    setIsSubmitted(false);
  };
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState(undefined);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setIsSubmitted(true);
    await tidyUserEdit(auth.data.token, formValues);
    // navigate("/account");
    }
  };
  const getTidyUser = async () => {
    await tidyUserRequest(auth.data.token);
  };
  const handleLogout = async () => {
    await logoutRequest();
  };
  useEffect(() => {
    getTidyUser();
  }, []);

  const isFormValid = () => {
    if (
      !formValues.home_name 
    ) {
      setFormErrorMessage("You must inform a home name");
      return false;
    }
    if (formValues.home_name.trim().length === 0 || formValues.home_name === null) {
      setFormErrorMessage("The name must have at least a number or letter");
      return false;
    }
    return true;
  };


  if (!auth.data.token) return <Navigate to="/login" replace />;

  return (
    <>
    <Header></Header>
    <main>
    {isSubmitted && tidyUser.status === "rejected" ? (
          <Alert type="error" message={tidyUser.error.error_message_api} />
        ) : null}
        {isSubmitted && tidyUser.status === "succeeded" ? (
          <Alert
            type="success"
            message={
              "Your home name was updated!"
            }
          />
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
      <h2>Change your Home Name</h2>

      <p className="label-text">Current family name: {tidyUser.data.home_name}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="home_name">Home Name</label>
        <input
          id="home_name"
          name="home_name"
          type="home_name"
          onChange={handleInputChange}
          value={formValues.home_name}
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
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TidyUserEditHomeName);
