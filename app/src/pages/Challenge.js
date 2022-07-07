import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { logoutRequest } from "../store/Auth/actions";
import {
  fetchChallengeRequest,
  terminateChallengeRequest,
  reopenChallengeRequest,
} from "../store/Challenge/actions";
import {
  fetchTasksInChallengeRequest,
  removeCompletionTaskRequest,
} from "../store/Tasks/actions";
import { allHomeMembersRequest } from "../store/HomeMembers/actions";
import { fetchScoreBoardsRequest } from "../store/ScoreBoards/actions";
import { bindActionCreators } from "redux";
import { standardOptions } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header";
import format from "..";

const Challenge = ({
  auth,
  challenge,
  tasks,
  homeMembers,
  scoreBoards,
  fetchTasksInChallengeRequest,
  removeCompletionTaskRequest,
  allHomeMembersRequest,
  fetchChallengeRequest,
  terminateChallengeRequest,
  reopenChallengeRequest,
  fetchScoreBoardsRequest,
}) => {
  let navigate = useNavigate();
  let { challengeId } = useParams();
  useEffect(() => {
    getTasksInChallenge();
    getHomeMembers();
    getScoreBoards();
    // console.log(scoreBoardsInfo);
    // console.log(homeMembers.data.homeMembersList);
  }, []);
  useEffect(() => {
    getScoreBoards();
    
  }, [challenge.data.challenge.status]);

  

  const [homeMembersIndex, setHomeMembersIndex] = useState({});
  const [tasksInfo, setTasksInfo] = useState([]);
  const [scoreBoardsInfo, setScoreBoardsInfo] = useState([]);
  // useEffect(() => {
  //   console.log(scoreBoardsInfo);

  // }, [scoreBoardsInfo]);
  useEffect(() => {
    console.log(homeMembersIndex);

  }, [homeMembersIndex]);
  const getHomeMembersIndex = (allHomeMembersDetails) => {
    let result = {};
    if (allHomeMembersDetails.home_members_all) {
    allHomeMembersDetails.home_members_all.map(
      (item) =>
        (result[item.id] = {
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
  }
    return result;
  };
  const getTasksInfo = (allTasksDetails) => {
    let result = [];
    allTasksDetails.tasks.map(
      (item, index) =>
        (result[index] = {
          id: item.id,
          name: item.name,
          color: standardOptions.iconColor.find(
            (element) => element.name === item.icon_color
          ).color,
          icon: standardOptions.taskIcon.find(
            (element) => element.name === item.task_icon
          ).icon,
          homeMemberId: item.home_member_id,
          difficulty: item.difficulty,
          pointsEarned: item.points_earned,
          completedAt: item.completed_at,
        })
    );
    return result;
  };
  const getChallenge = async () => {
    await fetchChallengeRequest(auth.data.token, challengeId);
  };

  const getTasksInChallenge = async () => {
    const allTasksDetails = await fetchTasksInChallengeRequest(
      auth.data.token,
      challengeId
    );
    setTasksInfo(getTasksInfo(allTasksDetails));
  };
  const getHomeMembers = async () => {
    const allHomeMembersDetails = await allHomeMembersRequest(auth.data.token);
    setHomeMembersIndex(getHomeMembersIndex(allHomeMembersDetails));
  };
  const getScoreBoards = async () => {
    const res = await fetchChallengeRequest(auth.data.token, challengeId);
    const challengeStatus = res.challenge.status;
    if (challengeStatus == "completed" || challengeStatus == "terminated") {
      const allScoreBoardsDetails = await fetchScoreBoardsRequest(auth.data.token, challengeId);
      setScoreBoardsInfo(allScoreBoardsDetails.challenge_score_boards);
    } else {
      setScoreBoardsInfo([]);
    }
    
  };
  const removeCompletionTask = async (taskId) => {
    await removeCompletionTaskRequest(auth.data.token, taskId);
    getChallenge();
    getTasksInChallenge();
  };
  const terminateChallenge = async () => {
    await terminateChallengeRequest(auth.data.token, challengeId);
  };
  const reopenChallenge = async () => {
    await reopenChallengeRequest(auth.data.token, challengeId);
  };

  if (auth.data.token == null) return <Navigate to="/login" replace />;

  return (
    <>
      <Header></Header>
      <main>
        <div className="go-back-area">
          <button
            className="go-back-button"
            onClick={() => navigate("/challenge-list")}
          >
            &#60;&#60; Go back to Challenge List
          </button>
        </div>
        {challenge.loading ? (
          <p>Loading...</p>
        ) : challenge.error ? (
          <p>Error</p>
        ) : (
          <>
            <div className="challenge-info">
              <h2>{challenge.data.challenge.name}</h2>

              <div className="flex-row-start">
                <h3 className="standard-info">Status: </h3>
                <h3 className="custom-info">
                  {challenge.data.challenge.status}
                </h3>
              </div>
              <div className="flex-row-start">
                <h3 className="standard-info">Start date: </h3>
                <h3 className="custom-info">
                  {format(challenge.data.challenge.start_date)}
                </h3>
              </div>
              <div className="flex-row-start">
                <h3 className="standard-info">End date: </h3>
                <h3 className="custom-info">
                  {format(challenge.data.challenge.end_date)}
                </h3>
              </div>
              <div className="flex-row-start">
                <h3 className="standard-info">Prize: </h3>
                <h3 className="custom-info">
                  {challenge.data.challenge.prize}
                </h3>
              </div>
              {challenge.data.challenge.status == "created" ||
              challenge.data.challenge.status == "active" ? (
                <button
                  className="action-button"
                  type="button"
                  onClick={() => navigate("/challenge-edit/" + challengeId)}
                >
                  <div>
                    <FontAwesomeIcon icon="fa-pencil" />
                  </div>
                  <div>Edit Challenge</div>
                </button>
              ) : challenge.data.challenge.status == "started" ? (
                <button className="action-button" onClick={terminateChallenge}>
                  <div>
                    <FontAwesomeIcon icon="fa-list-check" />
                  </div>
                  <div>Terminate this Challenge</div>
                </button>
              ) : challenge.data.challenge.status == "terminated" ? (
                <button className="action-button" onClick={reopenChallenge}>
                  <div>
                    <FontAwesomeIcon icon="fa-lock-open" />
                  </div>
                  <div>Reopen this Challenge</div>
                </button>
              ) : null}
            </div>
            <h2>Challenge Tasks</h2>
            {challenge.data.challenge.status == "created" ||
            challenge.data.challenge.status == "active" ? (
              <button
                className="button-new-item"
                onClick={() => navigate("/task-new/" + challengeId)}
              >
                <div className="circle-new-item">
                  <p>+</p>
                </div>
                Add task
              </button>
            ) : null}
          </>

        )}
        
        {challenge.loading ||
        tasks.loading ||
        homeMembers.loading 
        // || ( challenge.data.challenge.status != "created" && challenge.data.challenge.status != "active" &&
        // Object.keys(homeMembersIndex).length === 0) 
        || (homeMembers.data.homeMembersList.length > 0 && Object.keys(homeMembersIndex).length === 0)
        || tasksInfo.length === 0
        ? (
          null
        ) : challenge.error || tasks.error || homeMembers.error ? (
          <p>Error</p>
        ) : (
          <>
          
            








{tasksInfo.map((item) => (
              <div className="task-info">
                <div className="task-internal">
                <div className="flex-row-start ">
                {/* <div className="flex-row-start half-width"> */}
                    <div className="full-height">
                      <div
                        className="fa-icons"
                        style={{
                          backgroundColor: item.color,
                        }}
                      >
                        <FontAwesomeIcon icon={item.icon} />
                      </div>
                    </div>
                  <div className="flex-column-start full-width">
                    <div className="middle-height task-main-text">
                      <p
                        style={{
                          color: item.color,
                          textDecoration: item.completedAt
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {item.name}
                      </p>
                    </div>
                  <div className="middle-height task-sec-text">
                    
                    <p
                      style={{
                        color: item.color,
                      }}
                    >
                      Difficulty: {item.difficulty}
                    </p>
                    {item.completedAt ? (
                      <p>Completed At: {format(item.completedAt)}</p>
                    ) : null}
                  </div>
                  </div>
                </div >               
                    {item.completedAt ? (
                      <>
                {/* <div className="flex-row-start half-width"> */}
                <div className="after-icon">
                        <div className="full-height">
                          <div
                            className="home-member-in-task-icon"
                            style={{
                              backgroundColor:
                                homeMembersIndex[item.homeMemberId].color,
                            }}
                          >
                            <FontAwesomeIcon
                              icon={homeMembersIndex[item.homeMemberId].icon}
                            />
                          </div>
                          </div>
                          {/* <div className="flex-column-start full-width"> */}
                            <div>
                            <div className="middle-height after-icon-main-text">
                            <p style={{
                              color:
                                homeMembersIndex[item.homeMemberId].color,
                            }}>{homeMembersIndex[item.homeMemberId].name}</p>
                            </div>
                            <div className="aligned-secondary task-sec-text">
                            <p>{item.pointsEarned} Points Earned</p>
                            </div>
                            </div>
                </div >                   
                      </>
                    ) : null}
                </div>
                <div className="flex-row-start">
                  {challenge.data.challenge.status == "created" ||
                  challenge.data.challenge.status == "active" ? (
                    <button
                      className="action-button"
                      onClick={() => navigate("/task-edit/" + item.id)}
                    >
                      <div>
                        <FontAwesomeIcon icon="fa-pencil" />
                      </div>
                      <div>Edit</div>
                    </button>
                  ) : null}
                  {challenge.data.challenge.status != "terminated" &&
                  item.completedAt ? (
                    <button
                      className="action-button"
                      onClick={() => removeCompletionTask(item.id)}
                    >
                      <div>
                        <FontAwesomeIcon icon="fa-xmark" />
                      </div>
                      <div>Remove completion of task</div>
                    </button>
                  ) : null}
                  {challenge.data.challenge.status != "terminated" &&
                  !item.completedAt ? (
                    <>
                      <button
                        className="action-button"
                        onClick={() => navigate("/task-complete/" + item.id)}
                      >
                        <div>
                          <FontAwesomeIcon icon="fa-check" />
                        </div>
                        <div>Complete</div>
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            ))}
          </>
        )}

        {challenge.loading ? null : challenge.error ? null : challenge.data
            .challenge.status != "completed" &&
          challenge.data.challenge.status !=
            "terminated" ? null : scoreBoards.loading ||
          Object.keys(homeMembersIndex).length === 0 || (scoreBoardsInfo).length === 0? (
          <p>Loading...</p>
        ) : scoreBoards.error ? (
          <p>Error</p>
        ) : (
          <>
            <h2>Ranking:</h2>
            {scoreBoardsInfo.map((item) => (
              <>
                <div className="ranking-info">
                  <div className="flex-row-between">
                    <div>
                      <h3>Position: {item.rank_in_challenge}</h3>
                    </div>
                    <div className="flex-row-start">
                      <div
                        className="fa-icons"
                        style={{
                          backgroundColor:
                            homeMembersIndex[item.home_member_id].color,
                        }}
                      >
                        <FontAwesomeIcon
                          icon={homeMembersIndex[item.home_member_id].icon}
                        />
                      </div>
                      <div>
                        <p
                          style={{
                            color: homeMembersIndex[item.home_member_id].color,
                          }}
                        >
                          {homeMembersIndex[item.home_member_id].name}
                        </p>
                        <p>Total points: {item.total_points}</p>
                      </div>
                    </div>
                  </div>
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
    challenge: state.challenge,
    tasks: state.tasks,
    homeMembers: state.homeMembers,
    scoreBoards: state.scoreBoards,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchChallengeRequest,
      terminateChallengeRequest,
      reopenChallengeRequest,
      logoutRequest,
      fetchTasksInChallengeRequest,
      allHomeMembersRequest,
      removeCompletionTaskRequest,
      fetchScoreBoardsRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
