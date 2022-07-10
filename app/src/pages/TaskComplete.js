import { useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTaskRequest, completeTaskRequest } from "../store/Tasks/actions";
import { allHomeMembersRequest } from "../store/HomeMembers/actions";
import { standardOptions } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header";
import Alert from "../components/alert/Alert";
import Spinner from "../components/spinner/Spinner";

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
  const [taskInfo, setTaskInfo] = useState({
    name: undefined,
    color: undefined,
    icon: undefined,
    difficulty: undefined,
    updated: false,
  });
  const [homeMembersInfo, setHomeMembersInfo] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState(undefined);
  let { taskId } = useParams();
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setIsSubmitted(false);
    setFormErrorMessage(undefined);
  };
  useEffect(() => {
    getTask();
    getHomeMembers();
  }, []);
  const getHomeMembersInfo = (allHomeMembersDetails) => {
    let result = [];
    allHomeMembersDetails.home_members.map(
      (item, index) =>
        (result[index] = {
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
    return result;
  };
  const getTaskInfo = (taskDetails) => {
    let item = taskDetails.task;
    const result = {
      name: item.name,
      color: standardOptions.iconColor.find(
        (element) => element.name === item.icon_color
      ).color,
      icon: standardOptions.taskIcon.find(
        (element) => element.name === item.task_icon
      ).icon,
      difficulty: item.difficulty,
      updated: true,
    };
    return result;
  };
  const getTask = async () => {
    const taskDetails = await fetchTaskRequest(taskId);
    setTaskInfo(getTaskInfo(taskDetails));
  };
  const getHomeMembers = async () => {
    const allHomeMembersDetails = await allHomeMembersRequest();
    setHomeMembersInfo(getHomeMembersInfo(allHomeMembersDetails));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setIsSubmitted(true);
    try {
      await completeTaskRequest(taskId, formValues);
      navigate("/challenge/" + tasks.data.task.challenge_id);
    } catch (e) {}
  }
  };

  const isFormValid = () => {
    if (
      !formValues.home_member_id 
    ) {
      setFormErrorMessage("You must choose a home member");
      return false;
    }
    if (
      !formValues.completed_at 
    ) {
      setFormErrorMessage("You must fill in the completion date");
      return false;
    }
   
    return true;
  };

  // if (!auth.loading && !auth.authenticated) return <Navigate to="/login" replace />;

  return (
    <>
      <Header></Header>
      <main>
      {isSubmitted && tasks.status === "rejected" && (
          <Alert type="error" message={tasks.error.error_message_api} />
        )}
        {!tasks.loading && isSubmitted && tasks.status === "succeeded" && (
          <Alert
            type="success"
            message={
              "The Task was completed!"
            }
          />
        )}
        {formErrorMessage ? (
          <Alert type="error" message={formErrorMessage} />
        ) : null}
        <div className="go-back-area">
          <button
            className="go-back-button"
            onClick={() =>
              navigate("/challenge/" + tasks.data.task.challenge_id)
            }
          >
            &#60;&#60; Go back to Challenge
          </button>
        </div>
        {tasks.loading ||
        homeMembers.loading ||
        !taskInfo.updated  ? (
          <Spinner/>
        ) : tasks.error || homeMembers.error ? (
          <p>Error</p>
        ) : (
          <>
            <div className="task-info">
              <div className="flex-row-start">
              <div >
              {/* <div className="full-height"> */}
                <div
                  className="fa-icons"
                  style={{
                    backgroundColor: taskInfo.color,
                  }}
                >
                  <FontAwesomeIcon icon={taskInfo.icon} />
                </div>
                </div>


                <div className="flex-column-start full-width">
                <div className=" task-main-text">
                  <p
                    style={{
                      color: taskInfo.color,
                    }}
                  >
                    {taskInfo.name}
                  </p>
                </div>
                <div className=" task-sec-text">
              <p
                style={{
                  color: taskInfo.color,
                  
                }}
              >
                Difficulty: {taskInfo.difficulty}
              </p>
              </div>
              </div>

              </div>

            </div>
           
            <form onSubmit={handleSubmit}>
              <p className="label-text">Who completed the task</p>
              <div className="radio-list">
              {  
              homeMembersInfo.length === 0
              ? (
                  <>
                  <p className="label-text">You need to add home members before completing tasks</p>             
                  </>
                  ) : (<>
                {homeMembersInfo.map((item) => (
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
                        htmlFor={item.id}
                        style={{
                          color: item.color,
                        }}
                        className="max-width"
                      >
                        <div>
                        <div
                          className="fa-icons"
                          style={{
                            backgroundColor: item.color,
                          }}
                        >
                          <FontAwesomeIcon icon={item.icon} />
                        </div>
                        </div>
                        <div>
                          <p>{item.name}</p>
                        </div>
                      </label>
                    </div>
                  </>
                ))}
</>)}
              
<button
            type="button"
                className="model-task-button"
                onClick={() => navigate("/home-member-new")}
              >
                <div className="model-task-circle">
                  <div className="white">+</div>
                </div>
                New Home Member
              </button>

              <button
              type="button"
                  className="model-task-button"
                  onClick={() => navigate("/home-members")}
                >
                  <div>
                    <FontAwesomeIcon icon="fa-pencil" />
                  </div>
                  <div>Manage Home Members</div>
                </button>
              </div>
              <label htmlFor="completed_at">Completed at</label>
              <input
                id="completed_at"
                name="completed_at"
                type="date"
                onChange={handleInputChange}
                value={formValues.completed_at}
                className="input-text"
                required
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
