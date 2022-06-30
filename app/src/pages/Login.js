import { useContext, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { loginRequest } from "../store/Auth/actions";
import { useSelector, useDispatch } from 'react-redux'
import {bindActionCreators} from 'redux'


const Login = ({auth}) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  console.log(auth.data.token)

  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest(formValues));
  };

  useEffect(() => {
    console.log(auth);
  }, [auth.loading]);
  
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