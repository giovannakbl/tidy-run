import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { tidyUserRequest } from "../store/TidyUser/actions";
import { logoutRequest } from "../store/Auth/actions";
import { bindActionCreators } from 'redux';
import Header from '../components/Header';

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


  if (!auth.data.token) return <Navigate to="/login" replace />;

  return (
    <>
    <Header></Header>
    <main>
      <h1>Hello there!</h1>
      <h1>House: {tidyUser.data.home_name}</h1>
      </main>
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