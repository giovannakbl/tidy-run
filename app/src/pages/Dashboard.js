import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { tidyUserRequest } from "../store/TidyUser/actions";
import { logoutRequest } from "../store/Auth/actions";
import { bindActionCreators } from "redux";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../components/spinner/Spinner";
import { useCookies } from "react-cookie";

const Dashboard = ({ auth, tidyUser, tidyUserRequest, logoutRequest }) => {
  
  let navigate = useNavigate();
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
        <h1 className="page-main-title">Hello there!</h1>
        {tidyUser.data.home_name !== null && tidyUser.data.home_name !== "" ? (
          <h2 className="page-sec-title">House: {tidyUser.data.home_name}</h2>
        ) : null}
        <div className="account-info-container">
      
        <p className="account-info-text-main">Model Tasks</p>
      

        <button
          className="card-button"
          type="button"
          onClick={() => navigate("/model-tasks")}
        >
          <div className="card-icon-button">
            <FontAwesomeIcon icon="fa-bolt" />
          </div>
          <div>Manage model tasks</div>
        </button>
        </div>
        <div className="account-info-container">
       
        <p className="account-info-text-main">Home Members</p>
        

        <button
          className="card-button"
          type="button"
          onClick={() => navigate("/home-members")}
        >
          <div className="card-icon-button">
            <FontAwesomeIcon icon="fa-people-roof" />
          </div>
          <div>Manage home members</div>
        </button>
        </div>

        <div className="account-info-container">
       
        <p className="account-info-text-main">New here?</p>
        <p className="account-info-text-sec">Check out our quick tutorial on how to get started</p>
       

        <button
          className="card-button"
          type="button"
          onClick={() => navigate("/get-started")}
        >
          <div className="card-icon-button">
            <FontAwesomeIcon icon="fa-circle-info" />
          </div>
          <div>See more details</div>
        </button>
        </div>

        <div className="account-info-container">
        <div>
        <p className="account-info-text-main">Game Rules</p>
        <p className="account-info-text-sec">A quick explanation about how Tidy Run works!</p>
        </div>

        <button
          className="card-button"
          type="button"
          onClick={() => navigate("/game-rules")}
        >
          <div className="card-icon-button">
            <FontAwesomeIcon icon="fa-circle-info" />
          </div>
          <div>See more details</div>
        </button>
        

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
      logoutRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
