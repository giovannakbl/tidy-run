import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ChallengeList from "./pages/ChallengeList";
import Challenge from "./pages/Challenge";
import ChallengeEdit from "./pages/ChallengeEdit";
import ChallengeNew from "./pages/ChallengeNew";
import ModelTasksList from "./pages/ModelTasksList";
import ModelTaskEdit from "./pages/ModelTaskEdit";
import ModelTaskNew from "./pages/ModelTaskNew";
import HomeMembersList from "./pages/HomeMembersList";
import HomeMemberNew from "./pages/HomeMembersNew";
import HomeMemberEdit from "./pages/HomeMemberEdit";
import TaskNew from "./pages/TaskNew";
import TaskEdit from "./pages/TaskEdit";
import TaskComplete from "./pages/TaskComplete";
import TidyUser from "./pages/TidyUser";
import TidyUserEditEmail from "./pages/TidyUserEditEmail";
import TidyUserEditHomeName from "./pages/TidyUserEditHomeName";
import TidyUserEditPassword from "./pages/TidyUserEditPassword";
import Register from "./pages/Register";
import GameRules from "./pages/GameRules";
import GetStarted from "./pages/GetStarted";
import { useCookies } from "react-cookie";
import { useNavigate, Navigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useState, useEffect } from "react";


function App() {
  const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [cookies, setCookie] = useCookies(["user"]);
    useEffect(() => {
      console.log("Olhei cookie");
      setIsAuthenticated(cookies.isLoggedIn === "yes");
    }, []);
    // useEffect(() => {
    //   console.log("Mudou store");
    //   // setIsAuthenticated(cookies.isLoggedIn === "yes");
    // }, [store]);
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return children ? children : <Outlet />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          index
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/challenge-list"
          element={
            <ProtectedRoute>
              <ChallengeList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/challenge-edit/:challengeId"
          element={
            <ProtectedRoute>
              <ChallengeEdit />
            </ProtectedRoute>
          }
        />
        <Route path="/challenge/:challengeId" element={<ProtectedRoute><Challenge /></ProtectedRoute>} />
        <Route
          path="/challenge-new"
          element={
            <ProtectedRoute>
              <ChallengeNew />
            </ProtectedRoute>
          }
        />
        <Route path="/task-new/:challengeId" element={<ProtectedRoute><TaskNew /></ProtectedRoute>} />
        <Route path="/task-edit/:taskId" element={<ProtectedRoute><TaskEdit /></ProtectedRoute>} />
        <Route path="/task-complete/:taskId" element={<ProtectedRoute><TaskComplete /></ProtectedRoute>} />
        <Route path="/model-tasks" element={<ProtectedRoute><ModelTasksList /></ProtectedRoute>} />
        <Route path="/model-task-new" element={<ProtectedRoute><ModelTaskNew /></ProtectedRoute>} />
        <Route
          path="/model-task-edit/:modelTaskId"
          element={<ModelTaskEdit />}
        />
        <Route path="/home-members" element={<ProtectedRoute><HomeMembersList /></ProtectedRoute>} />
        <Route path="/home-member-new" element={<ProtectedRoute><HomeMemberNew /></ProtectedRoute>} />
        <Route
          path="/home-member-edit/:homeMemberId"
          element={<ProtectedRoute><HomeMemberEdit /></ProtectedRoute>}
        />
        <Route path="/account" element={<ProtectedRoute><TidyUser /></ProtectedRoute>} />
        <Route path="/account/email" element={<ProtectedRoute><TidyUserEditEmail /></ProtectedRoute>} />
        <Route path="/account/home-name" element={<ProtectedRoute><TidyUserEditHomeName /></ProtectedRoute>} />
        <Route path="/account/password" element={<ProtectedRoute><TidyUserEditPassword /></ProtectedRoute>} />
        <Route path="/game-rules" element={<ProtectedRoute><GameRules /></ProtectedRoute>} />
        <Route path="/get-started" element={<ProtectedRoute><GetStarted /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// const mapStateToProps = (state) => {
//   return {

//     auth: state.auth,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(
//     {

//     },
//     dispatch
//   );
// };
// export default connect(mapStateToProps, mapDispatchToProps)(App);
