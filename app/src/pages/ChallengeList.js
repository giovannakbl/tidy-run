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
        <ul>
          {challenge.data.challengeList.map((item) => (
            <li key={item.id}>
              <button onClick={() => navigate("/challenge/" + item.id)}>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
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
