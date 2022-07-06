import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { allHomeMembersRequest } from "../store/HomeMembers/actions";
import { logoutRequest } from "../store/Auth/actions";
import { bindActionCreators } from "redux";
import { standardOptions } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from '../components/Header';

const HomeMemberList = ({
  auth,
  homeMembers,
  allHomeMembersRequest,
}) => {
  let navigate = useNavigate();
  const [homeMembersInfo, setHomeMembersInfo] = useState([]);
  useEffect(() => {
    getAllHomeMembers();
  }, []);
  const getHomeMembersInfo = (allHomeMembersDetails) => {
    let result = [];
    allHomeMembersDetails.home_members.map(
      (item, index) =>
        (result[index] = {
          id: item.id,
          name: item.name,
          color: standardOptions.iconColor.find(
            (element) => element.name === item.icon_color
          ).color,
          icon: standardOptions.avatarIcon.find(
            (element) => element.name === item.avatar_icon
          ).icon,
        })
    );
    return result;
  };
  const getAllHomeMembers = async () => {
    const allHomeMembersDetails = await allHomeMembersRequest(auth.data.token);
    setHomeMembersInfo(getHomeMembersInfo(allHomeMembersDetails));
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
        <>
{homeMembersInfo.map((item) => (
                  <>
                  <div className="task-info">
                    <div className="flex-row-start" style={{
                          color: item.color,
                        }}>
                        <div
                          className="fa-icons"
                          style={{
                            backgroundColor: item.color,
                          }}
                        >
                          <FontAwesomeIcon icon={item.icon} />
                        </div>
                        <div>
                          <p style={{
                          color: item.color,
                        }}>{item.name}</p>
                        </div>
                    </div>
              <button onClick={() => navigate("/home-member-edit/" + item.id)}>
          Edit Home Member
        </button>
                    </div>
                  </>
                ))}
        </>
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
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeMemberList);
