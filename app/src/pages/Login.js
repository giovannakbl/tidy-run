import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { loginRequest } from "../store/Auth/actions";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "../components/alert/Alert";

const Login = ({ auth, loginRequest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setIsSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      setIsSubmitted(true);
      await loginRequest(formValues);
      setIsSubmitted(true);
  };
  

  if (auth.data.token) return <Navigate to="/" replace />;

  return (
    <>
      <main>
      {isSubmitted && auth.status === "rejected" && (
          <Alert type="error" message={auth.error.error_message_api} />
        )}
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
          <button type="submit">Login</button>
        </form>
        <button
          className="register-login-button"
          onClick={() => navigate("/register")}
        >
          <p className="standard-info">You don't have an account?</p>
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
