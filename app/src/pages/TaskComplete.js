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

  return (
    <>
      <Header></Header>
      <main>
      
        
          <button
            className="go-back-button"
            onClick={() =>
              navigate("/challenge/" + tasks.data.task.challenge_id)
            }
          >
            &#60;&#60; Go back to Challenge
          </button>
        
        {tasks.loading ||
        homeMembers.loading ||
        !taskInfo.updated  ? (
          <Spinner/>
        ) : tasks.error || homeMembers.error ? (
          <p>Error</p>
        ) : (
          <>
          <h1 className="page-main-title">Complete Task</h1>
          <div className="alert-area">
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
            </div>
            <div className="task-card">
            <div className="task-card-row-initial ">
             
                <div
                  className="medium-icon-circle"
                  style={{
                    backgroundColor: taskInfo.color,
                  }}
                >
                  <FontAwesomeIcon icon={taskInfo.icon} />
                </div>
             


                {/* <div className="flex-column-start full-width"> */}
                {/* <div className=" task-main-text"> */}
                  <p className="task-card-main-title"
                    style={{
                      color: taskInfo.color,
                    }}
                  >
                    {taskInfo.name}
                  </p>
                  </div>
                {/* </div> */}
                <div className="task-card-row-advance-one">
              <p
              className="task-card-standard-text"
                style={{
                  color: taskInfo.color,
                  
                }}
              >
                Difficulty: {taskInfo.difficulty}
              </p>
              </div>
              {/* </div> */}

              

            </div>
            
            <form className="standard-form" onSubmit={handleSubmit}>
              <p className="standard-label">Who completed the task</p>
              <div className="radio-text-icon-list">
              {  
              homeMembersInfo.length === 0
              ? (
                  <>
                  <div className="invisible-container">
                  <p className="auxiliar-text">
                  You need to add home members before completing tasks
                  </p>
                  </div>
                
                  </>
                  ) : (<>
                {homeMembersInfo.map((item) => (
                  <>
                    <div className="radio-text-icon-option">
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
                          className="icon-list-circle" 
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
                className="new-item-form-button"
                onClick={() => navigate("/home-member-new")}
              >
                <div>
                  <FontAwesomeIcon className="new-item-form-icon" icon="fa-plus" />
                </div>
                <div>New Home Member</div>
              </button>

              <button
              type="button"
                  className="new-item-form-button"
                  onClick={() => navigate("/home-members")}
                >
                  <div>
                    <FontAwesomeIcon className="new-item-form-icon" icon="fa-pencil" />
                  </div>
                  <div>Manage Home Members</div>
                </button>
              </div>
              <label className="standard-label extra-margin-top" htmlFor="completed_at">Completed at</label>
              <input
                id="completed_at"
                name="completed_at"
                type="date"
                onChange={handleInputChange}
                value={formValues.completed_at}
                className="standard-text-input"
                required
              />
              <div className="card-row-buttons-center ">
              <button className="card-button" type="submit">Complete Task</button>
              </div>
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
