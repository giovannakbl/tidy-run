import { useState } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  deleteModelTaskRequest,
  editModelTaskRequest,
} from "../store/ModelTasks/actions";

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
      {modelTasks.loading ? (
        <p>Loading...</p>
      ) : modelTasks.error ? (
        <p>Error</p>
      ) : (
        <>
          <button onClick={() => navigate("/model-task/" + modelTaskId)}>
            Go back to Model Task
          </button>
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
            <select id="task_icon"
              name="task_icon"
              type="text"
              onChange={handleInputChange}
              defaultValue={modelTasks.data.modelTask.task_icon}
              value={formValues.task_icon}>
              <option value="Mop">Mop</option>
              <option value="Brush">Brush</option>
              <option value="Cloth">Cloth</option>
              <option value="Spray">Spray</option>
            </select>
            <label htmlFor="icon_color">Icon Color</label>
            <select id="icon_color"
              name="icon_color"
              type="text"
              onChange={handleInputChange}
              defaultValue={modelTasks.data.modelTask.icon_color}
              value={formValues.icon_color}>
              <option value="Red">Red</option>
              <option value="Green">Green</option>
              <option value="Blue">Blue</option>
              <option value="Yellow">Yellow</option>
            </select>
            <label htmlFor="difficulty">Difficulty</label>
            <select id="difficulty"
              name="difficulty"
              type="text"
              onChange={handleInputChange}
              defaultValue={modelTasks.data.modelTask.difficulty}
              value={formValues.difficulty}>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <button type="submit">Save Changes</button>
          </form>
        </>
      )}
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
