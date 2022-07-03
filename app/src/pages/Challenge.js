import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { logoutRequest } from "../store/Auth/actions";
import { fetchChallengeRequest } from "../store/Challenge/actions";
import { bindActionCreators } from 'redux';

const Challenge = ({ auth, challenge, fetchChallengeRequest, logoutRequest }) => {
  let navigate = useNavigate();
  let { challengeId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    getChallenge();
  }, []);

  const getChallenge = async () => {
    await fetchChallengeRequest(auth.data.token, challengeId);
  };
  const handleLogout = async () => {
    await logoutRequest();
  };

  if (auth.data.token == null) return <Navigate to="/login" replace />;

  return (
    <>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <button onClick={() => navigate("/challenge-list")}>
        Go back to Challenge List
      </button>
      {challenge.loading ? null : challenge.data.challenge.status ==
          "created" || challenge.data.challenge.status == "active" ? (
        <button onClick={() => navigate("/challenge-edit/" + challengeId)}>
          Edit Challenge
        </button>
      ) : null}
      <h1>Challenge</h1>
      <h2>Check out your Challenge</h2>
      {challenge.loading ? (
        <p>Loading...</p>
      ) : challenge.error ? (
        <p>Error</p>
      ) : (
        <ul>
          <li>id: {challenge.data.challenge.id}</li>
          <li>Created at: {challenge.data.challenge.created_at}</li>
          <li>name: {challenge.data.challenge.name}</li>
          <li>status: {challenge.data.challenge.status}</li>
          <li>Start date: {challenge.data.challenge.start_date}</li>
          <li>End date: {challenge.data.challenge.end_date}</li>
          <li>Prize: {challenge.data.challenge.prize}</li>
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
  return bindActionCreators({
    fetchChallengeRequest,
    logoutRequest
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
