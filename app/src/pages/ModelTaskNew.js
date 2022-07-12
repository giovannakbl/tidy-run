import { useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createModelTaskRequest } from "../store/ModelTasks/actions";
import { standardOptions } from "../store";
import Header from '../components/Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tidyUserRequest } from "../store/TidyUser/actions";
import Alert from "../components/alert/Alert";
import Spinner from "../components/spinner/Spinner";


const ModelTaskNew = ({ auth, createModelTaskRequest, modelTasks, tidyUser, tidyUserRequest }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: undefined,
    task_icon: undefined,
    icon_color: undefined,
    difficulty: undefined,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState(undefined);
  const getTidyUser = async () => {
    await tidyUserRequest();
  };
  useEffect(() => {
    getTidyUser();
  }, []);
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setIsSubmitted(false);
    setFormErrorMessage(undefined);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setIsSubmitted(true);
    try {
      const result = await createModelTaskRequest(formValues);
      let newModelTask = result.model_task;
      navigate("/model-tasks");
    } catch (e) {}
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  };


  const isFormValid = () => {
    setFormErrorMessage(undefined);
    if (
      !formValues.name 
    ) {
      setFormErrorMessage("You must fill in the field Name");
      return false;
    }
    if (formValues.name) {
      if (formValues.name.trim().length === 0 || formValues.name === null) {
        setFormErrorMessage("The name must have at least a number or letter");
        return false;
      }
    }
    if (
      !formValues.task_icon 
    ) {
      setFormErrorMessage("You must choose an icon");
      return false;
    }
    if (
      !formValues.icon_color
    ) {
      setFormErrorMessage("You must choose a color");
      return false;
    }
    if (
      !formValues.difficulty
    ) {
      setFormErrorMessage("You must choose a difficulty level");
      return false;
    }

    return true;
  };

  return (
    <>
    <Header></Header>
    <main>
    
      <button
                className="go-back-button"
                onClick={() => navigate("/model-tasks")}
              >
                &#60;&#60; Go back to Model Task List
              </button>
              <h1 className="page-main-title">New Model Task</h1>
              <div className="alert-area">
              {isSubmitted && modelTasks.status === "rejected" && (
          <Alert
          handleInputChange={handleInputChange} type="error" message={modelTasks.error.error_message_api} />
        )}
        {!modelTasks.loading && isSubmitted && modelTasks.status === "succeeded" && (
          <Alert
          handleInputChange={handleInputChange} 
            type="success"
            message={
              "The Model Task was created!"
            }
          />
        )}
        {formErrorMessage ? (
          <Alert
          handleInputChange={handleInputChange} 
          type="error" message={formErrorMessage} />
        ) : null}
              </div>
              
      <form className="standard-form" onSubmit={handleSubmit}>
            <label className="standard-label" htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={handleInputChange}
              value={formValues.name}
              className="standard-text-input"
              required
            />
            <p className="standard-label">Choose icon</p>
        
            <div className="icon-list">
              {standardOptions.taskIcon.map((item) => (
                <>
                  <div className="icon-option">
                    <input
                      type="radio"
                      id={item.name}
                      name="task_icon"
                      // checked={formValues.task_icon == item.name}
                      value={item.name}
                      onChange={handleInputChange}
                    />
                    <label htmlFor={item.name}>
                    <div className="icon-list-circle" >
                        <FontAwesomeIcon
                          icon = {item.icon}
                        />
                      </div>
                    </label>
                  </div>
                </>
              ))}
            </div>
  
            <p className="standard-label">Choose color</p>
            <div className="icon-list">
              {standardOptions.iconColor.map((item) => (
                <>
                  <div className="icon-option">
                    <input
                      type="radio"
                      id={item.name}
                      name="icon_color"
                      // checked={formValues.icon_color == item.name}
                      value={item.name}
                      onChange={handleInputChange}
                    />
                    <label htmlFor={item.name}>
                    <div className="icon-list-circle" 
                        style={{
                          backgroundColor: item.color,
                        }}
                      ></div>
                    </label>
                  </div>
                </>
              ))}
            </div>
            <p className="standard-label">Choose difficulty</p>
            <div className="radio-text-list">  
              {standardOptions.difficulty.map((item) => (
                <>
                 <div className="radio-text-option">
                    <input
                      type="radio"
                      id={item.name}
                      name="difficulty"
                      // checked={formValues.difficulty == item.name}
                      value={item.name}
                      onChange={handleInputChange}
                    />
                    <label htmlFor={item.name}>
                      <div className="task-card-main-title"                 
                      >{item.name}</div>
                    </label>
                  </div>
                </>
              ))}
            </div>
            <div className="card-row-buttons-center">
              <button className="card-button" type="submit">Create Model Task</button>
              </div>
          </form>
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    tidyUser: state.tidyUser,
    modelTasks: state.modelTasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      createModelTaskRequest,
      tidyUserRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelTaskNew);
