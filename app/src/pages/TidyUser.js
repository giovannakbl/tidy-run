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
  const handleCookieLogout = () => {
    setCookie("isLoggedIn", "no", { path: "/" });
  };
  const deleteTidyUser = async () => {
    await deleteTidyUserRequest();
    await logoutRequest();
    handleCookieLogout();
  };
  const handleLogout = async () => {
    await logoutRequest();
    handleCookieLogout();
    navigate("/login");
  };
  const getTidyUser = async () => {
    await tidyUserRequest();
  };

  useEffect(() => {
    getTidyUser();
  }, []);

  return (
    <>
      <Header></Header>
      <main>
        <h1 className="page-main-title">User info</h1>
        <button type="button" className="card-button logout-button" onClick={handleLogout}>
          Logout
        </button>
        <div className="account-info-container">
      
        <p className="account-info-text-main">Email: </p>
                <p className="account-info-text-sec">
                {tidyUser.data.email}
                </p>
         

              <button className="card-button" 
            type="button"
            onClick={() => navigate("/account/email")}
          >
            
            <div className="card-icon-button">
              <FontAwesomeIcon icon="fa-pencil" />
            </div>
            <div>Change your email</div>
          </button>
   
        </div>

        <div className="account-info-container">
          <div>
          <p className="account-info-text-main">Family Name: </p>
          <p className="account-info-text-sec">
          {tidyUser.data.home_name}
                </p>
            
          </div>
          <button
            className="card-button"
            type="button"
            onClick={() => navigate("/account/home-name")}
          >
            <div className="card-icon-button">
              <FontAwesomeIcon icon="fa-pencil" />
            </div>
            <div>Change your family name</div>
          </button>
        </div>

        <div className="account-info-container">
          <div>
          <p className="account-info-text-main">Password: </p>
          </div>

          <button
            className="card-button"
            type="button"
            onClick={() => navigate("/account/password")}
          >
            <div className="card-icon-button">
              <FontAwesomeIcon icon="fa-pencil" />
            </div>
            <div>Change your password</div>
          </button>
        </div>
        <div className="account-info-container">

          <p className="account-info-text-main">Delete your account</p>
   

        <DeleButtton
          isDeletedRequested={isDeletedRequested}
          deleteFunction={deleteTidyUser}
          setIsDeletedRequested={setIsDeletedRequested}
        />
        </div>
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
