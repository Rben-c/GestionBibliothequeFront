import React, { useState } from 'react';
import '../styles/Header.css';
import logo from '../assets/Fsts.png'

const Header = () => {
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleProfileClick = () => {
    setShowProfileDetails(!showProfileDetails);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.profile-container')) {
      setShowProfileDetails(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // Fonction pour gérer le changement de la barre de recherche
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Fonction pour gérer l'envoi de la recherche
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Effectuer l'action de recherche, par exemple, filtrer les données
    console.log('Recherche pour:', searchTerm);
    // Vous pouvez également rediriger vers une page de résultats de recherche ici
  };

  return (
    <div className="header">
      <img src={logo} alt="Logo" className="logo" />

      <form className="search-container" onSubmit={handleSearchSubmit}>
        <i className="fas fa-search search-icon"></i>
        <input 
          type="text" 
          placeholder="Rechercher..." 
          className="search-bar" 
          value={searchTerm}
          onChange={handleSearchChange} 
        />
      </form>
      
      <div className="profile-container" onClick={handleProfileClick}>
        <i className="fas fa-user-circle profile-icon"></i>
        <span className="profile-name">Nom Prénom</span>
        {showProfileDetails && (
          <div className="profile-details">
            <p><strong>Nom:</strong> VotreNom</p>
            <p><strong>Prénom:</strong> VotrePrénom</p>
            <p><strong>Email:</strong> email@example.com</p>
            <p><strong>Code:</strong> Code123</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
