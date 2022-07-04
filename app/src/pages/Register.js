import { useState, useEffect } from "react";
import { useNavigate ,Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { createTidyUserRequest } from "../store/TidyUser/actions";
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';


const Register = ({tidyUser, createTidyUserRequest}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: undefined, password: undefined});

  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTidyUserRequest(formValues);
    navigate("/login");
  };
  
  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={handleInputChange}
          value={formValues.email}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleInputChange}
          value={formValues.password}
        />
        <button type="submit">Create account</button>
      </form>
      <button onClick={() => navigate("/login")}>
        Allready have an account? Go to Login
      </button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    tidyUser:state.tidyUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createTidyUserRequest
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)