import { useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTaskRequest, completeTaskRequest } from "../store/Tasks/actions";
import { allHomeMembersRequest } from "../store/HomeMembers/actions";
import { standardOptions } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from '../components/Header';

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
  const [resultRender, setResultRender] = useState([]
    
  );
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
  const allHomeMembersRender = (allHomeMembers) => {
    allHomeMembers.home_members.map((item, index) => (
      resultRender[index] = {
        id: item.id,
        name: item.name,
        color: standardOptions.iconColor.find((element) => element.name === item.icon_color).color,
        avatarIcon: standardOptions.avatarIcon.find(
          (element) => element.name === item.avatar_icon
        ).icon,
      }
    ))
    return resultRender;
  }
  const getHomeMembers = async () => {
    const allHomeMembers = await allHomeMembersRequest(auth.data.token);
    const result = allHomeMembersRender(allHomeMembers);
    setResultRender(result);
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
    <Header></Header>
    <main>
      <div className="go-back-area">
        <button
          className="go-back-button"
          onClick={() => navigate("/challenge/" + tasks.data.task.challenge_id)}
        >
          &#60;&#60; Go back to Challenge
        </button>
      </div>
      {tasks.loading || homeMembers.loading ? (
        <p>Loading...</p>
      ) : tasks.error || homeMembers.error ? (
        <p>Error</p>
      ) : (
        <>
          <div className="task-info">
            <div className="flex-row-start">
              <div
                className="fa-icons"
                style={{
                  backgroundColor: standardOptions.iconColor.find(
                    (element) => element.name === tasks.data.task.icon_color
                  ).color,
                }}
              >
                <FontAwesomeIcon
                  icon={
                    standardOptions.taskIcon.find(
                      (element) => element.name === tasks.data.task.task_icon
                    ).icon
                  }
                />
              </div>
              <div>
                <p
                  style={{
                    color: standardOptions.iconColor.find(
                      (element) => element.name === tasks.data.task.icon_color
                    ).color,
                  }}
                >
                  {tasks.data.task.name}
                </p>
              </div>
            </div>
            <p
              style={{
                color: standardOptions.iconColor.find(
                  (element) => element.name === tasks.data.task.icon_color
                ).color,
              }}
            >
              Difficulty: {tasks.data.task.difficulty}
            </p>
            <p>Status: incomplete</p>
          </div>

          <form onSubmit={handleSubmit}>
          <p className="label-text">Who completed the task</p>
            <div className="radio-list">
              {resultRender.map((item) => (
                
                <>
                <div className="flex-row-start">
                  <input
                    type="radio"
                    id={item.id}
                    name="home_member_id"
                    value={item.id}
                    onChange={handleInputChange}
                  />
                  <label
                    for={item.id}
                    style={{
                      color: item.color
                    }}
                    className="max-width"
                  >
                    <div
                      className="fa-icons"
                      style={{
                        backgroundColor: item.color
                      }}
                    >
                      <FontAwesomeIcon
                        icon={
                          item.avatarIcon
                        }
                      />
                    </div>
                    <div>
                      <p>{item.name}</p>
                    
                    </div>
                  </label>
                  </div>
                </>
              ))}



















            </div>
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
      </main>
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
