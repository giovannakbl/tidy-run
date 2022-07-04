import { useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {createHomeMemberRequest} from "../store/HomeMembers/actions";


const HomeMemberNew = ({
  auth,
  homeMembers,
  createHomeMemberRequest,
}) => {
    const initialForm = {
        avatarIcon: "Dog",
        iconColor: "Red"
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
    console.log("Oi");
    console.log(formValues);
    try {
    const result = await createHomeMemberRequest(auth.data.token, formValues);
    let newHomeMember = result.home_member;
    console.log(newHomeMember);
    console.log("Vou redirecionar para" + newHomeMember.id);
    navigate("/home-member/" + newHomeMember.id);
    } catch (e) {
      console.log("Chegou no erro");
    }
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
            <select id="avatar_icon"
              name="avatar_icon"
              type="text"
              onChange={handleInputChange}
              defaultValue={initialForm.avatarIcon}
              value={formValues.avatar_icon}>
              <option value={initialForm.avatarIcon}>{initialForm.avatarIcon}</option>
              <option value="Cat">Cat</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Wale">Wale</option>
            </select>
            <label htmlFor="icon_color">Icon Color</label>
            <select id="icon_color"
              name="icon_color"
              type="text"
              defaultValue={initialForm.iconColor}
              onChange={handleInputChange}
              value={formValues.icon_color}>
              <option value={initialForm.iconColor}>{initialForm.iconColor}</option>
              <option value="Green">Green</option>
              <option value="Blue">Blue</option>
              <option value="Yellow">Yellow</option>
            </select>

            <button type="submit">Create Home Member</button>
          </form>
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
      createHomeMemberRequest
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeMemberNew);
