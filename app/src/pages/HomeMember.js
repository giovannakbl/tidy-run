import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { logoutRequest } from "../store/Auth/actions";
import {fetchHomeMemberRequest} from "../store/HomeMembers/actions"; 
import { bindActionCreators } from 'redux';

const HomeMember = ({ auth, homeMembers, fetchHomeMemberRequest, logoutRequest }) => {
  let navigate = useNavigate();
  let { homeMemberId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    getHomeMember();
  }, []);

  const getHomeMember = async () => {
    await fetchHomeMemberRequest(auth.data.token, homeMemberId);
  };
  const handleLogout = async () => {
    await logoutRequest();
  };

  if (auth.data.token == null) return <Navigate to="/login" replace />;

  return (
    <>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <button onClick={() => navigate("/home-members")}>
        Go back to Home Members List
      </button>
      {homeMembers.loading ? null : (
        <button onClick={() => navigate("/home-member-edit/" + homeMemberId)}>
          Edit Home Member
        </button>
      )}
      <h1>Home Member</h1>
      <h2>Check out This Home Member</h2>
      {homeMembers.loading ? (
        <p>Loading...</p>
      ) : homeMembers.error ? (
        <p>Error</p>
      ) : (
        <ul>
            <li>id: {homeMembers.data.homeMember.id}</li>
            <li>Name: {homeMembers.data.homeMember.name}</li>
            <li>Avatar Icon: {homeMembers.data.homeMember.avatar_icon}</li>
            <li>Icon Color: {homeMembers.data.homeMember.icon_color}</li>
            <li>Deleted at: {homeMembers.data.homeMember.deleted_at}</li>
        </ul>
      )}
      {homeMembers.data.homeMember.deleted_at ? <p>This home member is deleted</p> : <p>This home member is active</p>}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    homeMembers: state.homeMembers
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchHomeMemberRequest,
    logoutRequest, 
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeMember);
