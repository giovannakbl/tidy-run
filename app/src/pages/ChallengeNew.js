import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createChallengeRequest } from "../store/Challenge/actions";
import Header from '../components/Header';
import Alert from "../components/alert/Alert";

const ChallengeNew = ({ auth, createChallengeRequest, challenge }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: undefined,
    start_date: undefined,
    end_date: undefined,
    prize: undefined,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState(undefined);
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(formValues);
    setIsSubmitted(false);
    setFormErrorMessage(undefined);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setIsSubmitted(true);
    try {
      const result = await createChallengeRequest(auth.data.token, formValues);
      let newChallenge = result.challenge;
      navigate("/challenge/" + newChallenge.id);
    } catch (e) {}
  }
  };

  const isFormValid = () => {
    if (
      !formValues.name ||
      !formValues.start_date ||
      !formValues.end_date ||
      !formValues.prize
    ) {
      setFormErrorMessage("You must fill in all the required information");
      return false;
    }
    if (formValues.name) {
      if (formValues.name.trim().length === 0 || formValues.name === null) {
        setFormErrorMessage("The name must have at least a number or letter");
        return false;
      }
    }
    if (formValues.prize) {
      if (formValues.prize.trim().length === 0 || formValues.prize === null) {
        setFormErrorMessage("The prize must have at least a number or letter");
        return false;
      }
    }
    if (formValues.start_date && formValues.end_date && formValues.start_date > formValues.end_date) {
      setFormErrorMessage("The End date must be greater than the Start date");
        return false;
    }
    return true;
  };

  if (!auth.data.token) return <Navigate to="/login" replace />;

  return (
    
    <>
    <Header></Header>
    <main>
    {isSubmitted && challenge.status === "rejected" && (
          <Alert type="error" message={challenge.error.error_message_api} />
        )}
        {isSubmitted && challenge.status === "succeeded" && (
          <Alert
            type="success"
            message={
              "Your Challenge was created!"
            }
          />
        )}
        {formErrorMessage ? (
          <Alert type="error" message={formErrorMessage} />
        ) : null}
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
          className="input-text"
          required
        />
        <label htmlFor="start_date">Start Date</label>
        <input
          id="start_date"
          name="start_date"
          type="date"
          onChange={handleInputChange}
          value={formValues.start_date}
          className="input-text"
          required
        />
        <label htmlFor="end_date">End Date</label>
        <input
          id="end_date"
          name="end_date"
          type="date"
          onChange={handleInputChange}
          value={formValues.end_date}
          className="input-text"
          required
        />
        <label htmlFor="prize">Prize</label>
        <input
          id="prize"
          name="prize"
          type="text"
          onChange={handleInputChange}
          value={formValues.prize}
          className="input-text"
          required
        />
        <button type="submit">Create challenge</button>
      </form>
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    challenge: state.challenge
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
