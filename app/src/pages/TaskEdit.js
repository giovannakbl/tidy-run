import { useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  deleteTaskRequest,
  editTaskRequest,
  fetchTaskRequest,
} from "../store/Tasks/actions";
import { standardOptions } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from '../components/Header';
import Alert from "../components/alert/Alert";

const TaskEdit = ({
  auth,
  tasks,
  editTaskRequest,
  deleteTaskRequest,
  fetchTaskRequest,
}) => {
  let { taskId } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: undefined,
    task_icon: undefined,
    icon_color: undefined,
    difficulty: undefined,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState(undefined);

  useEffect(() => {
    getTask();
  }, []);
  const getTask = async () => {
    const fetchedTask = await fetchTaskRequest(auth.data.token, taskId);
    console.log(fetchedTask);
    setFormValues({
      name: fetchedTask.task.name,
      task_icon: fetchedTask.task.task_icon,
      icon_color: fetchedTask.task.icon_color,
      difficulty: fetchedTask.task.difficulty,
    });
  };
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(formValues);
    setFormErrorMessage(undefined);
    setIsSubmitted(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
    await editTaskRequest(auth.data.token, taskId, formValues);
    navigate("/challenge/" + tasks.data.task.challenge_id);
    }
  };
  const handleDeleteTask = async () => {
    await deleteTaskRequest(auth.data.token, taskId);
    navigate("/challenge/" + tasks.data.task.challenge_id);
  };

  const isFormValid = () => {
    if (tasks) {
    if (
      formValues.name === tasks.data.task.name &&
      formValues.task_icon === tasks.data.task.task_icon &&
      formValues.icon_color === tasks.data.task.icon_color &&
      formValues.difficulty === tasks.data.task.difficulty
    ) {
      setFormErrorMessage("No changes were made");
      return false;
    }
  }
    
      if (formValues.name.trim().length === 0 || formValues.name === null || formValues.name === undefined) {
        setFormErrorMessage("The name must have at least a number or letter");
        return false;
      }
    
    return true;
  };

  if (!auth.data.token) return <Navigate to="/login" replace />;

  return (
    <>
    <Header></Header>
    <main>
    {isSubmitted && tasks.status === "rejected" ? (
          <Alert type="error" message={tasks.error.error_message_api} />
        ) : null}
        {isSubmitted && tasks.status === "succeeded" ? (
          <Alert
            type="success"
            message={
              "The Task was updated!"
            }
          />
        ) : null}
        {formErrorMessage ? (
          <Alert type="error" message={formErrorMessage} />
        ) : null}
      {tasks.loading ? (
        <p>Loading...</p>
      ) : tasks.error ? (
        <p>Error</p>
      ) : (
        <>
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
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={handleInputChange}
              defaultValue={tasks.data.task.name}
              value={formValues.name}
              className="input-text"
              
            />
            <p className="label-text">Choose icon</p>
            <div className="radio-list icon-list">
              {standardOptions.taskIcon.map((item) => (
                <>
                  <div>
                    <input
                      type="radio"
                      id={item.name}
                      name="task_icon"
                      checked={formValues.task_icon == item.name}
                      value={item.name}
                      onChange={handleInputChange}
                      
                    />
                    <label htmlFor={item.name}>
                      <div className="fa-icons">
                        <FontAwesomeIcon
                          icon = {item.icon}
                        />
                      </div>
                    </label>
                  </div>
                </>
              ))}
            </div>
            <p className="label-text">Choose color</p>
            <div className="radio-list icon-list">
              
              {standardOptions.iconColor.map((item) => (
                <>
                  <div >
                    <input
                      type="radio"
                      id={item.name}
                      name="icon_color"
                      checked={formValues.icon_color == item.name}
                      value={item.name}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor={item.name}>
                      <div
                        className="fa-icons"
                        style={{
                          backgroundColor: item.color,
                        }}
                      ></div>
                    </label>
                  </div>
                </>
              ))}
            </div>


            <p className="label-text">Choose difficulty</p>
            <div className="radio-list">
            
           
              {standardOptions.difficulty.map((item) => (
                <>
                  <div>
                    <input
                      type="radio"
                      id={item.name}
                      name="difficulty"
                      checked={formValues.difficulty == item.name}
                      value={item.name}
                      onChange={handleInputChange}
                    />
                    <label htmlFor={item.name}>
                      <div className="text-list"
                
                        
                      >{item.name}</div>
                    </label>
                  </div>
                </>
              ))}
            </div>
            <button type="submit">Save Changes</button>
          </form>
          <button
                  className="delete-button"
                  onClick={handleDeleteTask}
                >
                  <div>
                    <FontAwesomeIcon icon="fa-trash-can" />
                  </div>
                  <div>Delete Task</div>
                </button>
        </>
      )}
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      editTaskRequest,
      deleteTaskRequest,
      fetchTaskRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskEdit);
