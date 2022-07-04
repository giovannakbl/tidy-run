import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { allModelTasksRequest } from "../store/ModelTasks/actions";
import { logoutRequest } from "../store/Auth/actions";
import { bindActionCreators } from "redux";

const ModelTasksList = ({
  auth,
  modelTasks,
  allModelTasksRequest,
  logoutRequest,
}) => {
  let navigate = useNavigate();
  useEffect(() => {
    getAllModelTasks();
  }, []);
  const getAllModelTasks = async () => {
    await allModelTasksRequest(auth.data.token);
  };
  const handleLogout = async () => {
    await logoutRequest();
  };

  if (auth.data.token == null) return <Navigate to="/login" replace />;

  return (
    <>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Dashboard
      </button>
      <button
        onClick={() => {
          navigate("/model-task-new");
        }}
      >
        Create new Model Task
      </button>
      <h1>Model Tasks</h1>
      <h2>Check out your Model Tasks</h2>
      {modelTasks.loading ? (
        <p>Loading...</p>
      ) : modelTasks.error ? (
        <p>Error</p>
      ) : (
        <ul>
          {modelTasks.data.modelTasksList.map((item) => (
            <li key={item.id}>
              <button onClick={() => navigate("/model-task/" + item.id)}>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    modelTasks: state.modelTasks,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      allModelTasksRequest,
      logoutRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelTasksList);
