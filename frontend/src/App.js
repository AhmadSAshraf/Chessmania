import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Players from './pages/Players';
import Profile from './pages/Profile';
import TournamentsList from './pages/TournamentsList';
import TournamentDetail from './pages/TournamentDetail';
import RoundsList from './pages/RoundsList'
import RoundDetail from './pages/RoundDetail'
import MatchesList from './pages/MatchesList'
import MatchDetail from './pages/MatchDetail'
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import PlayerDetail from "./pages/PlayerDetail";
import ParticipantDetail from "./pages/ParticipantDetail";
import ParticipantsList from "./pages/ParticipantsList";
import BasePage from './pages/BasePage';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/players" element={<PrivateRoute><Players /></PrivateRoute>} />
          <Route path="/players/:playerID" element={<PrivateRoute><PlayerDetail /></PrivateRoute>} />
          <Route path="/tournaments" element={<PrivateRoute><TournamentsList /></PrivateRoute>} />
          <Route path="/tournaments/:tourID" element={<PrivateRoute><TournamentDetail /></PrivateRoute>} />
          <Route path="/tournaments/:tourID/participants/" element={<PrivateRoute><ParticipantsList /></PrivateRoute>} />
          <Route path="/tournaments/:tourID/participants/:partID" element={<PrivateRoute><ParticipantDetail /></PrivateRoute>} />
          <Route path="/tournaments/:tourID/rounds" element={<PrivateRoute><RoundsList /></PrivateRoute>} />
          <Route path="/tournaments/:tourID/rounds/:roundID" element={<PrivateRoute><RoundDetail /></PrivateRoute>} />
          <Route path="/tournaments/:tourID/rounds/:roundID/matches" element={<PrivateRoute><MatchesList /></PrivateRoute>} />
          <Route path="/tournaments/:tourID/rounds/:roundID/matches/:matchID" element={<PrivateRoute><MatchDetail /></PrivateRoute>} />
          <Route path="*" element={<PrivateRoute><BasePage /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;