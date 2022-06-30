import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux';
import { tidyUserEdit, tidyUserRequest } from "../store/TidyUser/actions";
import { logoutRequest } from "../store/Auth/actions";


const Dashboard = ({auth, tidyUser}) => {
  const dispatch = useDispatch();
  let navigate = useNavigate(); 
  const [formValues, setFormValues] = useState({email: undefined, password: undefined, home_name: undefined});
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(tidyUserEdit(auth.data.token, formValues));
    handleLogout();
  };
  const getTidyUser = () => {
    dispatch(tidyUserRequest(auth.data.token));
  };
  const handleLogout = () => {
    dispatch(logoutRequest());

    return <Navigate to="/login" replace />;
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
      <h1>Dashboard</h1>
      <h2>Check out your Dashboard {tidyUser.data.email}</h2>
      <h3>This content is private</h3>
      <p>id: {tidyUser.data.id}</p>
      <p>family: {tidyUser.data.home_name}</p>
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


export default connect(mapStateToProps)(Dashboard)