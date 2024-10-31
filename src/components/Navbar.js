// components/Navbar.js
import React from 'react';
import '../styles/Navbar.css'; // CSS spécifique pour ce composant
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
        <div className="nav-button">
          <i className="fas fa-user-graduate"></i> {/* Icon for student management */}
          <span>Gestion des étudiants</span>
        </div>
        <div className="nav-button">
          <i className="fas fa-users"></i> {/* Icon for personnel management */}
          <span>Gestion du personnel</span>
        </div>
        <div className="nav-button">
          <i className="fas fa-user-shield"></i> {/* Icon for admin management */}
          <span>Gestion des administrateurs</span>
        </div>
        <div className="nav-button">
          <i className="fas fa-book"></i> {/* Icon for librarian management */}
          <span>Gestion des bibliothécaires</span>
        </div>
        <hr/>

        <div className="nav-button">
          <i className="fas fa-tachometer-alt"></i> {/* Icon for dashboard */}
          <span>Tableau de bord</span>
        </div>

        <hr/>
        <div id="nav-content-highlight"></div>
      </div>

      <input id="nav-footer-toggle" type="checkbox" />
      <div id="nav-footer">
        <div className="nav-button">
          <i className="fas fa-sign-out-alt"></i> {/* Icon for logout */}
          <span>Déconnexion</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
