import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { loginRequest } from "../store/Auth/actions";
import { useDispatch } from 'react-redux'



const Login = ({auth}) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest(formValues));
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    tidyUser:state.tidyUser,
    auth:state.auth
  }
}


export default connect(mapStateToProps)(Login)