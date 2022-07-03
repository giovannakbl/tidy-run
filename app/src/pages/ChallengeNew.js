import { useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createChallengeRequest } from "../store/Challenge/actions";

const ChallengeNew = ({ auth, challenge, createChallengeRequest }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: undefined,
    start_date: undefined,
    end_date: undefined,
    prize: undefined,
  });
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const result = await createChallengeRequest(auth.data.token, formValues);
    let newChallenge = result.challenge;
    console.log(newChallenge);
    console.log("Vou redirecionar para" + newChallenge.id);
    navigate("/challenge/" + newChallenge.id);
    } catch (e) {
      console.log("Chegou no erro");
    }
  };

  if (!auth.data.token) return <Navigate to="/login" replace />;

  return (
    <>
      <button onClick={() => navigate("/challenge-list")}>
        Go back to Challenge List
      </button>
      <button onClick={() => console.log(challenge)}>Log Challenge</button>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={handleInputChange}
          value={formValues.name}
        />
        <label htmlFor="start_date">Start Date</label>
        <input
          id="start_date"
          name="start_date"
          type="date"
          onChange={handleInputChange}
          value={formValues.start_date}
        />
        <label htmlFor="end_date">End Date</label>
        <input
          id="end_date"
          name="end_date"
          type="date"
          onChange={handleInputChange}
          value={formValues.end_date}
        />
        <label htmlFor="prize">Prize</label>
        <input
          id="prize"
          name="prize"
          type="text"
          onChange={handleInputChange}
          value={formValues.prize}
        />
        <button type="submit">Create challenge</button>
      </form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    challenge: state.challenge,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      createChallengeRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeNew);
