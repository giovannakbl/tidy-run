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
  // const [cookies, setCookie] = useCookies(["user"]);
  let navigate = useNavigate();
  // const checkLogin = () => {
  //   console.log(cookies);
  //   if(cookies.isLoggedIn === "no") {
  //     navigate("/login");
  //   }
  // };

  // useEffect(() => {
  //   checkLogin();
  // }, []);

  // if ((auth.status !== 'idle' && auth.status !== 'loading' && !auth.authenticated)) return <Navigate to="/login" replace />;

  return (
    <>
      <Header></Header>
      <main>
        <h1>Hello there!</h1>
        {tidyUser.data.home_name !== null && tidyUser.data.home_name !== "" ? (
          <h2>House: {tidyUser.data.home_name}</h2>
        ) : null}
        <div className="account-info-container">
        <div>
        <p className="label-text">Task Models</p>
        </div>

        <button
          className="action-button"
          type="button"
          onClick={() => navigate("/model-tasks")}
        >
          <div>
            <FontAwesomeIcon icon="fa-bolt" />
          </div>
          <div>Manage task models</div>
        </button>
        </div>
        <div className="account-info-container">
        <div>
        <p className="label-text">Home Members</p>
        </div>

        <button
          className="action-button"
          type="button"
          onClick={() => navigate("/home-members")}
        >
          <div>
            <FontAwesomeIcon icon="fa-people-roof" />
          </div>
          <div>Manage home members</div>
        </button>
        </div>

        <div className="account-info-container">
        <div>
        <p className="label-text">New here?</p>
        <p className="game-explanation-text">Check out our quick tutorial on how to get started</p>
        </div>

        <button
          className="action-button"
          type="button"
          onClick={() => navigate("/get-started")}
        >
          <div>
            <FontAwesomeIcon icon="fa-circle-info" />
          </div>
          <div>See more details</div>
        </button>
        </div>

        <div className="account-info-container">
        <div>
        <p className="label-text">Game Rules</p>
        <p className="game-explanation-text">A quick explanation about how Tidy Run works!</p>
        </div>

        <button
          className="action-button"
          type="button"
          onClick={() => navigate("/game-rules")}
        >
          <div>
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
