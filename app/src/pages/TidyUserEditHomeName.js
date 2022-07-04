import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux';
import { tidyUserEdit, tidyUserRequest } from "../store/TidyUser/actions";
import { logoutRequest } from "../store/Auth/actions";
import { bindActionCreators } from 'redux';

const Dashboard = ({auth, tidyUser, tidyUserEdit, tidyUserRequest, logoutRequest}) => {
  const dispatch = useDispatch();
  let navigate = useNavigate(); 
  const [formValues, setFormValues] = useState({password: undefined});
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await tidyUserEdit(auth.data.token, formValues);
    navigate("/account");
  };
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
           navigate("/account");
          }} >Go back to user details</button>
      <h1>Change your Home Name</h1>
      
      <p>Current family name: {tidyUser.data.home_name}</p>
      <form onSubmit={handleSubmit}>
      <label htmlFor="home_name">Home Name</label>
        <input
          id="home_name"
          name="home_name"
          type="home_name"
          onChange={handleInputChange}
          value={formValues.home_name}
        />
        <button type="submit">Save Changes</button>
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
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    tidyUserEdit,
    tidyUserRequest, 
    logoutRequest,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)