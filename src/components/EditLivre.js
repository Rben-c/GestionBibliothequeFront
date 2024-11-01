import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLivres, updateLivre } from '../utils/LocalStorage';
import '../styles/EditLivre.css';

const EditLivre = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [livre, setLivre] = useState({
    auteur: '',
    titre: '',
    soustitre: '',
    edition: '',
    cote1: '',
    cote2: '',
    descripteurs: '',
  });
  const [erreur, setErreur] = useState('');
  const [confirmationVisible, setConfirmationVisible] = useState(false); // État pour gérer la boîte de confirmation

  useEffect(() => {
    const livres = getLivres();
    const livreTrouve = livres.find(l => l.id === id);
    if (livreTrouve) {
        setLivre(livreTrouve);
    } else {
        setErreur('Livre non trouvé');
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLivre({ ...livre, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateLivre(livre);
    setConfirmationVisible(true); // Afficher la boîte de confirmation
  };

  const handleCancel = () => {
    navigate('/livres'); // Rediriger vers la page des livres
  };

  const handleConfirmationClose = () => {
    setConfirmationVisible(false);
    navigate('/livres');
  };

  return (
    <div className="modifier-livre-container">
      <h2>Modifier le Livre</h2>
      {erreur && <p className="alert">{erreur}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Auteur:</label>
          <input
            type="text"
            name="auteur"
            value={livre.auteur}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Titre:</label>
          <input
            type="text"
            name="titre"
            value={livre.titre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Sous-titre:</label>
          <input
            type="text"
            name="soustitre"
            value={livre.soustitre}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Édition:</label>
          <input
            type="text"
            name="edition"
            value={livre.edition}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Cote 1:</label>
          <input
            type="text"
            name="cote1"
            value={livre.cote1}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Cote 2:</label>
          <input
            type="text"
            name="cote2"
            value={livre.cote2}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Descripteurs:</label>
          <input
            type="text"
            name="descripteurs"
            value={livre.descripteurs}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-container">
          <button type="submit" className="btn-success">Mettre à jour</button>
          <button  onClick={() => navigate('/gestion-livre')} className="btn-cancel">Annuler</button>
        </div>
      </form>

      {confirmationVisible && (
        <div className="confirmation-overlay">
        <div className="confirmation-box">
          <p>Le livre a été mis à jour avec succès !</p>
          <button onClick={() => navigate('/gestion-livre')} className="btn-confirm">OK</button>
        </div>
      </div>
      
      )}
    </div>
  );
};

export default EditLivre;
