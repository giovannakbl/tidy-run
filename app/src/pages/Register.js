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
        
             <h1 className="page-main-title">Tidy Run</h1>
             <div className="alert-area">
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
        </div>
        <form className="standard-form" onSubmit={handleSubmit}>
        
        <h2 className="register-login-title">Register</h2>
          <label className="standard-label" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleInputChange}
            value={formValues.email}
            className="standard-text-input"
            required
          />
          <label className="standard-label" htmlFor="password">Password</label>
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
            <button className="card-button" type="submit">Create account</button>
            </div>
         
        </form>
        <button
            className="register-login-button"
            onClick={() => navigate("/login")}
          >
            <p className="register-login-text-sec">Allready have an account?</p>
            <p className="register-login-text-main">Go to Login</p>
          </button>
        
        <div className="game-explanation-container">
          <h2 className="page-sec-title">Tidy Run</h2>
          <p className="account-info-text-sec">
          If you share your house with family, your significant other or even with friends, I imagine you may struggle to organize and get done all the house chores. 
          </p>
          <p className="account-info-text-sec">
Tidy Run provides a fun way to complete the household chores in a collaborative way!
</p>


<h3 className="page-sec-title">Account creation:</h3>

<p className="account-info-text-sec">Only one person of the house needs to create an account! The login is unified and all of the people who live with you can get access the platform with these credentials. 
</p>

<p className="account-info-text-sec">
Go ahead and create your account!
</p>
        </div>
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
