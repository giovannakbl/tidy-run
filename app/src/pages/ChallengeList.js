import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux';
import { allChallengesRequest } from "../store/ChallengeList/actions";
import { logoutRequest } from "../store/Auth/actions";



const ChallengeList = ({auth, challengeList}) => {
// const [challengeList, setChallengeList] = useState([]);
let navigate = useNavigate(); 
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(challengeList);
    getAllChallenges();
    // setChallengeList(challenges.data);
  }, []);

  
//   useEffect(() => {
//     // console.log(challenges);
//     // setChallengeList(challenges.data);
//     // console.log(challengeList);
//   }, [challenges]);

  const getAllChallenges = () => {
    dispatch(allChallengesRequest(auth.data.token));
  };
  const handleLogout = () => {
    dispatch(logoutRequest());
    console.log(auth);
    return <Navigate to="/login" replace />;
  };
  useEffect(() => {
    console.log(auth);
  }, [auth]);

  if (auth.data.token == null) return <Navigate to="/login" replace />;

  return (
    <>
      <button onClick={handleLogout} >Cerrar sesión</button>
      <h1>Challenges</h1>
      <h2>Check out your Challenges</h2>
      {challengeList.loading ? <p>Loading...</p> : challengeList.error ? <p>Error</p> :
      <ul>
        {challengeList.data.map((item) => (
          <li key={item.name}>
            <button onClick={() => 
              navigate("/challenge/" + item.id)
            }
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth:state.auth,
    challengeList:state.challengeList,
    challenge:state.challenge
  }
}


export default connect(mapStateToProps)(ChallengeList)