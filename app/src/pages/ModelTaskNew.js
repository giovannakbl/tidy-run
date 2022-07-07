import { useState } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createModelTaskRequest } from "../store/ModelTasks/actions";
import { standardOptions } from "../store";
import Header from '../components/Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModelTaskNew = ({ auth, createModelTaskRequest }) => {
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
    try {
      const result = await createModelTaskRequest(auth.data.token, formValues);
      let newModelTask = result.model_task;
      navigate("/model-tasks");
    } catch (e) {}
  };

  if (!auth.data.token) return <Navigate to="/login" replace />;

  return (
    <>
    <Header></Header>
    <main>
      <div className="go-back-area">
        <button
        type="button"
          className="go-back-button"
          onClick={() => navigate("/model-tasks")}
        >
          &#60;&#60; Go back to Model Tasks List
        </button>
      </div>
      <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={handleInputChange}
              value={formValues.name}
              className="input-text"
            />
            <p className="label-text">Choose icon</p>
            <div className="radio-list icon-list">
              {standardOptions.taskIcon.map((item) => (
                <>
                  <div>
                    <input
                      type="radio"
                      id={item.name}
                      name="task_icon"
                      // checked={formValues.task_icon == item.name}
                      value={item.name}
                      onChange={handleInputChange}
                    />
                    <label htmlFor={item.name}>
                      <div className="fa-icons">
                        <FontAwesomeIcon
                          icon = {item.icon}
                        />
                      </div>
                    </label>
                  </div>
                </>
              ))}
            </div>
            <p className="label-text">Choose color</p>
            <div className="radio-list icon-list">
              {standardOptions.iconColor.map((item) => (
                <>
                  <div>
                    <input
                      type="radio"
                      id={item.name}
                      name="icon_color"
                      // checked={formValues.icon_color == item.name}
                      value={item.name}
                      onChange={handleInputChange}
                    />
                    <label htmlFor={item.name}>
                      <div
                        className="fa-icons"
                        style={{
                          backgroundColor: item.color,
                        }}
                      ></div>
                    </label>
                  </div>
                </>
              ))}
            </div>
            <p className="label-text">Choose difficulty</p>
            <div className="radio-list">  
              {standardOptions.difficulty.map((item) => (
                <>
                  <div>
                    <input
                      type="radio"
                      id={item.name}
                      name="difficulty"
                      // checked={formValues.difficulty == item.name}
                      value={item.name}
                      onChange={handleInputChange}
                    />
                    <label htmlFor={item.name}>
                      <div className="text-list"                 
                      >{item.name}</div>
                    </label>
                  </div>
                </>
              ))}
            </div>
            <button type="submit">Create Model Task</button>
          </form>
      </main>
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
