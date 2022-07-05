import { useState } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  deleteHomeMemberRequest,
  editHomeMemberRequest,
} from "../store/HomeMembers/actions";
import { standardOptions } from "../store";
import Header from '../components/Header';

const HomeMemberEdit = ({
  auth,
  homeMembers,
  editHomeMemberRequest,
  deleteHomeMemberRequest,
}) => {
  let { homeMemberId } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: undefined,
    avatar_icon: undefined,
    icon_color: undefined,
  });
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await editHomeMemberRequest(auth.data.token, homeMemberId, formValues);
    navigate("/home-member/" + homeMemberId);
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
        <div className="go-back-area">
          <button
            className="go-back-button"
            onClick={() => navigate("/home-member/" + homeMemberId)}
          >
            &#60;&#60; Go back to Home Member
          </button>
        </div>
      )}
      {homeMembers.data.homeMember.deleted_at ? (
        <p>It is not possible to edit this home member</p>
      ) : (
        <>
          <button onClick={handleDeleteHomeMember}>Delete Home Member</button>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={handleInputChange}
              defaultValue={homeMembers.data.homeMember.name}
              value={formValues.name}
            />
            <label htmlFor="avatar_icon">Avatar Icon</label>
            <select
              id="avatar_icon"
              name="avatar_icon"
              type="text"
              onChange={handleInputChange}
              defaultValue={homeMembers.data.homeMember.avatar_icon}
              value={formValues.avatar_icon}
            >
              {standardOptions.avatarIcon.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </select>
            <label htmlFor="icon_color">Icon Color</label>
            <select
              id="icon_color"
              name="icon_color"
              type="text"
              onChange={handleInputChange}
              defaultValue={homeMembers.data.homeMember.icon_color}
              value={formValues.icon_color}
            >
              {standardOptions.iconColor.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </select>
            <button type="submit">Save Changes</button>
          </form>
          
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
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeMemberEdit);
