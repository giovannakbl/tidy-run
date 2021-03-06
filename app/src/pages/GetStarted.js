import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { tidyUserRequest } from "../store/TidyUser/actions";
import { logoutRequest } from "../store/Auth/actions";
import { bindActionCreators } from "redux";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../components/spinner/Spinner";

const GetStarted = ({ auth, tidyUser, tidyUserRequest, logoutRequest }) => {
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
        <h1 className="page-main-title">Getting Started</h1>

        <div className="game-explanation-container">
          <h2 className="page-sec-title">Tidy Run</h2>
          <p className="account-info-text-sec">
            Now that you have created an account, I am going to give you a step
            by step for setting everything up and start competing!
          </p>

          <h3 className="page-sec-title-left">Step 1:</h3>
          <p className="account-info-text-sec">
            You can custom your info and set a name for your home! You can
            access that option by clicking on: Account &gt; Change your family
            name
          </p>
          <h3 className="page-sec-title-left">Step 2:</h3>
          <p className="account-info-text-sec">
            The next step is adding the list of people who share the same home
            and will be a part of the competition. You can add as many home
            members as you want by going to: Home &gt; New Home Member
          </p>
          <h3 className="page-sec-title-left">Step 3:</h3>
          <p className="account-info-text-sec">
            Let's create some of the tasks you usually need to get done in your
            home. Go to Home &gt; Manage model tasks.{" "}
          </p>
          <h3 className="page-sec-title-left">Step 4:</h3>
          <p className="account-info-text-sec">
            Now that everything is set, we can create our first challenge! Go to
            Challenges &gt; New Challenge. Choose a name for your challenge,
            indicate the dates when it will start and end and what will be the
            prize for the winner. After that, you will need to add the tasks
            that need to be completed in this period. You can choose any task
            you want from the model tasks you created before. You can always add
            a new model task or edit them if you wish!
          </p>
          <h3 className="page-sec-title-left">Step 5:</h3>
          <p className="account-info-text-sec">
            Ready, set, go! The competition has started. You can all start doing
            the challenge tasks and whenever a task is completed, you can access
            the challenge details going to Challenges &gt; See more details and
            register the completion of the task, indicating who completed it and
            when.
          </p>
          <h3 className="page-sec-title-left">Step 6:</h3>
          <p className="account-info-text-sec">
            End of the challenge. The challenge can end in two ways: When all
            the tasks are completed, or if terminate the challenge before that.
            You can terminate a challenge if at least one task has been
            completed. When a challenge ends, you can then check out the podium
            and see who won it!
          </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(GetStarted);
