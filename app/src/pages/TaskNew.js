import { useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { createTaskRequest } from "../store/Tasks/actions";
import { allModelTasksRequest } from "../store/ModelTasks/actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { standardOptions } from "../store";
import Header from '../components/Header';

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
    <Header></Header>
    <main>
      <div className="go-back-area">
        <button
          className="go-back-button"
          onClick={() => navigate("/challenge/" + challengeId)}
        >
          &#60;&#60; Go back to Challenge
        </button>
      </div>
      {modelTasks.loading ? (
        <p>Loading...</p>
      ) : 
      modelTasksInfo.length == 0 
      ? (
        <p>
          You need to create Model tasks in order to insert a task in a
          challenge
        </p>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <ul className="radio-list">
            {modelTasksInfo.map((item) => (
              <>
              <li>
                <input
                  type="radio"
                  id={item.id}
                  name="model_task_id"
                  checked = {formValues.model_task_id == item.id}
                  value={item.id}
                  onChange={handleInputChange}
                />
                <label for={item.id} style={{ color: 
                          item.color
                          
                          }}>
                <div className="fa-icons" style={{ backgroundColor: 
                item.color
                          
                          }}>
                    <FontAwesomeIcon  icon={
                          item.icon
                        }  />
                </div>
                  {item.name}<br/>
                  Difficulty: {item.difficulty}
                </label>
                </li>
              </>
            ))}
            </ul>
            <button type="submit">Create Task</button>
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
      allModelTasksRequest,
      createTaskRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskNew);
