import { useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  createModelTaskRequest,
} from "../store/ModelTasks/actions";

const ModelTaskNew = ({
  auth,
  modelTasks,
  createModelTaskRequest,
}) => {
    const initialForm = {
        taskIcon: "Mop",
        iconColor: "Red",
        difficulty: "Green"
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
    console.log("Oi");
    console.log(formValues);
    try {
    const result = await createModelTaskRequest(auth.data.token, formValues);
    let newModelTask = result.model_task;
    console.log(newModelTask);
    console.log("Vou redirecionar para" + newModelTask.id);
    navigate("/model-task/" + newModelTask.id);
    } catch (e) {
      console.log("Chegou no erro");
    }
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
            <select id="task_icon"
              name="task_icon"
              type="text"
              onChange={handleInputChange}
              defaultValue={initialForm.taskIcon}
              value={formValues.task_icon}>
              <option value={initialForm.taskIcon}>{initialForm.taskIcon}</option>
              <option value="Brush">Brush</option>
              <option value="Cloth">Cloth</option>
              <option value="Spray">Spray</option>
            </select>
            <label htmlFor="icon_color">Icon Color</label>
            <select id="icon_color"
              name="icon_color"
              type="text"
              defaultValue={initialForm.iconColor}
              onChange={handleInputChange}
              value={formValues.icon_color}>
              <option value={initialForm.iconColor}>{initialForm.iconColor}</option>
              <option value="Green">Green</option>
              <option value="Blue">Blue</option>
              <option value="Yellow">Yellow</option>
            </select>
            <label htmlFor="difficulty">Difficulty</label>
            <select id="difficulty"
              name="difficulty"
              type="text"
              defaultValue={initialForm.difficulty}
              onChange={handleInputChange}
              value={formValues.difficulty}>
              <option value={initialForm.difficulty}>{initialForm.difficulty}</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <button type="submit">Create Model Task</button>
          </form>
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
      createModelTaskRequest
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelTaskNew);
