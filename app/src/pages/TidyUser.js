import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  tidyUserRequest,
  deleteTidyUserRequest,
} from "../store/TidyUser/actions";
import { logoutRequest } from "../store/Auth/actions";
import { bindActionCreators } from "redux";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCookies } from "react-cookie";
import DeleButtton from "../components/delete-button/DeleteButton";
import Spinner from "../components/spinner/Spinner";


const TidyUser = ({
  auth,
  tidyUser,
  tidyUserRequest,
  deleteTidyUserRequest,
  logoutRequest,
}) => {
  const [isDeletedRequested, setIsDeletedRequested] = useState(false);
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);
  const handleCookieLogin = () => {
    setCookie("isLoggedIn", "yes", { path: "/" });
  };
  const handleCookieLogout = () => {
    setCookie("isLoggedIn", "no", { path: "/" });
  };
  // const getTidyUser = async () => {
  //   await tidyUserRequest();
  // };
  const deleteTidyUser = async () => {
    await deleteTidyUserRequest();
    await logoutRequest();
    handleCookieLogout();
  };
  const handleLogout = async () => {
    await logoutRequest();
    handleCookieLogout();
    navigate("/login")
  };
  // useEffect(() => {
  //   getTidyUser();
  // }, []);
  
  // if (!auth.loading && !auth.authenticated) return <Navigate to="/login" replace />;

  return (
    <>
      <Header></Header>
      <main>
        <div className="go-back-area"></div>
        <h1>User info</h1>
        <button type="button" className="logout-button" onClick={handleLogout}>Logout</button>
        <div className="account-info-container">
          <div>
            <p className="label-text">Email: {tidyUser.data.email}</p>
          </div>
          <button
            className="action-button"
            type="button"
            onClick={() => navigate("/account/email")}
          >
            <div>
              <FontAwesomeIcon icon="fa-pencil" />
            </div>
            <div>Change your email</div>
          </button>
        </div>

        <div className="account-info-container">
          <div>
        <p className="label-text">Family Name: {tidyUser.data.home_name}</p>
        </div>
        <button
          className="action-button"
          type="button"
          onClick={() => navigate("/account/home-name")}
        >
          <div>
            <FontAwesomeIcon icon="fa-pencil" />
          </div>
          <div>Change your family name</div>
        </button>
        </div>
        
        <div className="account-info-container">
        <div>
        <p className="label-text">Password</p>
        </div>

        <button
          className="action-button"
          type="button"
          onClick={() => navigate("/account/password")}
        >
          <div>
            <FontAwesomeIcon icon="fa-pencil" />
          </div>
          <div>Change your password</div>
        </button>
        </div>

        {/* <div className="account-info-container">
        <div>
        <p className="label-text">Task Models</p>
        </div>

        <button
          className="action-button"
          type="button"
          onClick={() => navigate("/model-tasks")}
        >
          <div>
            <FontAwesomeIcon icon="fa-pencil" />
          </div>
          <div>Manage task models</div>
        </button>
        </div> */}

        <div className="delete-account-container">
        <p className="label-text">Delete your account</p>

        {/* </div> */}
        
        {isDeletedRequested ? (null) : (
          <div className="delete-account-message">
        <p className="label-text">This action is permanent</p>
        </div>
        )}
        </div>
        


        <DeleButtton
              isDeletedRequested={isDeletedRequested}
              deleteFunction={deleteTidyUser}
              setIsDeletedRequested={setIsDeletedRequested}
            />





        
        
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
      tidyUserRequest,
      deleteTidyUserRequest,
      logoutRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TidyUser);
