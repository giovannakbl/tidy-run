import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
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
  logoutRequest,
}) => {
  let navigate = useNavigate();
  let { challengeId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    getTasksInChallenge();
    getHomeMembers();
    getScoreBoards();
  }, []);
  const getChallenge = async () => {
    await fetchChallengeRequest(auth.data.token, challengeId);
  };
  const getTasksInChallenge = async () => {
    await fetchTasksInChallengeRequest(auth.data.token, challengeId);
  };
  const getHomeMembers = async () => {
    await allHomeMembersRequest(auth.data.token);
  };
  const getScoreBoards = async () => {
    const res = await fetchChallengeRequest(auth.data.token, challengeId);
    const challengeStatus = res.challenge.status;
    if (challengeStatus == "completed" || challengeStatus == "terminated") {
      await fetchScoreBoardsRequest(auth.data.token, challengeId);
    }
  };
  const removeCompletionTask = async (taskId) => {
    await removeCompletionTaskRequest(auth.data.token, taskId);
    getChallenge();
    getTasksInChallenge();
  };
  const terminateChallenge = async () => {
    await terminateChallengeRequest(auth.data.token, challengeId);
  };
  const reopenChallenge = async () => {
    await reopenChallengeRequest(auth.data.token, challengeId);
  };
  const handleLogout = async () => {
    await logoutRequest();
  };

  if (auth.data.token == null) return <Navigate to="/login" replace />;

  return (
    <>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <div className="go-back-area">
        <button
          className="go-back-button"
          onClick={() => navigate("/challenge-list")}
        >
          &#60;&#60; Go back to Challenge List
        </button>
      </div>
      {challenge.loading ? (
        <p>Loading...</p>
      ) : challenge.error ? (
        <p>Error</p>
      ) : (
        <>
          <div className="challenge-info">
            <h2>{challenge.data.challenge.name}</h2>
            <h3>Status: {challenge.data.challenge.status}</h3>
            <h3>Start date: {challenge.data.challenge.start_date}</h3>
            <h3>End date: {challenge.data.challenge.end_date}</h3>
            <h3>Prize: {challenge.data.challenge.prize}</h3>
          
          {challenge.data.challenge.status == "created" ||
          challenge.data.challenge.status == "active" ? (
            <button onClick={() => navigate("/challenge-edit/" + challengeId)}>
              Edit Challenge Info
            </button>
          ) : challenge.data.challenge.status == "started" ? (
            <button onClick={terminateChallenge}>
              Terminate this Challenge
            </button>
          ) : challenge.data.challenge.status == "terminated" ? (
            <button onClick={reopenChallenge}>Reopen this Challenge</button>
          ) : null}
          </div>
        </>
      )}
      <h2>Challenge Tasks</h2>
      {challenge.loading || tasks.loading || homeMembers.loading ? (
        <p>Loading...</p>
      ) : challenge.error || tasks.error || homeMembers.error ? (
        <p>Error</p>
      ) : (
        <>
          {challenge.data.challenge.status == "created" ||
          challenge.data.challenge.status == "active" ? (
            <button onClick={() => navigate("/task-new/" + challengeId)}>
              Create new task in Challenge
            </button>
          ) : null}

          {tasks.data.tasksList.map((item) => (
            <div className="task-info">
              <div className="flex-row-start">
                <div
                  className="fa-icons"
                  style={{
                    backgroundColor: standardOptions.iconColor.find(
                      (element) => element.name === item.icon_color
                    ).color,
                  }}
                >
                  <FontAwesomeIcon
                    icon={
                      standardOptions.taskIcon.find(
                        (element) => element.name === item.task_icon
                      ).icon
                    }
                  />
                </div>
                <div>
                  <p
                    style={{
                      color: standardOptions.iconColor.find(
                        (element) => element.name === item.icon_color
                      ).color,
                    }}
                  >
                    {item.name}
                  </p>
                </div>
              </div>
              <p
                style={{
                  color: standardOptions.iconColor.find(
                    (element) => element.name === item.icon_color
                  ).color,
                }}
              >
                Difficulty: {item.difficulty}
              </p>

              {item.completed_at ? (
                <>
                  <p>Status: completed</p>
                  <p>Points Earned: {item.points_earned}</p>
                  <p>Completed At: {item.completed_at}</p>
                  <p>
                    Id of the Home Member that completed the task:{" "}
                    {item.home_member_id}
                  </p>
                  <p>
                    Name of the Home Member that completed the task:
                    {
                      homeMembers.data.homeMembersList.find(
                        (homeMember) => homeMember.id === item.home_member_id
                      ).name
                    }
                  </p>
                </>
              ) : (
                <>
                  <p>Status: incomplete</p>
                </>
              )}
              {challenge.data.challenge.status == "created" ||
              challenge.data.challenge.status == "active" ? (
                <button onClick={() => navigate("/task-edit/" + item.id)}>
                  Edit task
                </button>
              ) : null}

              {challenge.data.challenge.status != "completed" &&
              challenge.data.challenge.status != "terminated" &&
              item.completed_at ? (
                <button onClick={() => removeCompletionTask(item.id)}>
                  Remove completion of task
                </button>
              ) : null}

              {challenge.data.challenge.status != "terminated" &&
              !item.completed_at ? (
                <button onClick={() => navigate("/task-complete/" + item.id)}>
                  Complete task
                </button>
              ) : null}
            </div>
          ))}
        </>
      )}

      {challenge.loading ? null : challenge.error ? null : challenge.data
          .challenge.status != "completed" &&
        challenge.data.challenge.status !=
          "terminated" ? null : scoreBoards.loading ? (
        <p>Loading...</p>
      ) : scoreBoards.error ? (
        <p>Error</p>
      ) : (
        <>
          <h2>Ranking:</h2>
          {scoreBoards.data.scoreBoards.map((item) => (
            <>
            <div className="ranking-info">
            <h3>Position: {item.rank_in_challenge}</h3>
            <div className="flex-row-start">
              <div
                className="fa-icons"
                style={{
                  backgroundColor: standardOptions.iconColor.find(
                    (element) => element.name === homeMembers.data.homeMembersList.find(
                      (homeMember) => homeMember.id === item.home_member_id
                    ).icon_color
                  ).color
                }}
              >
                <FontAwesomeIcon
                  icon={
                    standardOptions.avatarIcon.find(
                      (element) => element.name === homeMembers.data.homeMembersList.find(
                        (homeMember) => homeMember.id === item.home_member_id
                      ).avatar_icon
                    ).icon
                  }
                />
              </div>
              <div>
                <p
                  style={{
                    color: standardOptions.iconColor.find(
                      (element) => element.name === homeMembers.data.homeMembersList.find(
                        (homeMember) => homeMember.id === item.home_member_id
                      ).icon_color
                    ).color
                  }}
                >
                  {homeMembers.data.homeMembersList.find(
                    (homeMember) => homeMember.id === item.home_member_id
                  ).name}
                </p>
              </div>
            </div>
            <h4>Total points: {item.total_points}</h4>
            </div>
            </>
          ))}
        </>
      )}
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
