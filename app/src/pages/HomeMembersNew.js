import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createHomeMemberRequest } from "../store/HomeMembers/actions";
import { standardOptions } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tidyUserRequest } from "../store/TidyUser/actions";
import Header from "../components/Header";
import Alert from "../components/alert/Alert";
import Spinner from "../components/spinner/Spinner";

const HomeMemberNew = ({
  auth,
  createHomeMemberRequest,
  homeMembers,
  tidyUser,
  tidyUserRequest,
}) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: undefined,
    avatar_icon: undefined,
    icon_color: undefined,
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
        await createHomeMemberRequest(formValues);
        navigate("/home-members");
      } catch (e) {}
    }
  };

  const isFormValid = () => {
    if (!formValues.name) {
      setFormErrorMessage("You must fill in the field Name");
      return false;
    }

    if (formValues.name.trim().length === 0 || formValues.name === null) {
      setFormErrorMessage("The name must have at least a number or letter");
      return false;
    }

    if (!formValues.avatar_icon) {
      setFormErrorMessage("You must choose an icon");
      return false;
    }
    if (!formValues.icon_color) {
      setFormErrorMessage("You must choose a color");
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
            type="button"
            onClick={() => navigate("/home-members")}
          >
            &#60;&#60; Go back to Home Members List
          </button>
        
          <h1 className="page-main-title">New Home Member</h1>
          <div className="alert-area">
          {isSubmitted && homeMembers.status === "rejected" && (
          <Alert type="error" message={homeMembers.error.error_message_api} />
        )}
        {!homeMembers.loading &&
          isSubmitted &&
          homeMembers.status === "succeeded" && (
            <Alert type="success" message={"The Home member was created!"} />
          )}
        {formErrorMessage ? (
          <Alert type="error" message={formErrorMessage} />
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
            {standardOptions.avatarIcon.map((item) => (
              <>
                <div className="icon-option">
                  <input
                    type="radio"
                    id={item.name}
                    name="avatar_icon"
                    value={item.name}
                    onChange={handleInputChange}
                  />
                  <label htmlFor={item.name}>
                    <div  className="icon-list-circle">
                      <FontAwesomeIcon icon={item.icon} />
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
                    value={item.name}
                    onChange={handleInputChange}
                  />
                  <label htmlFor={item.name}>
                    <div
                       className="icon-list-circle"
                      style={{
                        backgroundColor: item.color,
                      }}
                    ></div>
                  </label>
                </div>
              </>
            ))}
          </div>
          <div className="card-row-buttons-center">
              <button className="card-button" type="submit">Create Home Member</button>
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
    homeMembers: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      createHomeMemberRequest,
      tidyUserRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeMemberNew);
