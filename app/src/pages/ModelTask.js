import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { logoutRequest } from "../store/Auth/actions";
import { fetchModelTaskRequest } from "../store/ModelTasks/actions";
import { bindActionCreators } from "redux";
import Header from '../components/Header';

const ModelTask = ({
  auth,
  modelTasks,
  fetchModelTaskRequest,
  logoutRequest,
}) => {
  let navigate = useNavigate();
  let { modelTaskId } = useParams();
  useEffect(() => {
    getModelTask();
  }, []);

  const getModelTask = async () => {
    await fetchModelTaskRequest(auth.data.token, modelTaskId);
  };
  const handleLogout = async () => {
    await logoutRequest();
  };

  if (auth.data.token == null) return <Navigate to="/login" replace />;

  return (
    <>
    <Header></Header>
    <main>
      <div className="go-back-area">
        <button
          className="go-back-button"
          onClick={() => navigate("/model-tasks")}
        >
          &#60;&#60; Go back to Model Tasks List
        </button>
      </div>
      {modelTasks.loading ? null : (
        <button onClick={() => navigate("/model-task-edit/" + modelTaskId)}>
          Edit Model Task
        </button>
      )}
      <h1>Model Task</h1>
      <h2>Check out your Model Task</h2>
      {modelTasks.loading ? (
        <p>Loading...</p>
      ) : modelTasks.error ? (
        <p>Error</p>
      ) : (
        <ul>
          <li>id: {modelTasks.data.modelTask.id}</li>
          <li>Name: {modelTasks.data.modelTask.name}</li>
          <li>Icon: {modelTasks.data.modelTask.task_icon}</li>
          <li>Icon color: {modelTasks.data.modelTask.icon_color}</li>
          <li>Difficulty: {modelTasks.data.modelTask.difficulty}</li>
        </ul>
      )}
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    challenge: state.challenge,
    modelTasks: state.modelTasks,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchModelTaskRequest,
      logoutRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelTask);
