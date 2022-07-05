import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { allChallengesRequest } from "../store/Challenge/actions";
import { logoutRequest } from "../store/Auth/actions";
import { bindActionCreators } from "redux";

const ChallengeList = ({
  auth,
  challenge,
  allChallengesRequest,
  logoutRequest,
}) => {
  let navigate = useNavigate();
  useEffect(() => {
    getAllChallenges();
  }, []);
  const getAllChallenges = async () => {
    await allChallengesRequest(auth.data.token);
  };
  const handleLogout = async () => {
    await logoutRequest();
  };

  if (auth.data.token == null) return <Navigate to="/login" replace />;

  return (
    <>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Dashboard
      </button>
      <button
        onClick={() => {
          navigate("/challenge-new");
        }}
      >
        Create new Challenge
      </button>
      <button
        onClick={() => {
          navigate("/model-tasks");
        }}
      >
        Go to Model Tasks
      </button>

      <h1>Challenges</h1>
      <h2>Check out your Challenges</h2>
      {challenge.loading ? (
        <p>Loading...</p>
      ) : challenge.error ? (
        <p>Error</p>
      ) : (
        <>
          {challenge.data.challengeList.map((item) => (

          <div className="challenge-info">
          <h2>{challenge.data.challenge.name}</h2>
          <h3>Status: {challenge.data.challenge.status}</h3>
          <h3>Start date: {challenge.data.challenge.start_date}</h3>
          <h3>End date: {challenge.data.challenge.end_date}</h3>
          <h3>Prize: {challenge.data.challenge.prize}</h3>
          <button onClick={() => navigate("/challenge/" + item.id)}>
              See more details
             </button>
          </div>
          ))}

          </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    challenge: state.challenge,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      allChallengesRequest,
      logoutRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeList);
