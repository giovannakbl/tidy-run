import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ChallengeList from './pages/ChallengeList';
import Challenge from './pages/Challenge';
import ChallengeEdit from './pages/ChallengeEdit';
import ChallengeNew from './pages/ChallengeNew';
import ModelTasksList from './pages/ModelTasksList';
import ModelTask from './pages/ModelTask';
import ModelTaskEdit from './pages/ModelTaskEdit';
import ModelTaskNew from './pages/ModelTaskNew';
import HomeMembersList from './pages/HomeMembersList';
import HomeMemberNew from './pages/HomeMembersNew';
import HomeMember from './pages/HomeMember';
import HomeMemberEdit from './pages/HomeMemberEdit';
import TaskNew from './pages/TaskNew';
import TaskEdit from './pages/TaskEdit';
import TaskComplete from './pages/TaskComplete';
import TidyUser from './pages/TidyUser';
import TidyUserEditEmail from './pages/TidyUserEditEmail';
import TidyUserEditHomeName from './pages/TidyUserEditHomeName';
import TidyUserEditPassword from './pages/TidyUserEditPassword';
import Register from './pages/Register';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/challenge-list" element={<ChallengeList />} />
      <Route path="/challenge-edit/:challengeId" element={<ChallengeEdit />} />
      <Route path="/challenge/:challengeId" element={<Challenge />} />
      <Route path="/challenge-new" element={<ChallengeNew/>} />
      <Route path="/task-new/:challengeId" element={<TaskNew/>}/>
      <Route path="/task-edit/:taskId" element={<TaskEdit/>}/>
      <Route path="/task-complete/:taskId" element={<TaskComplete/>}/>
      <Route path="/model-tasks" element={<ModelTasksList/>} />
      <Route path="/model-task-new" element={<ModelTaskNew/>} />
      <Route path="/model-task/:modelTaskId" element={<ModelTask/>} />
      <Route path="/model-task-edit/:modelTaskId" element={<ModelTaskEdit/>} />
      <Route path="/home-members" element={<HomeMembersList/>} />
      <Route path="/home-member-new" element={<HomeMemberNew/>} />
      <Route path="/home-member/:homeMemberId" element={<HomeMember/>} />
      <Route path="/home-member-edit/:homeMemberId" element={<HomeMemberEdit/>} />
      <Route path="/account" element={<TidyUser />} />
      <Route path="/account/email" element={<TidyUserEditEmail />} />
      <Route path="/account/home-name" element={<TidyUserEditHomeName />} />
      <Route path="/account/password" element={<TidyUserEditPassword />} />   
    </Routes>
  </BrowserRouter>
  );
}

export default App;
