import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { logoutRequest } from "../store/Auth/actions";
import { fetchChallengeRequest } from "../store/Challenge/actions";
import {
  fetchTasksInChallengeRequest,
  removeCompletionTaskRequest,
} from "../store/Tasks/actions";
import { allHomeMembersRequest } from "../store/HomeMembers/actions";
import { bindActionCreators } from "redux";

const Challenge = ({
  auth,
  challenge,
  tasks,
  homeMembers,
  fetchTasksInChallengeRequest,
  removeCompletionTaskRequest,
  allHomeMembersRequest,
  fetchChallengeRequest,
  logoutRequest,
}) => {
  let navigate = useNavigate();
  let { challengeId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    getChallenge();
    getTasksInChallenge();
    getHomeMembers();
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
  const removeCompletionTask = async (taskId) => {
    await removeCompletionTaskRequest(auth.data.token, taskId);
    getChallenge();
    getTasksInChallenge();
  };

  const handleLogout = async () => {
    await logoutRequest();
  };

  if (auth.data.token == null) return <Navigate to="/login" replace />;

  return (
    <>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <button onClick={() => navigate("/challenge-list")}>
        Go back to Challenge List
      </button>
      <h1>Challenge</h1>
      <h2>Check out your Challenge</h2>
      {challenge.loading ? (
        <p>Loading...</p>
      ) : challenge.error ? (
        <p>Error</p>
      ) : (
        <>
          <ul>
            <li>id: {challenge.data.challenge.id}</li>
            <li>Created at: {challenge.data.challenge.created_at}</li>
            <li>name: {challenge.data.challenge.name}</li>
            <li>status: {challenge.data.challenge.status}</li>
            <li>Start date: {challenge.data.challenge.start_date}</li>
            <li>End date: {challenge.data.challenge.end_date}</li>
            <li>Prize: {challenge.data.challenge.prize}</li>
          </ul>
          {challenge.data.challenge.status == "created" ||
          challenge.data.challenge.status == "active" ? (
            <button onClick={() => navigate("/challenge-edit/" + challengeId)}>
              Edit Challenge Info
            </button>
          ) : null}
        </>
      )}
      <h1>Challenge Tasks</h1>
      <h2>Check out your Challenge Tasks</h2>
      {challenge.loading || tasks.loading || homeMembers.loading ? (
        <p>Loading...</p>
      ) : challenge.error || tasks.error || homeMembers.error ? (
        <p>Error</p>
      ) : (
        <>
          {challenge.data.challenge.status == "created" ||
          challenge.data.challenge.status == "active" ? (
            <>
              <button onClick={() => navigate("/task-new/" + challengeId)}>
                Create new task in Challenge
              </button>
              {tasks.data.tasksList.map((item) => (
                <ul>
                  <li>Task name: {item.name}</li>
                  <li>Task Icon: {item.task_icon}</li>
                  <li>Icon Color: {item.icon_color}</li>
                  <li>Difficulty: {item.difficulty}</li>
                  {item.completed_at ? (
                    <>
                      <li>Status: completed</li>
                      <li>Points Earned: {item.points_earned}</li>
                      <li>Completed At: {item.completed_at}</li>
                      <li>
                        Id of the Home Member that completed the task:{" "}
                        {item.home_member_id}
                      </li>
                      <li>
                        Name of the Home Member that completed the task:
                        {
                          homeMembers.data.homeMembersList.find(
                            (homeMember) =>
                              homeMember.id === item.home_member_id
                          ).name
                        }
                      </li>
                    </>
                  ) : (
                    <>
                      <li>Status: incomplete</li>
                      {challenge.status == "terminated" ? null : (
                        <li>
                          <button
                            onClick={() =>
                              navigate("/task-complete/" + item.id)
                            }
                          >
                            Complete task
                          </button>
                        </li>
                      )}
                    </>
                  )}
                  <li>
                    <button onClick={() => navigate("/task-edit/" + item.id)}>
                      Edit task
                    </button>
                  </li>
                </ul>
              ))}
            </>
          ) : (
            <>
              {tasks.data.tasksList.map((item) => (
                <ul>
                  <li>Task name: {item.name}</li>
                  <li>Task Icon: {item.task_icon}</li>
                  <li>Icon Color: {item.icon_color}</li>
                  <li>Difficulty: {item.difficulty}</li>
                  {item.completed_at ? (
                    <>
                      <li>Status: completed</li>
                      <li>Points Earned: {item.points_earned}</li>
                      <li>Completed At: {item.completed_at}</li>
                      <li>
                        Id of the Home Member that completed the task:{" "}
                        {item.home_member_id}
                      </li>
                      <li>
                        Name of the Home Member that completed the task:
                        {
                          homeMembers.data.homeMembersList.find(
                            (homeMember) =>
                              homeMember.id === item.home_member_id
                          ).name
                        }
                      </li>
                      {challenge.status == "terminated" ? null : (
                        <li>
                          <button onClick={() => removeCompletionTask(item.id)}>
                            Remove completion of task
                          </button>
                        </li>
                      )}
                    </>
                  ) : (
                    <>
                      <li>Status: incomplete</li>
                      {challenge.status == "terminated" ? null : (
                        <li>
                          <button
                            onClick={() =>
                              navigate("/task-complete/" + item.id)
                            }
                          >
                            Complete task
                          </button>
                        </li>
                      )}
                    </>
                  )}
                </ul>
              ))}
            </>
          )}
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchChallengeRequest,
      logoutRequest,
      fetchTasksInChallengeRequest,
      allHomeMembersRequest,
      removeCompletionTaskRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
