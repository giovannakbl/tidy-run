import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux';
import { allChallengesRequest } from "../store/ChallengeList/actions";
import { logoutRequest } from "../store/Auth/actions";



const ChallengeList = ({auth, challengeList, challenge}) => {
let navigate = useNavigate(); 
const a = useSelector(state => state.challengeList);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   getAllChallenges();
  // }, []);
  const getAllChallenges = () => {
    dispatch(allChallengesRequest(auth.data.token));
  };

  useEffect(() => {
    // dispatch(getAllChallenges());
    // getAllChallenges();
    // dispatch(allChallengesRequest(auth.data.token));
    dispatch(allChallengesRequest(auth.data.token));
    console.log('Did it');
    // Safe to add dispatch to the dependencies array
  }, [challenge.loading]);

  
  const handleLogout = () => {
    dispatch(logoutRequest());
    return <Navigate to="/login" replace />;
  };


  if (auth.data.token == null) return <Navigate to="/login" replace />;

  return (
    <>
      <button onClick={handleLogout} >Cerrar sesión</button>
      <button onClick={() => {
           navigate("/");
          }} >Dashboard</button>
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