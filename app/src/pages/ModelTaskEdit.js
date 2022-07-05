import { useState } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  deleteModelTaskRequest,
  editModelTaskRequest,
} from "../store/ModelTasks/actions";
import { standardOptions } from "../store";
import Header from '../components/Header';

const ModelTaskEdit = ({
  auth,
  modelTasks,
  editModelTaskRequest,
  deleteModelTaskRequest,
}) => {
  let { modelTaskId } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: undefined,
    task_icon: undefined,
    icon_color: undefined,
    difficulty: undefined,
  });
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await editModelTaskRequest(auth.data.token, modelTaskId, formValues);
    navigate("/model-task/" + modelTaskId);
  };
  const handleDeleteModelTask = async () => {
    await deleteModelTaskRequest(auth.data.token, modelTaskId);
    navigate("/model-tasks");
  };

  if (!auth.data.token) return <Navigate to="/login" replace />;

  return (
    <>
    <Header></Header>
    <main>
      {modelTasks.loading ? (
        <p>Loading...</p>
      ) : modelTasks.error ? (
        <p>Error</p>
      ) : (
        <>
          <div className="go-back-area">
            <button
              className="go-back-button"
              onClick={() => navigate("/model-task/" + modelTaskId)}
            >
              &#60;&#60; Go back to Model Task
            </button>
          </div>
          <button onClick={handleDeleteModelTask}>Delete Model Task</button>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={handleInputChange}
              defaultValue={modelTasks.data.modelTask.name}
              value={formValues.name}
            />
            <label htmlFor="task_icon">Task Icon</label>
            <select
              id="task_icon"
              name="task_icon"
              type="text"
              onChange={handleInputChange}
              defaultValue={modelTasks.data.modelTask.task_icon}
              value={formValues.task_icon}
            >
              {standardOptions.taskIcon.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </select>
            <label htmlFor="icon_color">Icon Color</label>
            <select
              id="icon_color"
              name="icon_color"
              type="text"
              onChange={handleInputChange}
              defaultValue={modelTasks.data.modelTask.icon_color}
              value={formValues.icon_color}
            >
              {standardOptions.iconColor.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </select>
            <label htmlFor="difficulty">Difficulty</label>
            <select
              id="difficulty"
              name="difficulty"
              type="text"
              onChange={handleInputChange}
              defaultValue={modelTasks.data.modelTask.difficulty}
              value={formValues.difficulty}
            >
              {standardOptions.difficulty.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </select>

            <button type="submit">Save Changes</button>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      editModelTaskRequest,
      deleteModelTaskRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelTaskEdit);
