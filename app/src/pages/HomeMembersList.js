import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { allHomeMembersRequest } from "../store/HomeMembers/actions";
import { logoutRequest } from "../store/Auth/actions";
import { bindActionCreators } from "redux";
import Header from '../components/Header';

const HomeMemberList = ({
  auth,
  homeMembers,
  allHomeMembersRequest,
  logoutRequest,
}) => {
  let navigate = useNavigate();
  useEffect(() => {
    getAllHomeMembers();
  }, []);
  const getAllHomeMembers = async () => {
    await allHomeMembersRequest(auth.data.token);
  };
  const handleLogout = async () => {
    await logoutRequest();
  };

  if (auth.data.token == null) return <Navigate to="/login" replace />;

  return (
    <>
    <Header></Header>
    <main>
      <button
        onClick={() => {
          navigate("/home-member-new");
        }}
      >
        Create new Home Member
      </button>
      <h1>Home Members</h1>
      <h2>Check out your Home Members</h2>
      {homeMembers.loading ? (
        <p>Loading...</p>
      ) : homeMembers.error ? (
        <p>Error</p>
      ) : (
        <ul>
          {homeMembers.data.homeMembersList.map((item) => (
            <li key={item.id}>
              <button onClick={() => navigate("/home-member/" + item.id)}>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    homeMembers: state.homeMembers,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      allHomeMembersRequest,
      logoutRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeMemberList);
