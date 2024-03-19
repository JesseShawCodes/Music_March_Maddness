import './App.scss';
import NavBar from './NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';

import { BrowserRouter, Routes, Route } from "react-router-dom"

import NotFoundPage from './pages/NotFoundPage';

import ArtistPage from './pages/ArtistPage';

/* Test Features */
/*https://dev.to/raaynaldo/rtk-query-tutorial-crud-51hl*/
import ArtistSearch from './pages/ArtistSearch';
import HookTest from './pages/HookTest';
import Category from './pages/Category';
import Categories from './pages/Categories';
import FlaskTest from './pages/FlaskTest';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/music_search" element={<ArtistSearch />} />
            <Route path="/flask_test" element={<FlaskTest />} />
            <Route path="/hooks_test" element={<HookTest />} />
            {/* End Test Pages */}
            <Route path="/artist/:handle" element={<ArtistPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create_account" element={<CreateAccountPage />} />
            <Route path="*" element={<NotFoundPage />} />

            {/* Nested Route Example */}
            <Route path="categories" element={<Categories />} >
              <Route path="category" element={<Category />} />
            </Route>
          </Routes>
        </>
      </div>
    </BrowserRouter>
  );
}

export default App;