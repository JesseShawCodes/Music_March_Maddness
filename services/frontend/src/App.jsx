import { React } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';
import NavBar from './NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import Footer from './components/Footer';

import NotFoundPage from './pages/NotFoundPage';

import ArtistPage from './pages/ArtistPage';

import ArtistSearch from './pages/ArtistSearch';
import TestPage from './pages/StateManagement';
import content from './data/data.json';
import { ThemeProvider } from './ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="App d-flex flex-column min-vh-100">
          <NavBar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage heading={content.aboutPage.aboutPageHeading} />} />
              <Route path="/music_search" element={<ArtistSearch />} />
              <Route path="/test" element={<TestPage />} />
              {/* End Test Pages */}
              <Route path="/artist/:handle" element={<ArtistPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/create_account" element={<CreateAccountPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
