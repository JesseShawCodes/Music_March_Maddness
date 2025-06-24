"use client";
import Image from "next/image";
import styles from "./page.module.css";

import { React } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';
import NavBar from './NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './about/page';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import Footer from './components/Footer';

import NotFoundPage from './pages/NotFoundPage';

import ArtistPage from './pages/ArtistPage';

import ArtistSearch from './pages/ArtistSearch';
import content from './data/data.json';
import { ThemeProvider } from './ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap';
import P5Image from './components/Bracket';

export default function Home() {
  return (
    <div className="container d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        <HomePage />
      </main>
    </div>
  );
}
