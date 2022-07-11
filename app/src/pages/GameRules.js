import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { tidyUserRequest } from "../store/TidyUser/actions";
import { logoutRequest } from "../store/Auth/actions";
import { bindActionCreators } from "redux";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../components/spinner/Spinner";

const GameRules = ({ auth, tidyUser, tidyUserRequest }) => {
  let navigate = useNavigate();
  const getTidyUser = async () => {
    await tidyUserRequest();
  };
  useEffect(() => {
    getTidyUser();
  }, []);

  return (
    <>
      <Header></Header>
      <main>
        <h1 className="page-main-title">Game Rules</h1>

        <div className="game-explanation-container">
          <h2 className="page-sec-title">Tidy Run</h2>

          <p className="account-info-text-sec">
            Tidy Run provides a fun way to complete the household chores in a
            collaborative way!
          </p>
          <p className="account-info-text-sec">
            Let me explain a little bit about how it works.
          </p>

          <h3 className="page-sec-title">Dynamic of the game:</h3>
          <p className="account-info-text-sec">
            Tidy Run allows you to list all the tasks that need to be done and
            also indicate the period in which they should be completed. For
            example:
          </p>
          <p className="account-info-text-sec">
            Tasks that need to be done between the 01 of July and the 10 of
            July:
          </p>
          <ul>
            <li>
              <p className="account-info-text-sec">Clean the windows</p>
            </li>
            <li>
              <p className="account-info-text-sec">Mow the lawn</p>
            </li>
            <li>
              <p className="account-info-text-sec">Clean the bathroom</p>
            </li>
            <li>
              <p className="account-info-text-sec">Vacuum the living room</p>
            </li>
            <li>
              <p className="account-info-text-sec">Take out the trash</p>
            </li>
          </ul>
          <p className="account-info-text-sec">
            The members of the house are competitors in a challenge, where they
            perform those tasks and gain points for their completion.
          </p>
          <h3 className="page-sec-title">
            The points earned for each task completion are calculated by adding
            the following:
          </h3>
          <p className="account-info-text-sec">
            Completion points + Bonus points
          </p>
          <p className="account-info-text-sec">
            Completion points depend on the task difficulty. (100 points for
            easy tasks, 200 for medium and 300 for hard ones)
          </p>
          <p className="account-info-text-sec">
            Bonus points are set to a maximum of 100 points and depend on the
            date when the task was completed.
          </p>
          <p className="account-info-text-sec">
            For example, if a challenge goes from the 01 of March until the 10
            of March, and a task is completed on de 01 of March, the member will
            receive 100 bonus points for that. On the other hand, if it is
            completed on the 05 of March, the member will be granted with 60
            bonus points.
          </p>
          <p className="account-info-text-sec">
            The member who gets the most points can then be awarded a prize that
            will be provided by the other competitors, which can be a box of
            chocolates for example.
          </p>
          <p className="account-info-text-sec">Let's do it!</p>
        </div>
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    tidyUser: state.tidyUser,
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      tidyUserRequest,
      logoutRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GameRules);
