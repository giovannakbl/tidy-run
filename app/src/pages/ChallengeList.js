import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { allChallengesRequest } from "../store/Challenge/actions";
import { logoutRequest } from "../store/Auth/actions";
import { bindActionCreators } from "redux";
import Header from '../components/Header';
import format  from "..";
import Spinner from "../components/spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChallengeList = ({
  auth,
  challenge,
  allChallengesRequest,
  logoutRequest,
}) => {
  let navigate = useNavigate();
  useEffect(() => {
    getAllChallenges();
  }, []);
  const getAllChallenges = async () => {
    await allChallengesRequest();
  };

  
  return (
    <>
    <Header></Header>
    <main>
      <h1 className="page-main-title">Challenges</h1>
      <button
                className="new-item-button"
                onClick={() => navigate("/challenge-new")}
              >
                <div>
                  <FontAwesomeIcon className="new-item-icon" icon="fa-plus" />
                </div>
                <div>New Challenge</div>
              </button>


      
      {challenge.loading ? (
        <Spinner/>
      ) : challenge.error ? (
        <p>Error</p>
      ) : (
        <>
        <div className="challenge-area">
          {challenge.data.challengeList.map((item) => (

          <div className="challenge-card">
<div className="card-row-center">
                <h2 className="card-text-title">
                {item.name}
                </h2>
              </div>
              <div className="card-row-left">
                <h3 className="card-text-standard-info">Status: </h3>
                <h3 className="card-text-custom-info">
                  {item.status}
                </h3>
              </div>
              <div className="card-row-left">
                <h3 className="card-text-standard-info">Start date: </h3>
                <h3 className="card-text-custom-info">
                  {format(item.start_date)}
                </h3>
              </div>
              <div className="card-row-left">
                <h3 className="card-text-standard-info">End date: </h3>
                <h3 className="card-text-custom-info">
                  {format(item.end_date)}
                </h3>
              </div>
              <div className="card-row-left">
                <h3 className="card-text-standard-info">Prize: </h3>
                <h3 className="card-text-custom-info">
                  {item.prize}
                </h3>
              </div>
              <div className="card-row-buttons-left">
              <button
                    className="card-button"
                    type="button"
                    onClick={() => navigate("/challenge/" + item.id)}
                  >
                    {/* <div className="card-icon-button">
                      <FontAwesomeIcon icon="fa-pencil" />
                    </div> */}
                    <div>See more details</div>
                  </button>
              </div>

          </div>
          ))}
</div>
          </>

      )}
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    challenge: state.challenge,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      allChallengesRequest,
      logoutRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeList);
