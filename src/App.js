// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Navbar from './components/Navbar'; // Assure-toi que le chemin est correct


import GestionEtudiants from './pages/GestionEtudiants';
import GestionPersonnel from './pages/GestionPersonnel';
import GestionAdmin from './pages/GestionAdmin';
import GestionBibliothecaires from './pages/GestionBibliothecaires';
import Login from './pages/LoginPage'; // Page de login
import Navbar from './components/Navbar';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header/>
      <Navbar/>
      <Routes>
        <Route path="/gestion-personnel" element={<GestionPersonnel />} />
        <Route path="/gestion-etudiants" element={<GestionEtudiants />} />
        <Route path="/gestion-bibliothecaires" element={<GestionBibliothecaires />} />
        <Route path="/gestion-Admin" element={<GestionAdmin />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
