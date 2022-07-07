import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { tidyUserEdit, tidyUserRequest } from "../store/TidyUser/actions";
import { logoutRequest } from "../store/Auth/actions";
import { bindActionCreators } from "redux";
import Header from '../components/Header';

const Dashboard = ({
  auth,
  tidyUser,
  tidyUserEdit,
  tidyUserRequest,
  logoutRequest,
}) => {
  let navigate = useNavigate();
  const [formValues, setFormValues] = useState({ password: undefined });
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
    <Header></Header>
    <main>
      <div className="go-back-area">
        <button
          className="go-back-button"
          onClick={() => {
            navigate("/account");
          }}
          
        >
          &#60;&#60; Go back to user details
        </button>
      </div>
      <h2>Change your Home Name</h2>

      <p className="label-text">Current family name: {tidyUser.data.home_name}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="home_name">Home Name</label>
        <input
          id="home_name"
          name="home_name"
          type="home_name"
          onChange={handleInputChange}
          value={formValues.home_name}
          className="input-text"
        />
        <button type="submit">Save Changes</button>
      </form>
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
      tidyUserEdit,
      tidyUserRequest,
      logoutRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
