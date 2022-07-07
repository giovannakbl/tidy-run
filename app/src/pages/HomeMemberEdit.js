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
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await editHomeMemberRequest(auth.data.token, homeMemberId, formValues);
    navigate("/home-members");
  };
  const handleDeleteHomeMember = async () => {
    await deleteHomeMemberRequest(auth.data.token, homeMemberId);
    navigate("/home-members");
  };

  if (!auth.data.token) return <Navigate to="/login" replace />;

  return (
    <>
      <Header></Header>
      <main>
        {homeMembers.loading ? (
          <p>Loading...</p>
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
                <button
                  className="delete-button"
                  type="button"
                  onClick={handleDeleteHomeMember}
                >
                  <div>
                    <FontAwesomeIcon icon="fa-trash-can" />
                  </div>
                  <div>Delete Home Member</div>
                </button>
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
