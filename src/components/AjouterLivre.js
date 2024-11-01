import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bookService from '../services/livreService.js';
import '../styles/AjouterLivre.css';

const AjouterLivre = () => {
    const [livre, setLivre] = useState({
        titre: '',
        auteur: '',
        soustitre: '', // Gardez le nom 'soustitre' ici
        edition: '',
        cote1: '',
        cote2: '',
        descripteurs: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLivre({ ...livre, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Conversion des descripteurs en tableau
        const livreAvecDescripteurs = {
            ...livre,
            descripteurs: livre.descripteurs.split(',').map(d => d.trim()).filter(Boolean),
        };

        // Envoi à bookService avec le bon nom de propriété
        await bookService.addLivre({
            ...livreAvecDescripteurs,
            soustitre: livreAvecDescripteurs.soustitre // Assurez-vous d'envoyer 'soustitre'
        });
        navigate('/gestion-livre');
    };

    const handleCancel = () => {
        navigate('/gestion-livre');
    };

    return (
        <div className="ajouter-livre-container">
            <h2>Ajouter un Livre</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Titre:</label>
                    <input type="text" name="titre" value={livre.titre} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Auteur:</label>
                    <input type="text" name="auteur" value={livre.auteur} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Sous-titre:</label>
                    <input type="text" name="soustitre" value={livre.soustitre} onChange={handleChange} /> {/* Correspond au champ soustitre */}
                </div>
                <div className="form-group">
                    <label>Édition:</label>
                    <input type="text" name="edition" value={livre.edition} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Cote 1:</label>
                    <input type="text" name="cote1" value={livre.cote1} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Cote 2:</label>
                    <input type="text" name="cote2" value={livre.cote2} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Descripteurs (séparés par des virgules):</label>
                    <input type="text" name="descripteurs" value={livre.descripteurs} onChange={handleChange} />
                </div>
                <div className="button-container">
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Annuler</button>
                    <button type="submit" className="btn btn-success">Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default AjouterLivre;
