import { useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  deleteModelTaskRequest,
  editModelTaskRequest,
} from "../store/ModelTasks/actions";
import { standardOptions } from "../store";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchModelTaskRequest } from "../store/ModelTasks/actions";
import Alert from "../components/alert/Alert";
import DeleButtton from "../components/delete-button/DeleteButton";
import Spinner from "../components/spinner/Spinner";

const ModelTaskEdit = ({
  auth,
  modelTasks,
  editModelTaskRequest,
  deleteModelTaskRequest,
  fetchModelTaskRequest,
}) => {
  let { modelTaskId } = useParams();
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
    getModelTask();
  }, []);
  const getModelTask = async () => {
    const fetchedModelTask = await fetchModelTaskRequest(modelTaskId);
    setFormValues({
      name: fetchedModelTask.model_task.name,
      task_icon: fetchedModelTask.model_task.task_icon,
      icon_color: fetchedModelTask.model_task.icon_color,
      difficulty: fetchedModelTask.model_task.difficulty,
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
      await editModelTaskRequest(modelTaskId, formValues);
    }
  };
  const handleDeleteModelTask = async () => {
    await deleteModelTaskRequest(modelTaskId);
    navigate("/model-tasks");
  };

  const isFormValid = () => {
    if (formValues.name) {
      if (formValues.name.trim().length === 0 || formValues.name === null) {
        setFormErrorMessage("The name must have at least a number or letter");
        return false;
      }
    }
    return true;
  };

  return (
    <>
      <Header></Header>
      <main>
        
        {modelTasks.loading ? (
          <Spinner />
        ) : modelTasks.error ? (
          <p>Error</p>
        ) : (
          <>
       
              <button
                className="go-back-button"
                onClick={() => navigate("/model-tasks")}
              >
                &#60;&#60; Go back to Model Task List
              </button>
        
              <h1 className="page-main-title">Edit Model Task</h1>
              <div className="alert-area">
              {isSubmitted && modelTasks.status === "rejected" ? (
          <Alert type="error" message={modelTasks.error.error_message_api} />
        ) : null}
        {isSubmitted && modelTasks.status === "succeeded" ? (
          <Alert
            type="success"
            message={
              "The Model Task  " +
              modelTasks.data.modelTask.name +
              " was updated!"
            }
          />
        ) : null}
        {formErrorMessage ? (
          <Alert type="error" message={formErrorMessage} />
        ) : null}
              </div>
            <form className="standard-form" onSubmit={handleSubmit}>
              <label className="standard-label" htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={handleInputChange}
                value={formValues.name}
                className="standard-text-input"
                required
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
                          <FontAwesomeIcon icon={item.icon} />
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
                    <div className="icon-option">
                      <input
                        type="radio"
                        id={item.name}
                        name="icon_color"
                        checked={formValues.icon_color == item.name}
                        value={item.name}
                        onChange={handleInputChange}
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
                        <div >{item.name}</div>
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
              deleteFunction={handleDeleteModelTask}
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
    modelTasks: state.modelTasks,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      editModelTaskRequest,
      deleteModelTaskRequest,
      fetchModelTaskRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelTaskEdit);
