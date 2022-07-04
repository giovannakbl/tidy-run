import { useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTaskRequest, completeTaskRequest } from "../store/Tasks/actions";
import { allHomeMembersRequest } from "../store/HomeMembers/actions";

const TaskComplete = ({
  auth,
  tasks,
  homeMembers,
  fetchTaskRequest,
  completeTaskRequest,
  allHomeMembersRequest,
}) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    home_member_id: undefined,
    completed_at: undefined,
  });
  let { taskId } = useParams();
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    getTask();
    getHomeMembers();
  }, []);
  const getTask = async () => {
    await fetchTaskRequest(auth.data.token, taskId);
  };
  const getHomeMembers = async () => {
    await allHomeMembersRequest(auth.data.token);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await completeTaskRequest(auth.data.token, taskId, formValues);
      navigate("/challenge/" + tasks.data.task.challenge_id);
    } catch (e) {}
  };

  if (!auth.data.token) return <Navigate to="/login" replace />;

  return (
    <>
      <button
        onClick={() => navigate("/challenge/" + tasks.data.task.challenge_id)}
      >
        Go back to Challenge
      </button>
      {tasks.loading || homeMembers.loading ? (
        <p>Loading...</p>
      ) : tasks.error || homeMembers.error ? (
        <p>Error</p>
      ) : (
        <>
          <ul>
            <li>Task name: {tasks.data.task.name}</li>
            <li>Task Icon: {tasks.data.task.task_icon}</li>
            <li>Icon Color: {tasks.data.task.icon_color}</li>
            <li>Difficulty: {tasks.data.task.difficulty}</li>
          </ul>
          <form onSubmit={handleSubmit}>
            {homeMembers.data.homeMembersList.map((item) => (
              <>
                <input
                  type="radio"
                  id={item.id}
                  name="home_member_id"
                  value={item.id}
                  onChange={handleInputChange}
                />
                <label for={item.id}>
                  {item.name} / id: {item.id} / avatar icon: {item.avatar_icon}
                </label>
                <br />
              </>
            ))}
            <label htmlFor="completed_at">Completed at</label>
            <input
              id="completed_at"
              name="completed_at"
              type="date"
              onChange={handleInputChange}
              value={formValues.completed_at}
            />

            <button type="submit">Complete Task</button>
          </form>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    tasks: state.tasks,
    homeMembers: state.homeMembers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchTaskRequest,
      completeTaskRequest,
      allHomeMembersRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskComplete);
