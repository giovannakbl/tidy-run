import { useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { createTaskRequest } from "../store/Tasks/actions";
import { allModelTasksRequest } from "../store/ModelTasks/actions";
const TaskNew = ({
  auth,
  modelTasks,
  createTaskRequest,
  allModelTasksRequest,
}) => {
  const navigate = useNavigate();
  let { challengeId } = useParams();
  const [formValues, setFormValues] = useState({
    model_task_id: undefined,
  });
  useEffect(() => {
    getAllModelTasks();
  }, []);
  const getAllModelTasks = async () => {
    await allModelTasksRequest(auth.data.token);
  };
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTaskRequest(auth.data.token, formValues, challengeId);
      navigate("/challenge/" + challengeId);
    } catch (e) {}
  };

  if (!auth.data.token) return <Navigate to="/login" replace />;

  return (
    <>
      <button onClick={() => navigate("/challenge/" + challengeId)}>
        Go back to Challenge
      </button>
      {modelTasks.loading ? (
        <p>Loading...</p>
      ) : modelTasks.data.modelTasksList.length == 0 ? (
        <p>
          You need to create Model tasks in order to insert a task in a
          challenge
        </p>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            {modelTasks.data.modelTasksList.map((item) => (
              <>
                <input
                  type="radio"
                  id={item.id}
                  name="model_task_id"
                  value={item.id}
                  onChange={handleInputChange}
                />
                <label for={item.id}>
                  {item.name} / id: {item.id}
                </label>
                <br />
              </>
            ))}
            <button type="submit">Create Task</button>
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
      allModelTasksRequest,
      createTaskRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskNew);
