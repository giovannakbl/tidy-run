import { useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { createTaskRequest } from "../store/Tasks/actions";
import { allModelTasksRequest } from "../store/ModelTasks/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { standardOptions } from "../store";
import Header from "../components/Header";
import Alert from "../components/alert/Alert";
import Spinner from "../components/spinner/Spinner";

const TaskNew = ({
  auth,
  modelTasks,
  tasks,
  createTaskRequest,
  allModelTasksRequest,
}) => {
  const navigate = useNavigate();
  let { challengeId } = useParams();
  const [formValues, setFormValues] = useState({
    model_task_id: undefined,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState(undefined);
  useEffect(() => {
    getAllModelTasks();
  }, []);
  const [modelTasksInfo, setModelTasksInfo] = useState([]);
  const getModelTasksInfo = (allModelTasksDetails) => {
    let result = [];
    allModelTasksDetails.model_tasks.map(
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
          difficulty: item.difficulty,
        })
    );
    return result;
  };
  const getAllModelTasks = async () => {
    const allModelTasksDetails = await allModelTasksRequest();
    setModelTasksInfo(getModelTasksInfo(allModelTasksDetails));
  };

  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setIsSubmitted(false);
    setFormErrorMessage(undefined);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setIsSubmitted(true);
    try {
      await createTaskRequest(formValues, challengeId);
      navigate("/challenge/" + challengeId);
    } catch (e) {}
  }
  };

  const isFormValid = () => {
    if (
      !formValues.model_task_id 
    ) {
      setFormErrorMessage("You must choose a task model");
      return false;
    }
    return true;
  };

  if (!auth.loading && !auth.authenticated) return <Navigate to="/login" replace />;

  return (
    <>
      <Header></Header>
      <main>
      {isSubmitted && tasks.status === "rejected" ? (
          <Alert type="error" message={tasks.error.error_message_api} />
        ) : null}
        {!tasks.loading && isSubmitted && tasks.status === "succeeded" ? (
          <Alert
            type="success"
            message={
              "The Task was created!"
            }
          />
        ) : null}
        {formErrorMessage ? (
          <Alert type="error" message={formErrorMessage} />
        ) : null}
        <div className="go-back-area">
          <button
            type="button"
            className="go-back-button"
            onClick={() => navigate("/challenge/" + challengeId)}
          >
            &#60;&#60; Go back to Challenge
          </button>
        </div>
        {modelTasks.loading ? (
          <Spinner/>
        ) : (
          <>
          <h1 className="page-main-title">New Task</h1>
            <form className="standard-form" onSubmit={handleSubmit}>
              <p className="standard-label">Choose a task from your task models</p>
              <div className="radio-text-icon-list">
                {modelTasksInfo.length == 0 ? (
                  <p className="standard-label">
                    You need to create Model tasks in order to insert a task in
                    a challenge
                  </p>
                ) : (
                  <>
                    {modelTasksInfo.map((item) => (
                      <>
                      <div className="radio-text-icon-option">
                        <input
                          type="radio"
                          id={item.id}
                          name="model_task_id"
                          checked={formValues.model_task_id == item.id}
                          value={item.id}
                          onChange={handleInputChange}
                          className="small-margin-bottom"
                        />
                        <label htmlFor={item.id} style={{ color: item.color }}>
                          <div className="task-option">
                        <div className="task-card-row-initial ">
                            <div
                              className="medium-icon-circle" 
                              style={{ backgroundColor: item.color }}
                            >
                              <FontAwesomeIcon icon={item.icon} />
                            </div>

                            
                         
                          
                              <p className="task-card-main-title">{item.name}</p>
                            </div>
                            
                            <div className="task-card-row-advance-one">
                              <p className="task-card-standard-text">Difficulty: {item.difficulty}</p>
                            </div>
                            </div>
                        </label>
                        </div>
                      </>
                    ))}
                  </>
                )}


                <button
                  type="button"
                  className="new-item-form-button"
                  onClick={() => navigate("/model-task-new")}
                >
                  <div>
                  <FontAwesomeIcon className="new-item-form-icon" icon="fa-plus" />
                </div>
                <div>New task model</div>
                  
                </button>

                <button
                  type="button"
                  className="new-item-form-button"
                  onClick={() => navigate("/model-tasks")}
                >
                  <div>
                    <FontAwesomeIcon className="new-item-form-icon" icon="fa-pencil" />
                  </div>
                  <div>Manage task models</div>
                </button>
              </div>

              <div className="card-row-buttons-center ">
              <button className="card-button" type="submit">Add Task</button>
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
    modelTasks: state.modelTasks,
    auth: state.auth,
    tasks: state.modelTasks
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      allModelTasksRequest,
      createTaskRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskNew);
