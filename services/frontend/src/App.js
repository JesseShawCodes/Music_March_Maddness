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


function App() {


  return (
    <div className="App">
      <h1>Test</h1>
    </div>
  );
}

export default App;
