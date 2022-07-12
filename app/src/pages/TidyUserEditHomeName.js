import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { tidyUserEdit, tidyUserRequest } from "../store/TidyUser/actions";
import { logoutRequest } from "../store/Auth/actions";
import { bindActionCreators } from "redux";
import Header from '../components/Header';
import Alert from "../components/alert/Alert";
import Spinner from "../components/spinner/Spinner";

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
    setFormErrorMessage(undefined);
    setIsSubmitted(false);
  };
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState(undefined);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setIsSubmitted(true);
    await tidyUserEdit(formValues);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const getTidyUser = async () => {
    await tidyUserRequest();
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

  return (
    <>
    <Header></Header>
    <main>
    
        <button
          className="go-back-button"
          onClick={() => {
            navigate("/account");
          }}
          
        >
          &#60;&#60; Go back to user details
        </button>
     
      <h2 className="page-main-title">Change your Home Name</h2>
      <div className="border-container">
          <p className="account-info-text-main">Current Home Name: </p>
          <p className="card-text-important-info">{tidyUser.data.home_name}</p>

          
        </div>

        <div className="alert-area">
        {isSubmitted && tidyUser.status === "rejected" ? (
          <Alert
          handleInputChange={handleInputChange}  type="error" message={tidyUser.error.error_message_api} />
        ) : null}
        {isSubmitted && tidyUser.status === "succeeded" ? (
          <Alert
          handleInputChange={handleInputChange} 
            type="success"
            message={
              "Your home name was updated!"
            }
          />
        ) : null}
        {formErrorMessage ? (
          <Alert
          handleInputChange={handleInputChange}  type="error" message={formErrorMessage} />
        ) : null}
     
        </div>
      <form className="standard-form" onSubmit={handleSubmit}>
        <label className="standard-label" htmlFor="home_name">New Home Name</label>
        <input
          id="home_name"
          name="home_name"
          type="home_name"
          onChange={handleInputChange}
          value={formValues.home_name}
          className="standard-text-input"
        />
        <div className="card-row-buttons-center">
            <button className="card-button" type="submit">Save Changes</button>
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
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TidyUserEditHomeName);
