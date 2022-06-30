import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux';
import { logoutRequest } from "../store/Auth/actions";
import { fetchChallengeRequest } from "../store/Challenge/actions";



const Challenge = ({auth, challenge}) => {
let navigate = useNavigate(); 
let { challengeId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    getChallenge();
  }, []);

  const getChallenge = () => {
    dispatch(fetchChallengeRequest(auth.data.token, challengeId));
  };
  const handleLogout = () => {
    dispatch(logoutRequest());

    return <Navigate to="/login" replace />;
  };

  if (auth.data.token == null) return <Navigate to="/login" replace />;

  return (
    <>
      <button onClick={handleLogout} >Cerrar sesión</button>
      <button onClick={() => 
              navigate("/challenge-list")
            }
            >Go back to Challenge List</button>
      {challenge.loading ? null : challenge.data.status == 'created' || challenge.data.status == 'active' ? <button onClick={() => 
              navigate("/challenge-edit/" + challengeId)
            }
            >Edit Challenge</button> : null}
      <h1>Challenge</h1>
      <h2>Check out your Challenge</h2>
      {challenge.loading ? <p>Loading...</p> : challenge.error ? <p>Error</p> :
      <ul>
        <li>id: {challenge.data.id}</li>
        <li>Created at: {challenge.data.created_at}</li>
        <li>name: {challenge.data.name}</li>
        <li>status: {challenge.data.status}</li>
        <li>Start date: {challenge.data.start_date}</li>
        <li>End date: {challenge.data.end_date}</li>
        <li>Prize: {challenge.data.prize}</li>
      </ul>
}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth:state.auth,
    challenge:state.challenge
  }
}


export default connect(mapStateToProps)(Challenge)