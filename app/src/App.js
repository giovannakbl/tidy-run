import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import './App.css';
import ChallengeList from './pages/ChallengeList';
import Challenge from './pages/Challenge';
import ChallengeEdit from './pages/ChallengeEdit';
import ChallengeNew from './pages/ChallengeNew';

function App() {
  return (

  <BrowserRouter>
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/challenge-list" element={<ChallengeList />} />
      <Route path="/challenge-edit/:challengeId" element={<ChallengeEdit />} />
      <Route path="/challenge/:challengeId" element={<Challenge />} />
      <Route path="/challenge-new" element={<ChallengeNew/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
