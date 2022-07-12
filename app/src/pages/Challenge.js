import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { logoutRequest } from "../store/Auth/actions";
import {
  fetchChallengeRequest,
  terminateChallengeRequest,
  reopenChallengeRequest,
} from "../store/Challenge/actions";
import {
  fetchTasksInChallengeRequest,
  removeCompletionTaskRequest,
} from "../store/Tasks/actions";
import { allHomeMembersRequest } from "../store/HomeMembers/actions";
import { fetchScoreBoardsRequest } from "../store/ScoreBoards/actions";
import { bindActionCreators } from "redux";
import { standardOptions } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header";
import format from "..";
import Spinner from "../components/spinner/Spinner";

const Challenge = ({
  auth,
  challenge,
  tasks,
  homeMembers,
  scoreBoards,
  fetchTasksInChallengeRequest,
  removeCompletionTaskRequest,
  allHomeMembersRequest,
  fetchChallengeRequest,
  terminateChallengeRequest,
  reopenChallengeRequest,
  fetchScoreBoardsRequest,
}) => {
  let navigate = useNavigate();
  let { challengeId } = useParams();
  useEffect(() => {
    getTasksInChallenge();
    getHomeMembers();
    getScoreBoards();
  }, []);
  useEffect(() => {
    getScoreBoards();
  }, [challenge.data.challenge.status]);
  const [homeMembersIndex, setHomeMembersIndex] = useState({});
  const [tasksInfo, setTasksInfo] = useState([]);
  const [scoreBoardsInfo, setScoreBoardsInfo] = useState([]);
  const getHomeMembersIndex = (allHomeMembersDetails) => {
    let result = {};
    if (allHomeMembersDetails.home_members_all) {
      allHomeMembersDetails.home_members_all.map(
        (item) =>
          (result[item.id] = {
            id: item.id,
            name: item.name,
            color: standardOptions.iconColor.find(
              (element) => element.name === item.icon_color
            ).color,
            icon: standardOptions.avatarIcon.find(
              (element) => element.name === item.avatar_icon
            ).icon,
          })
      );
    }
    return result;
  };
  const getTasksInfo = (allTasksDetails) => {
    let result = [];
    allTasksDetails.tasks.map(
      (item, index) =>
        (result[index] = {
          id: item.id,
          name: item.name,
          color: standardOptions.iconColor.find(
            (element) => element.name === item.icon_color
          ).color,
          icon: standardOptions.taskIcon.find(
            (element) => element.name === item.task_icon
          ).icon,
          homeMemberId: item.home_member_id,
          difficulty: item.difficulty,
          pointsEarned: item.points_earned,
          completedAt: item.completed_at,
        })
    );
    return result;
  };
  const getChallenge = async () => {
    await fetchChallengeRequest(challengeId);
  };

  const getTasksInChallenge = async () => {
    const allTasksDetails = await fetchTasksInChallengeRequest(challengeId);
    setTasksInfo(getTasksInfo(allTasksDetails));
  };
  const getHomeMembers = async () => {
    const allHomeMembersDetails = await allHomeMembersRequest();
    setHomeMembersIndex(getHomeMembersIndex(allHomeMembersDetails));
  };
  const getScoreBoards = async () => {
    const res = await fetchChallengeRequest(challengeId);
    const challengeStatus = res.challenge.status;
    if (challengeStatus == "completed" || challengeStatus == "terminated") {
      const allScoreBoardsDetails = await fetchScoreBoardsRequest(challengeId);
      setScoreBoardsInfo(allScoreBoardsDetails.challenge_score_boards);
    } else {
      setScoreBoardsInfo([]);
    }
  };
  const removeCompletionTask = async (taskId) => {
    await removeCompletionTaskRequest(taskId);
    getChallenge();
    getTasksInChallenge();
  };
  const terminateChallenge = async () => {
    await terminateChallengeRequest(challengeId);
  };
  const reopenChallenge = async () => {
    await reopenChallengeRequest(challengeId);
  };

  return (
    <>
      <Header></Header>
      <main>
        <button
          className="go-back-button"
          onClick={() => navigate("/challenge-list")}
        >
          &#60;&#60; Go back to Challenge List
        </button>
        {challenge.loading ? (
          <Spinner />
        ) : challenge.error ? (
          <p>Error</p>
        ) : (
          <>
            <h1 className="page-main-title">Challenges</h1>
            <div className="challenge-card">
              <div className="card-row-center">
                <h2 className="card-text-title">
                  {challenge.data.challenge.name}
                </h2>
              </div>
              <div className="card-row-left">
                <h3 className="card-text-standard-info">Status: </h3>
                <h3 className="card-text-custom-info">
                  {challenge.data.challenge.status}
                </h3>
              </div>
              <div className="card-row-left">
                <h3 className="card-text-standard-info">Start date: </h3>
                <h3 className="card-text-custom-info">
                  {format(challenge.data.challenge.start_date)}
                </h3>
              </div>
              <div className="card-row-left">
                <h3 className="card-text-standard-info">End date: </h3>
                <h3 className="card-text-custom-info">
                  {format(challenge.data.challenge.end_date)}
                </h3>
              </div>
              <div className="card-row-left">
                <h3 className="card-text-standard-info">Prize: </h3>
                <h3 className="card-text-custom-info">
                  {challenge.data.challenge.prize}
                </h3>
              </div>
              <div className="card-row-buttons-left">
                {challenge.data.challenge.status == "created" ||
                challenge.data.challenge.status == "active" ? (
                  <button
                    className="card-button"
                    type="button"
                    onClick={() => navigate("/challenge-edit/" + challengeId)}
                  >
                    <div className="card-icon-button">
                      <FontAwesomeIcon icon="fa-pencil" />
                    </div>
                    <div>Edit Challenge</div>
                  </button>
                ) : challenge.data.challenge.status == "started" ? (
                  <button
                    className="card-button"
                    onClick={terminateChallenge}
                  >
                    <div className="card-icon-button">
                      <FontAwesomeIcon icon="fa-list-check" />
                    </div>
                    <div>Terminate this Challenge</div>
                  </button>
                ) : challenge.data.challenge.status == "terminated" ? (
                  <button
                    className="card-button"
                    onClick={reopenChallenge}
                  >
                    <div className="card-icon-button">
                      <FontAwesomeIcon icon="fa-lock-open" />
                    </div>
                    <div>Reopen</div>
                  </button>
                ) : null}
              </div>
            </div>
            <h2 className="page-sec-title">Challenge Tasks</h2>
            {challenge.data.challenge.status == "created" ||
            challenge.data.challenge.status == "active" ? (
              <button
                className="new-item-button"
                onClick={() => navigate("/task-new/" + challengeId)}
              >
                <div>
                  <FontAwesomeIcon className="new-item-icon" icon="fa-plus" />
                </div>
                <div>Add task</div>
              </button>
            ) : null}
          </>
        )}

        {challenge.loading ||
        tasks.loading ||
        homeMembers.loading ||
        (homeMembers.data.homeMembersList.length > 0 &&
          Object.keys(homeMembersIndex).length === 0) ||
        tasksInfo.length === 0 ? null : challenge.error ||
          tasks.error ||
          homeMembers.error ? (
          <p>Error</p>
        ) : (
           <>
          <div className="task-area">
            {tasksInfo.map((item) => (
              <div className="task-card">
                <div className="task-card-row-initial ">
                  <div
                    className="medium-icon-circle"
                    style={{
                      backgroundColor: item.color,
                    }}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                  </div>

                  <p
                    className="task-card-main-title"
                    style={{
                      color: item.color,
                      textDecoration: item.completedAt
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {item.name}
                  </p>
                </div>

                <div className="task-card-row-advance-one">
                  <p
                    className="task-card-standard-text"
                    style={{
                      color: item.color,
                    }}
                  >
                    {item.difficulty}
                  </p>
                </div>
                <div className="task-card-row-advance-one">
                  {item.completedAt ? (
                    <p className="task-card-standard-text">
                      Completed At: {format(item.completedAt)}
                    </p>
                  ) : null}
                </div>

                {item.completedAt ? (
                  <>
                    <div className="task-card-row-advance-one">
                      <div
                        className="small-icon-circle"
                        style={{
                          backgroundColor:
                            homeMembersIndex[item.homeMemberId].color,
                        }}
                      >
                        <FontAwesomeIcon
                          icon={homeMembersIndex[item.homeMemberId].icon}
                        />
                      </div>

                      <p
                        className="task-card-sec-title"
                        style={{
                          color: homeMembersIndex[item.homeMemberId].color,
                        }}
                      >
                        {homeMembersIndex[item.homeMemberId].name}
                      </p>
                    </div>
                    <div className="task-card-row-advance-two">
                      <p className="task-card-standard-text">
                        {item.pointsEarned} Points Earned
                      </p>
                    </div>
                  </>
                ) : null}

                <div className="card-row-buttons-left">
                  {challenge.data.challenge.status == "created" ||
                  challenge.data.challenge.status == "active" ? (
                    <button
                      className="card-button"
                      onClick={() => navigate("/task-edit/" + item.id)}
                    >
                      <div className="card-icon-button">
                        <FontAwesomeIcon icon="fa-pencil" />
                      </div>
                      <div>Edit</div>
                    </button>
                  ) : null}
                  {challenge.data.challenge.status != "terminated" &&
                  item.completedAt ? (
                    <button
                      className="card-button"
                      onClick={() => removeCompletionTask(item.id)}
                    >
                      <div className="card-icon-button">
                        <FontAwesomeIcon icon="fa-xmark" />
                      </div>
                      <div>Remove completion of task</div>
                    </button>
                  ) : null}
                  {challenge.data.challenge.status != "terminated" &&
                  !item.completedAt ? (
                    <>
                      <button
                        className="card-button complete-button"
                        onClick={() => navigate("/task-complete/" + item.id)}
                      >
                        <div className="card-icon-button">
                          <FontAwesomeIcon icon="fa-check" />
                        </div>
                        <div>Complete</div>
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            ))}
            </div>
           </> 
        )}

        {challenge.loading ? null : challenge.error ? null : challenge.data
            .challenge.status != "completed" &&
          challenge.data.challenge.status !=
            "terminated" ? null : scoreBoards.loading ||
          Object.keys(homeMembersIndex).length === 0 ||
          scoreBoardsInfo.length === 0 ? (
          <Spinner />
        ) : scoreBoards.error ? (
          <p>Error</p>
        ) : (
          <>
            <h2 className="page-sec-title">Ranking:</h2>
            {scoreBoardsInfo.map((item) => (
              <>
                <div className="task-card">
                  <div className="card-row-left">
                  {/* <h3 className="card-text-custom-info">Position: </h3> */}
                    <h3 className="card-text-custom-info">
                    Position: {item.rank_in_challenge}
                    </h3>
                  </div>
                  <div className="task-card-row-initial">
                    {/* <div className="full-height"> */}
                      <div
                        className="medium-icon-circle"
                        style={{
                          backgroundColor:
                            homeMembersIndex[item.home_member_id].color,
                        }}
                      >
                        <FontAwesomeIcon
                          icon={homeMembersIndex[item.home_member_id].icon}
                        />
                      </div>
                    {/* </div> */}
                    {/* <div className="flex-column-start full-width"> */}
                      {/* <div className="home-member-name"> */}
                        <p className="task-card-main-title"
                          style={{
                            color: homeMembersIndex[item.home_member_id].color,
                          }}
                        >
                          {homeMembersIndex[item.home_member_id].name}
                        </p>
                      {/* </div> */}
                      
                    {/* </div> */}
                  </div>
                  <div className="task-card-row-advance-one">
                        <p className="card-text-custom-info"
                        >Points: {item.total_points}</p>
                      </div>
                </div>
              </>
            ))}
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
    tasks: state.tasks,
    homeMembers: state.homeMembers,
    scoreBoards: state.scoreBoards,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchChallengeRequest,
      terminateChallengeRequest,
      reopenChallengeRequest,
      logoutRequest,
      fetchTasksInChallengeRequest,
      allHomeMembersRequest,
      removeCompletionTaskRequest,
      fetchScoreBoardsRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
