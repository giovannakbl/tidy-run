import { useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux'
import { editChallengeRequest, fetchChallengeRequest } from "../store/Challenge/actions";

const ChallengeEdit = ({auth, challenge}) => {
    let { challengeId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let date = undefined;
  const [formValues, setFormValues] = useState({ name: undefined, start_date: undefined, end_date: undefined, prize: undefined });
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editChallengeRequest(auth.data.token, challengeId, formValues));
  };
  
  if (!auth.data.token) return <Navigate to="/login" replace />;

  if (challenge.data.status != 'created' && challenge.data.status != 'active') {
    return (
        <>
        <h1>You cannot edit this Challenge because it has already started</h1>
        </>);
  }

  return (
    <>
    
    <button onClick={() => 
              navigate("/challenge/" + challengeId)
            }
            >Go back to Challenge</button>
      <h1>{challenge.data.status}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={handleInputChange}
          defaultValue={challenge.data.name}
          value={formValues.name}
        />
        <label htmlFor="start_date">Start Date</label>
        <input
          id="start_date"
          name="start_date"
          type="date"
          onChange={handleInputChange}
          defaultValue={challenge.data.start_date.split("T")[0]}
          value={formValues.start_date}
        />
        <label htmlFor="end_date">End Date</label>
        <input
          id="end_date"
          name="end_date"
          type="date"
          onChange={handleInputChange}
          defaultValue={challenge.data.end_date.split("T")[0]}
          value={formValues.end_date}
        />
        <label htmlFor="prize">Prize</label>
        <input
          id="prize"
          name="prize"
          type="text"
          onChange={handleInputChange}
          defaultValue={challenge.data.prize}
          value={formValues.prize}
        />
        <button type="submit">Save Changes</button>
      </form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    challenge:state.challenge,
    auth:state.auth
  }
}


export default connect(mapStateToProps)(ChallengeEdit)