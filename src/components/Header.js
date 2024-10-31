import React, { useState } from 'react';
import '../styles/Header.css';

const Header = () => {
  const [showProfileDetails, setShowProfileDetails] = useState(false);

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

  return (
    <div className="header">
      <img src={require('C:/Users/hnebm/Desktop/gestion-bibliotheque-front/src/assets/Fsts.png')} alt="Logo" className="logo" />

      <div className="search-container">
        <i className="fas fa-search search-icon"></i>
        <input type="text" placeholder="Rechercher..." className="search-bar" />
      </div>
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
