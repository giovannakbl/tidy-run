import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux';
import {  tidyUserRequest, deleteTidyUserRequest } from "../store/TidyUser/actions";
import { logoutRequest } from "../store/Auth/actions";
import { bindActionCreators } from 'redux';

const Dashboard = ({auth, tidyUser, tidyUserRequest, deleteTidyUserRequest, logoutRequest}) => {
  const dispatch = useDispatch();
  let navigate = useNavigate(); 

  const getTidyUser = async () => {
    await tidyUserRequest(auth.data.token);
  };
  const deleteTidyUser = async () => {
    await logoutRequest();
    await deleteTidyUserRequest(auth.data.token);
    
  };
  const handleLogout = async () => {
    await logoutRequest();
  };

  useEffect(() => {
    getTidyUser();
  }, []);


  if (auth.data.token == null) return <Navigate to="/login" replace />;

  return (
    <>
      <button onClick={handleLogout} >Logout</button>
          <button onClick={() => {
           navigate("/");
          }} >Go back to Dashboard</button>
      <h1>User info</h1>
      <h2>Email: {tidyUser.data.email}</h2>
      <button onClick={() => {
           navigate("/account/email");
          }} >Change your email</button>
          
      <p>id: {tidyUser.data.id}</p>
      <p>family: {tidyUser.data.home_name}</p>
      <button onClick={() => {
           navigate("/account/home-name");
          }} >Change your family name</button>
          <p>Password</p>
      <button onClick={() => {
           navigate("/account/password");
          }} >Change your password</button>
          <button onClick={deleteTidyUser} >Delete my account</button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    tidyUser:state.tidyUser,
    auth:state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    tidyUserRequest, 
    deleteTidyUserRequest,
    logoutRequest,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)