import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { allHomeMembersRequest } from "../store/HomeMembers/actions";
import { logoutRequest } from "../store/Auth/actions";
import { bindActionCreators } from "redux";
import { standardOptions } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from '../components/Header';
import Spinner from "../components/spinner/Spinner";

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
    const allHomeMembersDetails = await allHomeMembersRequest();
    setHomeMembersInfo(getHomeMembersInfo(allHomeMembersDetails));
  };

  return (
    <>
    <Header></Header>
    <main>
 
<h1 className="page-main-title">Home Members</h1>
<button
                className="new-item-button"
                onClick={() => navigate("/home-member-new")}
              >
                <div>
                  <FontAwesomeIcon className="new-item-icon" icon="fa-plus" />
                </div>
                <div>New Home Member</div>
              </button>




      {homeMembers.loading ? (
        <Spinner/>
      ) : homeMembers.error ? (
        <p>Error</p>
      ) : (
        <>
        <div className="home-member-area">
{homeMembersInfo.map((item) => (
                  <>
                  <div className="task-card">
                    <div className="task-card-row-initial" style={{
                          color: item.color,
                        }}>
                          {/* <div className="member-main-text"> */}
                        <div
                          className="medium-icon-circle"
                          style={{
                            backgroundColor: item.color,
                          }}
                        >
                          <FontAwesomeIcon icon={item.icon} />
                        </div>
                        {/* </div> */}
                        <div className="task-card-main-title">
                          <p 
                           
                          style={{
                          color: item.color,
                        }}
                       
                        >{item.name}
                        </p>
                        </div>
                    </div>
          
        <button
                  className="card-button"
                  type="button"
                  onClick={() => navigate("/home-member-edit/" + item.id)}
                >
                  <div className="card-icon-button">
                    <FontAwesomeIcon icon="fa-pencil" />
                  </div>
                  <div>Edit Home Member</div>
                </button>
                    </div>
                  </>
                ))}
                </div>
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
