import { useState } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
// import { useDispatch } from 'react-redux'
import { deleteChallengeRequest, editChallengeRequest } from "../store/Challenge/actions";


const ChallengeEdit = ({auth, challenge, editChallengeRequest, deleteChallengeRequest}) => {
    let { challengeId } = useParams();
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  let date = undefined;
  const [formValues, setFormValues] = useState({ name: undefined, start_date: undefined, end_date: undefined, prize: undefined });
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await editChallengeRequest(auth.data.token, challengeId, formValues);
    navigate("/challenge/" + challengeId);
  };
  const handleDeleteChallenge = async () => {
    await deleteChallengeRequest(auth.data.token, challengeId);
    navigate("/challenge-list");
    
  }
  
  if (!auth.data.token) return <Navigate to="/login" replace />;

  

  return (
    <>
    {challenge.loading ? <p>Loading...</p> : challenge.error ? <p>Error</p> : challenge.data.challenge.status != 'created' && challenge.data.challenge.status != 'active' ? <h1>You cannot edit this Challenge because it has already started</h1> : <>
    <button onClick={() => 
              navigate("/challenge/" + challengeId)
            }
            >Go back to Challenge</button>
    <button onClick={handleDeleteChallenge}
            >Delete Challenge</button>            
      <h1>{challenge.data.challenge.status}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={handleInputChange}
          defaultValue={challenge.data.challenge.name}
          value={formValues.name}
        />
        <label htmlFor="start_date">Start Date</label>
        <input
          id="start_date"
          name="start_date"
          type="date"
          onChange={handleInputChange}
          defaultValue={challenge.data.challenge.start_date.split("T")[0]}
          value={formValues.start_date}
        />
        <label htmlFor="end_date">End Date</label>
        <input
          id="end_date"
          name="end_date"
          type="date"
          onChange={handleInputChange}
          defaultValue={challenge.data.challenge.end_date.split("T")[0]}
          value={formValues.end_date}
        />
        <label htmlFor="prize">Prize</label>
        <input
          id="prize"
          name="prize"
          type="text"
          onChange={handleInputChange}
          defaultValue={challenge.data.challenge.prize}
          value={formValues.prize}
        />
        <button type="submit">Save Changes</button>
      </form>
      </>
}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    challenge:state.challenge,
    auth:state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    editChallengeRequest,
    deleteChallengeRequest
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeEdit)