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
import content from './data/data.json';
import { ThemeProvider } from './ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import DownloadableP5Image from './components/Bracket';

function App() {
  return (
    <BrowserRouter future={{
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    }}>
      <ThemeProvider>
        <div className="App d-flex flex-column min-vh-100">
          <NavBar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage heading={content.aboutPage.aboutPageHeading} aboutPageContent={content.aboutPage.aboutPageContent} />} />
              <Route path="/music_search" element={<ArtistSearch />} />
              <Route path="/artist/:handle" element={<ArtistPage />} />
              <Route path="/bracket" element={<DownloadableP5Image />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/create_account" element={<CreateAccountPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
