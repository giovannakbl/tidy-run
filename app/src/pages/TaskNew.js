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
    const allModelTasksDetails = await allModelTasksRequest(auth.data.token);
    setModelTasksInfo(getModelTasksInfo(allModelTasksDetails));
  };

  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(formValues);
    setIsSubmitted(false);
    setFormErrorMessage(undefined);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setIsSubmitted(true);
    try {
      await createTaskRequest(auth.data.token, formValues, challengeId);
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

  if (!auth.data.token) return <Navigate to="/login" replace />;

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
              "The Task was updated!"
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
          <p>Loading...</p>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <p className="label-text">Choose a task from your task models</p>
              <div className="radio-list">
                {modelTasksInfo.length == 0 ? (
                  <p className="label-text">
                    You need to create Model tasks in order to insert a task in
                    a challenge
                  </p>
                ) : (
                  <>
                    {modelTasksInfo.map((item) => (
                      <>
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
                          <div>
                            <div
                              className="fa-icons "
                              style={{ backgroundColor: item.color }}
                            >
                              <FontAwesomeIcon icon={item.icon} />
                            </div>
                          </div>
                          <div className="flex-column-start full-width">
                            <div className="model-task-main-text">
                              <p>{item.name}</p>
                            </div>
                            <div className="model-task-sec-text">
                              <p>Difficulty: {item.difficulty}</p>
                            </div>
                          </div>
                        </label>
                      </>
                    ))}
                  </>
                )}

                <button
                  type="button"
                  className="model-task-button"
                  onClick={() => navigate("/model-task-new")}
                >
                  <div className="model-task-circle">
                    <div className="white">+</div>
                  </div>
                  New task model
                </button>

                <button
                  type="button"
                  className="model-task-button"
                  onClick={() => navigate("/model-tasks")}
                >
                  <div>
                    <FontAwesomeIcon icon="fa-pencil" />
                  </div>
                  <div>Manage task models</div>
                </button>
              </div>

              <button type="submit">Add Task</button>
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
