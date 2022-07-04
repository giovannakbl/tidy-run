import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { tidyUserRequest } from "../store/TidyUser/actions";
import { logoutRequest } from "../store/Auth/actions";
import { bindActionCreators } from 'redux';

const Dashboard = ({auth, tidyUser, tidyUserRequest, logoutRequest}) => {
  let navigate = useNavigate(); 
  const getTidyUser = async () => {
    await tidyUserRequest(auth.data.token);
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
           navigate("/challenge-list");
          }} >Challenge list</button>
          <button onClick={() => {
           navigate("/home-members");
          }} >Home Members list</button>
           <button onClick={() => {
           navigate("/account");
          }} >Account Settings</button>
      <h1>Dashboard</h1>
      <h2>Check out your Dashboard</h2>
      <h3>This content is private</h3>
      <p>family: {tidyUser.data.home_name}</p>
      
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
    logoutRequest,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)