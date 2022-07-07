import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { loginRequest } from "../store/Auth/actions";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = ({ auth, loginRequest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginRequest(formValues);
  };

  if (auth.data.token) return <Navigate to="/" replace />;

  return (
    <>
    <main>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="username">Email</label>
        <input
          id="username"
          name="username"
          type="email"
          onChange={handleInputChange}
          value={formValues.username}
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
        <button type="submit">Login</button>
      </form>
      <button
        className="register-login-button"
        onClick={() => navigate("/register")}
      ><p className="standard-info">You don't have an account?</p>
      <p className="custom-info">Go to Register</p>
         
      </button>
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
      loginRequest,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
