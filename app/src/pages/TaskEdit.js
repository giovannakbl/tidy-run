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
import DeleButtton from "../components/delete-button/DeleteButton";
import Spinner from "../components/spinner/Spinner";

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
  const [isDeletedRequested, setIsDeletedRequested] = useState(false);

  useEffect(() => {
    getTask();
  }, []);
  const getTask = async () => {
    const fetchedTask = await fetchTaskRequest(taskId);
    setFormValues({
      name: fetchedTask.task.name,
      task_icon: fetchedTask.task.task_icon,
      icon_color: fetchedTask.task.icon_color,
      difficulty: fetchedTask.task.difficulty,
    });
  };
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormErrorMessage(undefined);
    setIsSubmitted(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setIsSubmitted(true);
    await editTaskRequest(taskId, formValues);
    }
  };
  const handleDeleteTask = async () => {
    await deleteTaskRequest(taskId);
    navigate("/challenge/" + tasks.data.task.challenge_id);
  };

  const isFormValid = () => {
      if (formValues.name.trim().length === 0 || formValues.name === null || formValues.name === undefined) {
        setFormErrorMessage("The name must have at least a number or letter");
        return false;
      }
    
    return true;
  };
  
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
        <Spinner/>
      ) : tasks.error ? (
        <p>Error</p>
      ) : (
        <>
        
            <button
              className="go-back-button"
              onClick={() =>
                navigate("/challenge/" + tasks.data.task.challenge_id)
              }
            >
              &#60;&#60; Go back to Challenge
            </button>
            <h1 className="page-main-title">Edit Task</h1>
          <form className="standard-form" onSubmit={handleSubmit}>
            <label className="standard-label" htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={handleInputChange}
              defaultValue={tasks.data.task.name}
              value={formValues.name}
              className="standard-text-input"
              
            />
            <p className="standard-label">Choose icon</p>
            <div className="icon-list">
              {standardOptions.taskIcon.map((item) => (
                <>
                  <div className="icon-option">
                    <input
                      type="radio"
                      id={item.name}
                      name="task_icon"
                      checked={formValues.task_icon == item.name}
                      value={item.name}
                      onChange={handleInputChange}
                      
                    />
                    <label htmlFor={item.name}>
                    <div className="icon-list-circle" >
                        <FontAwesomeIcon
                          icon = {item.icon}
                        />
                      </div>
                    </label>
                  </div>
                </>
              ))}
            </div>
            <p className="standard-label">Choose color</p>
            <div className="icon-list">
              
              {standardOptions.iconColor.map((item) => (
                <>
                  <div className="icon-option" >
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
                    <div className="icon-list-circle" 
                        style={{
                          backgroundColor: item.color,
                        }}
                      ></div>
                    </label>
                  </div>
                </>
              ))}
            </div>


            <p className="standard-label">Choose difficulty</p>
            <div className="radio-text-list">
            
           
              {standardOptions.difficulty.map((item) => (
                <>
                  <div className="radio-text-option">
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
            <div className="card-row-buttons-center">
              <button className="card-button" type="submit">Save Changes</button>
              </div>
          </form>
          <DeleButtton
              isDeletedRequested={isDeletedRequested}
              deleteFunction={handleDeleteTask}
              setIsDeletedRequested={setIsDeletedRequested}
            />
          
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
