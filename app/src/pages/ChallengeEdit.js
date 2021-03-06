import { useEffect, useState } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  deleteChallengeRequest,
  editChallengeRequest,
  fetchChallengeRequest
} from "../store/Challenge/actions";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "../components/alert/Alert";
import DeleButtton from "../components/delete-button/DeleteButton";
import Spinner from "../components/spinner/Spinner";
import format from "..";

const ChallengeEdit = ({
  auth,
  challenge,
  editChallengeRequest,
  deleteChallengeRequest,
  fetchChallengeRequest
}) => {
  let { challengeId } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: undefined,
    start_date: undefined,
    end_date: undefined,
    prize: undefined,
  });
  useEffect(() => {
    getChallenge();
  }, []);
  const getChallenge = async () => {
    const fetchedChallenge = await fetchChallengeRequest(challengeId);
    setFormValues({
      name: fetchedChallenge.challenge.name,
      start_date: fetchedChallenge.challenge.start_date.split("T")[0],
      end_date: fetchedChallenge.challenge.end_date.split("T")[0],
      prize: fetchedChallenge.challenge.prize,
    });
  };
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState(undefined);
  const [isDeletedRequested, setIsDeletedRequested] = useState(false);
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormErrorMessage(undefined);
    setIsSubmitted(false);
    setIsDeletedRequested(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setIsSubmitted(true);
      const result = await editChallengeRequest(
        challengeId,
        formValues
      );
      navigate("/challenge/" + challengeId);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const handleDeleteChallenge = async () => {
    await deleteChallengeRequest(challengeId);
    navigate("/challenge-list");
  };

  const isFormValid = () => {
    if (formValues.name.trim().length === 0 || formValues.name === null) {
      setFormErrorMessage("The name must have at least a number or letter");
      return false;
    }
    if (formValues.prize) {
      if (formValues.prize.trim().length === 0 || formValues.prize === null) {
        setFormErrorMessage("The prize must have at least a number or letter");
        return false;
      }
    }
    if (
      
        formValues.start_date > formValues.end_date
    ) {
      setFormErrorMessage("The End date must be greater than the Start date");
      return false;
    }
    return true;
  };

  return (
    <>
      <Header></Header>
      <main>
        
        {challenge.loading ||
        challenge.data.challenge.start_date === undefined ||
        challenge.data.challenge.end_date === undefined ? (
          <Spinner/>
        ) : challenge.error && !isSubmitted ? (
          <p>Error</p>
        ) : challenge.data.challenge.status === "started" ||
          challenge.data.challenge.status === "terminated" ? (
          challenge.data.challenge.status ===
          "completed"(
            <>
                <button
                  type="button"
                  className="go-back-button"
                  onClick={() => navigate("/challenge/" + challengeId)}
                >
                  &#60;&#60; Go back to Challenge
                </button>
              {/* </div> */}
              <h1 className="page-main-title">You cannot edit this Challenge because it has already started</h1>
              
            </>
          )
        ) : (
          <>
              <button
                type="button"
                className="go-back-button"
                onClick={() => navigate("/challenge/" + challengeId)}
              >
                &#60;&#60; Go back to Challenge
              </button>

<h1 className="page-main-title">Edit Challenge</h1>
<div className="alert-area">
{isSubmitted && challenge.status === "rejected" ? (
          <Alert
          handleInputChange={handleInputChange}  type="error" message={challenge.error.error_message_api} />
        ) : null}
        {isSubmitted && challenge.status === "succeeded" ? (
          <Alert
          handleInputChange={handleInputChange} 
            type="success"
            message={
              "Your Challenge " +
              challenge.data.challenge.name +
              " was updated!"
            }
          />
        ) : null}
        {formErrorMessage ? (
          <Alert
          handleInputChange={handleInputChange}  type="error" message={formErrorMessage} />
        ) : null}
</div>
            <form className="standard-form" onSubmit={handleSubmit}>
              <label className="standard-label" htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={handleInputChange}
                defaultValue={challenge.data.challenge.name}
                value={formValues.name}
                className="standard-text-input"
                required
              />
              <label className="standard-label" htmlFor="start_date">Start Date</label>
              <input
                id="start_date"
                name="start_date"
                type="date"
                onChange={handleInputChange}
                defaultValue={challenge.data.challenge.start_date.split("T")[0]}
                value={formValues.start_date}
                className="standard-text-input"
                required
              />
              <label className="standard-label" htmlFor="end_date">End Date</label>
              <input
                id="end_date"
                name="end_date"
                type="date"
                onChange={handleInputChange}
                defaultValue={challenge.data.challenge.end_date.split("T")[0]}
                value={formValues.end_date}
                className="standard-text-input"
                required
              />
              <label className="standard-label" htmlFor="prize">Prize</label>
              <input
                id="prize"
                name="prize"
                type="text"
                onChange={handleInputChange}
                defaultValue={challenge.data.challenge.prize}
                value={formValues.prize}
                className="standard-text-input"
                required
              />
              <div className="card-row-buttons-center">
              <button className="card-button" type="submit">Save Changes</button>
              </div>
            </form>

            <DeleButtton
              isDeletedRequested={isDeletedRequested}
              deleteFunction={handleDeleteChallenge}
              setIsDeletedRequested={setIsDeletedRequested}
            />
          </>
        )}
      </main>
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
      editChallengeRequest,
      deleteChallengeRequest,
      fetchChallengeRequest
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeEdit);
