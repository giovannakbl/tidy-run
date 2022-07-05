import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { loginRequest } from "../store/Auth/actions";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Email</label>
        <input
          id="username"
          name="username"
          type="email"
          onChange={handleInputChange}
          value={formValues.username}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleInputChange}
          value={formValues.password}
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      <button onClick={() => navigate("/register")}>
        You don't have an account? Go to Register
      </button>
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
