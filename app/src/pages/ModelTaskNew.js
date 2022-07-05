import { useState } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createModelTaskRequest } from "../store/ModelTasks/actions";
import { standardOptions } from "../store";

const ModelTaskNew = ({ auth, createModelTaskRequest }) => {
  const initialForm = {
    taskIcon: "Mop",
    iconColor: "Red",
    difficulty: "Easy",
  };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: undefined,
    task_icon: initialForm.taskIcon,
    icon_color: initialForm.iconColor,
    difficulty: initialForm.difficulty,
  });
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createModelTaskRequest(auth.data.token, formValues);
      let newModelTask = result.model_task;
      navigate("/model-task/" + newModelTask.id);
    } catch (e) {}
  };

  if (!auth.data.token) return <Navigate to="/login" replace />;

  return (
    <>
      <button onClick={() => navigate("/model-tasks")}>
        Go back to Model Tasks List
      </button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={handleInputChange}
          value={formValues.name}
        />
        <label htmlFor="task_icon">Task Icon</label>
        <select
          id="task_icon"
          name="task_icon"
          type="text"
          onChange={handleInputChange}
          defaultValue={standardOptions.taskIcon[0].name}
          value={formValues.task_icon}
        >
          {
            standardOptions.taskIcon.map((item) => (
              <option value={item.name}>{item.name}</option>
            ))
          }
        </select>
        <label htmlFor="icon_color">Icon Color</label>
        <select
          id="icon_color"
          name="icon_color"
          type="text"
          defaultValue={initialForm.iconColor}
          onChange={handleInputChange}
          value={standardOptions.iconColor[0].name}
        >
          {
            standardOptions.iconColor.map((item) => (
              <option value={item.name}>{item.name}</option>
            ))
          }
        </select>
        <label htmlFor="difficulty">Difficulty</label>
        <select
          id="difficulty"
          name="difficulty"
          type="text"
          defaultValue={standardOptions.difficulty[0].name}
          onChange={handleInputChange}
          value={formValues.difficulty}
        >
          {
            standardOptions.difficulty.map((item) => (
              <option value={item.name}>{item.name}</option>
            ))
          }
        </select>
        <button type="submit">Create Model Task</button>
      </form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      createModelTaskRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelTaskNew);
