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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  useEffect(() => {
    getTask();
  }, []);
  const getTask = async () => {
    const fetchedTask = await fetchTaskRequest(auth.data.token, taskId);
    console.log(fetchedTask);
    setFormValues({name: fetchedTask.task.name,
      task_icon: fetchedTask.task.task_icon,
      icon_color: fetchedTask.task.icon_color,
      difficulty: fetchedTask.task.difficulty,});
  };
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await editTaskRequest(auth.data.token, taskId, formValues);
    navigate("/challenge/" + tasks.data.task.challenge_id);
  };
  const handleDeleteTask = async () => {
    await deleteTaskRequest(auth.data.token, taskId);
    navigate("/challenge/" + tasks.data.task.challenge_id);
  };

  if (!auth.data.token) return <Navigate to="/login" replace />;

  return (
    <>
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
          <button onClick={handleDeleteTask}>Delete Task</button>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={handleInputChange}
              defaultValue={tasks.data.task.name}
              value={formValues.name}
            />
            <p className="">Choose icon</p>
            <ul className="radio-list">
            {standardOptions.taskIcon.map((item) => (
              <>
              <li>
                <input
                  type="radio"
                  id={item.name}
                  name="task_icon"
                  checked = {formValues.task_icon == item.name}
                  value={item.name}
                  onChange={handleInputChange}
                />
                <label for={item.name} >
                <div className="fa-icons" >
                    <FontAwesomeIcon  icon={
                          standardOptions.taskIcon.find(
                            (element) =>
                              element.name === item.name
                          ).icon 
                        }  />
                </div>
                </label>
                </li>
              </>
            ))}
            </ul>
<p>Choose color</p>
            <ul className="radio-list">
            {standardOptions.iconColor.map((item) => (
              <>
              <li>
                <input
                  type="radio"
                  id={item.name}
                  name="icon_color"
                  checked = {formValues.icon_color == item.name}
                  value={item.name}
                  onChange={handleInputChange}
                />
                <label for={item.name} >
                <div className="fa-icons" style={{ backgroundColor: standardOptions.iconColor.find(
                            (element) =>
                              element.name === item.name
                          ).color }}>
                </div>
                </label>
                </li>
              </>
            ))}
            </ul>




            {/* <label htmlFor="icon_color">Icon Color</label>
            <select
              id="icon_color"
              name="icon_color"
              type="text"
              onChange={handleInputChange}
              defaultValue={tasks.data.task.icon_color}
              value={formValues.icon_color}
            >
              {standardOptions.iconColor.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </select> */}





            <label htmlFor="difficulty">Difficulty</label>
            <select
              id="difficulty"
              name="difficulty"
              type="text"
              onChange={handleInputChange}
              defaultValue={tasks.data.task.difficulty}
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
