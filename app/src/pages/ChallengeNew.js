import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createChallengeRequest } from "../store/Challenge/actions";

const ChallengeNew = ({ auth, createChallengeRequest }) => {
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
      navigate("/challenge/" + newChallenge.id);
    } catch (e) {}
  };

  if (!auth.data.token) return <Navigate to="/login" replace />;

  return (
    <>
      <div className="go-back-area">
        <button
          className="go-back-button"
          onClick={() => navigate("/challenge-list")}
        >
          &#60;&#60; Go back to Challenge List
        </button>
      </div>
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
