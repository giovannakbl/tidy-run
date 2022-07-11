import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { allModelTasksRequest } from "../store/ModelTasks/actions";
import { bindActionCreators } from "redux";
import Header from "../components/Header";
import { standardOptions } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../components/spinner/Spinner";

const ModelTasksList = ({
  auth,
  modelTasks,
  allModelTasksRequest,
}) => {
  let navigate = useNavigate();
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
    const allModelTasksDetails = await allModelTasksRequest();
    setModelTasksInfo(getModelTasksInfo(allModelTasksDetails));
  };


  return (
    <>
      <Header></Header>
      <main>
      <h1 className="page-main-title">Model Tasks</h1>
        <button type="button" className="new-item-button"
        onClick={() => {
          navigate("/model-task-new");
        }}
      ><div>
      <FontAwesomeIcon className="new-item-icon" icon="fa-plus" />
    </div>
        Create new Model Task
      </button>



        
        {modelTasks.status === 'idle' || modelTasks.status === 'loading' 
        // || modelTasksInfo.length === 0 
        ? (
          <Spinner/>
        ) : modelTasks.error ? (
          <p>Error</p>
        ) : (
          <>

            {modelTasksInfo.map((item) => (
              <>
                <div className="task-card">
     

<div className="task-card-row-initial ">
                  <div
                    className="medium-icon-circle"
                    style={{
                      backgroundColor: item.color,
                    }}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                  </div>

                  <p
                    className="task-card-main-title"
                    style={{
                      color: item.color,
                      
                    }}
                  >
                    {item.name}
                  </p>
                </div>
                <div className="card-row-buttons-left">
                  <button
                  className="card-button"
                  type="button"
                  onClick={() => navigate("/model-task-edit/" + item.id)}
                >
                   <div className="card-icon-button">
                    <FontAwesomeIcon icon="fa-pencil" />
                  </div>
                  <div>Edit Model Task</div>
                </button>
                </div>
                </div>
              </>
            ))}
          </>
        )}
      </main>
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
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelTasksList);
