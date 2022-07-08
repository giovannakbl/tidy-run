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
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createTidyUserRequest(formValues);
    console.log("Response");
    console.log(response);
    } catch (e) {}
    // navigate("/login");
  };
useEffect(()=>{
  console.log("Tidy user");
    console.log(tidyUser);
},[tidyUser])

  return (
    <>
    <main>
    {tidyUser.status === "rejected" && (
          <Alert type="error" message={tidyUser.errors.error_message} />
        )}
      {tidyUser.status === "succeeded" && (
          <Alert type="success" message={tidyUser.data.email + "Created"} />
        )}
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
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleInputChange}
          value={formValues.password}
          className="input-text"
        />
        <button type="submit">Create account</button>
      </form>
      <button className="register-login-button" onClick={() => navigate("/login")}>
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
