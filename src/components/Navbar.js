// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Importer Link
import '../styles/Navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = () => {
  return (
    <div id="nav-bar">
      <input id="nav-toggle" type="checkbox" />
      <div id="nav-header">
        <label htmlFor="nav-toggle">
          <span id="nav-toggle-burger"></span>
        </label>
      </div>

      <div id="nav-content">
        <Link to="/gestion-etudiants">
          <div className="nav-button">
            <i className="fas fa-user-graduate"></i>
            <span>Gestion des étudiants</span>
          </div>
        </Link>
        <Link to="/gestion-personnel">
          <div className="nav-button">
            <i className="fas fa-users"></i>
            <span>Gestion du personnel</span>
          </div>
        </Link>
        <Link to="/gestion-Admin">
          <div className="nav-button">
            <i className="fas fa-user-shield"></i>
            <span>Gestion des administrateurs</span>
          </div>
        </Link>
        <Link to="/gestion-bibliothecaires">
          <div className="nav-button">
            <i className="fas fa-book"></i>
            <span>Gestion des bibliothécaires</span>
          </div>
        </Link>
        <hr />

        <Link to="/tableau-de-bord">
          <div className="nav-button">
            <i className="fas fa-tachometer-alt"></i>
            <span>Tableau de bord</span>
          </div>
        </Link>

        <hr />
        <div id="nav-content-highlight"></div>
      </div>

      <input id="nav-footer-toggle" type="checkbox" />
      <div id="nav-footer">
        <Link to="/login">
          <div className="nav-button">
            <i className="fas fa-sign-out-alt"></i>
            <span>Déconnexion</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
