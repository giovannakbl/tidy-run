import { useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  deleteHomeMemberRequest,
  editHomeMemberRequest,
  fetchHomeMemberRequest,
} from "../store/HomeMembers/actions";
import { standardOptions } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header";
import Alert from "../components/alert/Alert";
import DeleButtton from "../components/delete-button/DeleteButton";
import Spinner from "../components/spinner/Spinner";

const HomeMemberEdit = ({
  auth,
  homeMembers,
  editHomeMemberRequest,
  deleteHomeMemberRequest,
  fetchHomeMemberRequest,
}) => {
  let { homeMemberId } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: undefined,
    avatar_icon: undefined,
    icon_color: undefined,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState(undefined);
  const [isDeletedRequested, setIsDeletedRequested] = useState(false);

  useEffect(() => {
    getHomeMember();
  }, []);

  const getHomeMember = async () => {
    const fetchedHomeMember = await fetchHomeMemberRequest(homeMemberId);
    setFormValues({
      name: fetchedHomeMember.home_member.name,
      avatar_icon: fetchedHomeMember.home_member.avatar_icon,
      icon_color: fetchedHomeMember.home_member.icon_color,
    });
  };
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormErrorMessage(undefined);
    setIsSubmitted(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setIsSubmitted(true);
      await editHomeMemberRequest(homeMemberId, formValues);
    }
  };
  const handleDeleteHomeMember = async () => {
    await deleteHomeMemberRequest(homeMemberId);
    navigate("/home-members");
  };

  const isFormValid = () => {
    if (formValues.name) {
      if (formValues.name.trim().length === 0 || formValues.name === null) {
        setFormErrorMessage("The name must have at least a number or letter");
        return false;
      }
    }
    return true;
  };

  return (
    <>
      <Header></Header>
      <main>
        
        {homeMembers.loading ? (
          <Spinner />
        ) : homeMembers.error ? (
          <p>Error</p>
        ) : (
          <>
            
              <button
                className="go-back-button"
                onClick={() => navigate("/home-members")}
              >
                &#60;&#60; Go back to Home Members List
              </button>
            

            {homeMembers.data.homeMember.deleted_at ? (
              <h1 className="page-main-title">It is not possible to edit this home member</h1>
            ) : (
              <>
              <h1 className="page-main-title">Edit Home Member</h1>
              <div className="alert-area">
              {isSubmitted && homeMembers.status === "rejected" ? (
          <Alert type="error" message={homeMembers.error.error_message_api} />
        ) : null}
        {isSubmitted && homeMembers.status === "succeeded" ? (
          <Alert
            type="success"
            message={
              "The Home Member " +
              homeMembers.data.homeMember.name +
              " was updated!"
            }
          />
        ) : null}
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
                            checked={formValues.avatar_icon == item.name}
                            value={item.name}
                            onChange={handleInputChange}
                            required
                            
                          />
                          <label htmlFor={item.name}>
                            <div className="icon-list-circle" >
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
                            checked={formValues.icon_color == item.name}
                            value={item.name}
                            onChange={handleInputChange}
                            required
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
              <button className="card-button" type="submit">Save Changes</button>
              </div>
                </form>
                <DeleButtton
                  isDeletedRequested={isDeletedRequested}
                  deleteFunction={handleDeleteHomeMember}
                  setIsDeletedRequested={setIsDeletedRequested}
                />
              </>
            )}
          </>
        )}
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    homeMembers: state.homeMembers,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      editHomeMemberRequest,
      deleteHomeMemberRequest,
      fetchHomeMemberRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeMemberEdit);
