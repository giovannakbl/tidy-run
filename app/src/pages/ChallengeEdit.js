import { useEffect, useState } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  deleteChallengeRequest,
  editChallengeRequest,
} from "../store/Challenge/actions";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "../components/alert/Alert";
import DeleButtton from "../components/delete-button/DeleteButton";

const ChallengeEdit = ({
  auth,
  challenge,
  editChallengeRequest,
  deleteChallengeRequest,
}) => {
  let { challengeId } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: undefined,
    start_date: undefined,
    end_date: undefined,
    prize: undefined,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState(undefined);
  const [isDeletedRequested, setIsDeletedRequested] = useState(false);
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(formValues);
    setFormErrorMessage(undefined);
    setIsSubmitted(false);
    setIsDeletedRequested(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setIsSubmitted(true);
      const result = await editChallengeRequest(
        auth.data.token,
        challengeId,
        formValues
      );
    }
    navigate("/challenge/" + challengeId);
  };
  const handleDeleteChallenge = async () => {
    await deleteChallengeRequest(auth.data.token, challengeId);
    navigate("/challenge-list");
  };
  // useEffect(()=>{
  //   setIsDeletedRequested(false);
  //   console.log(isDeletedRequested);
  // },[])
  //   useEffect(()=>{
  //   console.log(challenge.data.challenge);
  // },[])

  const isFormValid = () => {
    if (
      !formValues.name &&
      !formValues.start_date &&
      !formValues.end_date &&
      !formValues.prize
    ) {
      setFormErrorMessage("No changes were made");
      return false;
    }
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
      (formValues.start_date &&
        formValues.end_date &&
        formValues.start_date > formValues.end_date) ||
      (formValues.start_date &&
        formValues.start_date > challenge.data.challenge.end_date) ||
      (formValues.end_date &&
        challenge.data.challenge.start_date > formValues.end_date)
    ) {
      setFormErrorMessage("The End date must be greater than the Start date");
      return false;
    }
    return true;
  };

  // useEffect(() => {
  //   console.log(challenge);
  //   console.log(isSubmitted);
  // }, [challenge.status]);

  if (!auth.data.token) return <Navigate to="/login" replace />;

  return (
    <>
      <Header></Header>
      <main>
        {isSubmitted && challenge.status === "rejected" ? (
          <Alert type="error" message={challenge.error.error_message_api} />
        ) : null}
        {isSubmitted && challenge.status === "succeeded" ? (
          <Alert
            type="success"
            message={
              "Your Challenge " +
              challenge.data.challenge.name +
              " was updated!"
            }
          />
        ) : null}
        {formErrorMessage ? (
          <Alert type="error" message={formErrorMessage} />
        ) : null}
        {challenge.loading ||
        challenge.data.challenge.start_date === undefined ||
        challenge.data.challenge.end_date === undefined ? (
          <p>Loading...</p>
        ) : challenge.error && !isSubmitted ? (
          <p>Error</p>
        ) : challenge.data.challenge.status == "started" ||
          challenge.data.challenge.status == "terminated" ? (
          challenge.data.challenge.status ==
          "completed"(
            <>
              <div className="go-back-area">
                <button
                  type="button"
                  className="go-back-button"
                  onClick={() => navigate("/challenge/" + challengeId)}
                >
                  &#60;&#60; Go back to Challenge
                </button>
              </div>
              <h1>
                You cannot edit this Challenge because it has already started
              </h1>
            </>
          )
        ) : (
          <>
            <div className="go-back-area">
              <button
                type="button"
                className="go-back-button"
                onClick={() => navigate("/challenge/" + challengeId)}
              >
                &#60;&#60; Go back to Challenge
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={handleInputChange}
                defaultValue={challenge.data.challenge.name}
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
                defaultValue={challenge.data.challenge.start_date.split("T")[0]}
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
                defaultValue={challenge.data.challenge.end_date.split("T")[0]}
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
                defaultValue={challenge.data.challenge.prize}
                value={formValues.prize}
                className="input-text"
                required
              />
              <button type="submit">Save Changes</button>
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
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeEdit);
