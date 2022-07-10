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

  if (!auth.loading && !auth.authenticated) return <Navigate to="/login" replace />;

  return (
    <>
      <Header></Header>
      <main>
        <h1>Game Rules</h1>
        




        <div className="game-explanation-container">
          <h2 className="game-explanation-title">Tidy Run</h2>

          <p className="game-explanation-text">
            Tidy Run provides a fun way to complete the household chores in a
            collaborative way!
          </p>
          <p className="game-explanation-text">
            Let me explain a little bit about how it works.
          </p>

          <h3 className="game-explanation-title">Dynamic of the game:</h3>
          <p className="game-explanation-text">
            Tidy Run allows you to list all the tasks that need to be done and
            also indicate the period in which they should be completed. For
            example:
          </p>
          <p className="game-explanation-text">
            Tasks that need to be done between the 01 of July and the 10 of
            July:
            
          </p>
          <ul>
              <li>
                <p className="game-explanation-text">Clean the windows</p>
              </li>
              <li>
                <p className="game-explanation-text">Mow the lawn</p>
              </li>
              <li>
                <p className="game-explanation-text">Clean the bathroom</p>
              </li>
              <li>
                <p className="game-explanation-text">Vacuum the living room</p>
              </li>
              <li>
                <p className="game-explanation-text">Take out the trash</p>
              </li>
            </ul>
          <p className="game-explanation-text">
            The members of the house are competitors in a challenge, where they
            perform those tasks and gain points for their completion.
          </p>
          <h3 className="game-explanation-title">
            The points earned for each task completion are calculated by adding
            the following:
          </h3>
          <p className="game-explanation-text">
            Completion points + Bonus points
          </p>
          <p className="game-explanation-text">
            Completion points depend on the task difficulty. (100 points for
            easy tasks, 200 for medium and 300 for hard ones)
          </p>
          <p className="game-explanation-text">
            Bonus points are set to a maximum of 100 points and depend on the
            date when the task was completed.
          </p>
          <p className="game-explanation-text">
            For example, if a challenge goes from the 01 of March until the 10
            of March, and a task is completed on de 01 of March, the member will
            receive 100 bonus points for that. On the other hand, if it is
            completed on the 05 of March, the member will be granted with 60
            bonus points.
          </p>
          <p className="game-explanation-text">
            The member who gets the most points can then be awarded a prize that
            will be provided by the other competitors, which can be a box of
            chocolates for example.
          </p>
          <p className="game-explanation-text">Let's do it!</p>

          
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
