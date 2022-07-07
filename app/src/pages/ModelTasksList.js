import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { allModelTasksRequest } from "../store/ModelTasks/actions";
import { bindActionCreators } from "redux";
import Header from "../components/Header";
import { standardOptions } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    const allModelTasksDetails = await allModelTasksRequest(auth.data.token);
    setModelTasksInfo(getModelTasksInfo(allModelTasksDetails));
  };


  if (auth.data.token == null) return <Navigate to="/login" replace />;

  return (
    <>
      <Header></Header>
      <main>
        {/* <button
          onClick={() => {
            navigate("/model-task-new");
          }}
        >
          Create new Model Task
        </button> */}
<h1>Model Tasks</h1>
        <button type="button" className="button-new-item"
        onClick={() => {
          navigate("/model-task-new");
        }}
      ><div className="circle-new-item"><p>+</p></div>
        Create new Model Task
      </button>



        
        {modelTasks.loading || modelTasksInfo.length === 0 ? (
          <p>Loading...</p>
        ) : modelTasks.error ? (
          <p>Error</p>
        ) : (
          <>

            {modelTasksInfo.map((item) => (

              <>

                <div className="task-info">
                  <div className="flex-row-start">
                    <div
                      className="fa-icons"
                      style={{
                        backgroundColor: item.color,
                      }}
                    >
                      <FontAwesomeIcon icon={item.icon} />
                    </div>
                    <div>
                      <p
                        style={{
                          color: item.color,
                        }}
                      >
                        {item.name}
                      </p>
                      <p
                        style={{
                          color: item.color,
                        }}
                      >
                        Difficulty: {item.difficulty}
                      </p>
                    </div>
                  </div>

                 
                  <button
                  className="action-button"
                  type="button"
                  onClick={() => navigate("/model-task-edit/" + item.id)}
                >
                  <div>
                    <FontAwesomeIcon icon="fa-pencil" />
                  </div>
                  <div>Edit Model Task</div>
                </button>
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
