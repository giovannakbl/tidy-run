import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { tidyUserEdit, tidyUserRequest } from "../store/TidyUser/actions";
import { logoutRequest } from "../store/Auth/actions";
import { bindActionCreators } from "redux";

const Dashboard = ({
  auth,
  tidyUser,
  tidyUserEdit,
  tidyUserRequest,
  logoutRequest,
}) => {
  let navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: undefined });
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await tidyUserEdit(auth.data.token, formValues);
    handleLogout();
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
      <button onClick={handleLogout}>Logout</button>
      <div className="go-back-area">
        <button
          className="go-back-button"
          onClick={() => {
            navigate("/account");
          }}
          Ï
        >
          &#60;&#60; Go back to user details
        </button>
      </div>
      <h1>Change your email</h1>
      <p>Current email: {tidyUser.data.email}</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">New Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={handleInputChange}
          value={formValues.email}
        />
        <button type="submit">Save Changes</button>
      </form>
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
