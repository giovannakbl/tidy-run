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
    const fetchedHomeMember = await fetchHomeMemberRequest(
      auth.data.token,
      homeMemberId
    );
    setFormValues({
      name: fetchedHomeMember.home_member.name,
      avatar_icon: fetchedHomeMember.home_member.avatar_icon,
      icon_color: fetchedHomeMember.home_member.icon_color,
    });
  };
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(formValues);
    setFormErrorMessage(undefined);
    setIsSubmitted(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    if (isFormValid()) {
      setIsSubmitted(true);
    await editHomeMemberRequest(auth.data.token, homeMemberId, formValues);
    console.log(isSubmitted);
    
    // navigate("/home-members");
    }
  };
  const handleDeleteHomeMember = async () => {
    await deleteHomeMemberRequest(auth.data.token, homeMemberId);
    navigate("/home-members");
  };
  useEffect(() => {
    console.log(homeMembers.status);
  }, [homeMembers.status]);

  const isFormValid = () => {
    
    if (
      formValues.name === homeMembers.data.homeMember.name &&
      formValues.avatar_icon === homeMembers.data.homeMember.avatar_icon &&
      formValues.icon_color === homeMembers.data.homeMember.icon_color
    ) {
      setFormErrorMessage("No changes were made");
      return false;
    }
  
    if (formValues.name) {
      if (formValues.name.trim().length === 0 || formValues.name === null) {
        setFormErrorMessage("The name must have at least a number or letter");
        console.log("Vazio");
        return false;
      }
    }
    return true;
  };



  if (!auth.data.token) return <Navigate to="/login" replace />;

  return (
    <>
      <Header></Header>
      <main>
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
        {homeMembers.loading ? (
          <Spinner/>
        ) : homeMembers.error ? (
          <p>Error</p>
        ) : (
          <>
            <div className="go-back-area">
              <button
                className="go-back-button"
                onClick={() => navigate("/home-members")}
              >
                &#60;&#60; Go back to Home Members List
              </button>
            </div>

            {homeMembers.data.homeMember.deleted_at ? (
              <p>It is not possible to edit this home member</p>
            ) : (
              <>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={handleInputChange}
                    value={formValues.name}
                    className="input-text"
                    required
                  />
                  <p className="label-text">Choose icon</p>
                  <div className="radio-list icon-list">
                    {standardOptions.avatarIcon.map((item) => (
                      <>
                        <div>
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
                            <div className="fa-icons">
                              <FontAwesomeIcon icon={item.icon} />
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
                            checked={formValues.icon_color == item.name}
                            value={item.name}
                            onChange={handleInputChange}
                            required
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
                  <button type="submit">Save Changes</button>
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
