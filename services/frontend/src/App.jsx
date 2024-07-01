import { React } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';
import NavBar from './NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';

import NotFoundPage from './pages/NotFoundPage';

import ArtistPage from './pages/ArtistPage';

import ArtistSearch from './pages/ArtistSearch';
import HookTest from './pages/HookTest';
import BracketTest from './pages/BracketTest';

import content from './data/data.json';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage heading={content.aboutPage.aboutPageHeading} />} />
          <Route path="/music_search" element={<ArtistSearch />} />
          <Route path="/bracket_test" element={<BracketTest />} />
          <Route path="/hooks_test" element={<HookTest />} />
          {/* End Test Pages */}
          <Route path="/artist/:handle" element={<ArtistPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create_account" element={<CreateAccountPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
