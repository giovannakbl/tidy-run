import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createHomeMemberRequest } from "../store/HomeMembers/actions";
import { standardOptions } from "../store";

const HomeMemberNew = ({ auth, createHomeMemberRequest }) => {
  const initialForm = {
    avatarIcon: "Dog",
    iconColor: "Red",
  };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: undefined,
    avatar_icon: initialForm.avatarIcon,
    icon_color: initialForm.iconColor,
  });
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createHomeMemberRequest(auth.data.token, formValues);
      let newHomeMember = result.home_member;
      navigate("/home-member/" + newHomeMember.id);
    } catch (e) {}
  };

  if (!auth.data.token) return <Navigate to="/login" replace />;

  return (
    <>
      <button onClick={() => navigate("/home-members")}>
        Go back to Home Members List
      </button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={handleInputChange}
          value={formValues.name}
        />
        <label htmlFor="avatar_icon">Avatar Icon</label>
        <select
          id="avatar_icon"
          name="avatar_icon"
          type="text"
          onChange={handleInputChange}
          defaultValue={standardOptions.avatarIcon[0].name}
          value={formValues.avatar_icon}
        >
          {
            standardOptions.avatarIcon.map((item) => (
              <option value={item.name}>{item.name}</option>
            ))
          }
        </select>
        <label htmlFor="icon_color">Icon Color</label>
        <select
          id="icon_color"
          name="icon_color"
          type="text"
          defaultValue={standardOptions.iconColor[0].name}
          onChange={handleInputChange}
          value={formValues.icon_color}
        >
          {
            standardOptions.iconColor.map((item) => (
              <option value={item.name}>{item.name}</option>
            ))
          }
        </select>

        <button type="submit">Create Home Member</button>
      </form>
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
      createHomeMemberRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeMemberNew);
