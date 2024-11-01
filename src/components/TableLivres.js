// components/TableLivres.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx'; // Import de la bibliothèque xlsx
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/BookManagement.css';

const TableLivres = ({ data, onEdit, onDelete, onDeleteSelected, onAddBooks }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);
    const [selectedItems, setSelectedItems] = useState([]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedItems(currentItems.map(item => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleSelectItem = (id) => {
        setSelectedItems(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(itemId => itemId !== id)
                : [...prevSelected, id]
        );
    };

    const handleDelete = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
            onDelete(id);
        }
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Fonction pour gérer l'importation de livres à partir d'un fichier Excel
    const handleImport = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const workbook = XLSX.read(bstr, { type: 'binary' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            // Convertir le contenu de la feuille en tableau d'objets
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Vérifier si des données ont été extraites
            if (jsonData.length === 0) {
                alert("Le fichier Excel est vide ou mal formaté.");
                return;
            }

            // Mappage des données en fonction de l'ordre des colonnes
            const booksData = jsonData.slice(1).map(row => ({
                id: row[0] || Date.now(), // Utiliser la première colonne pour l'ID ou générer un ID
                auteur: Array.isArray(row[0]) ? row[0] : (row[0] ? row[0].split(',').map(a => a.trim()) : []), // Gérer plusieurs auteurs
                titre: row[1] || "", // Titre
                soustitre: row[2] || "", // Sous-titre
                edition: row[3] || "Non spécifiée", // Édition
                cote1: row[4] || "", // Cote 1
                cote2: row[5] || "", // Cote 2
                // Traitement des descripteurs : diviser par '/' et nettoyer les espaces
                descripteurs: Array.isArray(row[6]) ? row[6] : (row[6] ? row[6].split('/').map(descriptor => descriptor.trim()).filter(desc => desc) : [])
            }));

            // Appeler la fonction pour ajouter les livres
            onAddBooks(booksData); // Assurez-vous que onAddBooks gère bien l'ajout
        };

        reader.readAsBinaryString(file);
    };

    return (
        <div className="container">
            <div className="table-title">
                <input 
                    type="file" 
                    accept=".xlsx, .xls" 
                    onChange={handleImport} 
                    style={{ display: 'none' }} 
                    id="importInput" 
                />
                <label htmlFor="importInput" className="btn btn-success btn-sm me-2">
                    <i className="fas fa-file-import"></i> Importer tous les livres
                </label>
                <Link to="/ajouter-livre" className="btn btn-success btn-sm me-2">
                    <i className="fas fa-plus"></i> Ajouter un livre
                </Link>
            </div>

            <div className="table-wrapper">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>
                                <span className="custom-checkbox">
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={selectedItems.length === currentItems.length && currentItems.length > 0}
                                    />
                                    <label></label>
                                </span>
                            </th>
                            <th>Auteur(s)</th>
                            <th>Titre</th>
                            <th>Sous-titre</th>
                            <th>Édition</th>
                            <th>Cote 1</th>
                            <th>Cote 2</th>
                            <th>Descripteurs</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <span className="custom-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(item.id)}
                                            onChange={() => handleSelectItem(item.id)}
                                        />
                                        <label></label>
                                    </span>
                                </td>
                                <td>{Array.isArray(item.auteur) ? item.auteur.join(', ') : item.auteur}</td>
                                <td>{item.titre}</td>
                                <td>{item.soustitre}</td>
                                <td>{item.edition}</td>
                                <td>{item.cote1}</td>
                                <td>{item.cote2}</td>
                                <td>{Array.isArray(item.descripteurs) ? item.descripteurs.join(', ') : item.descripteurs}</td>
                                <td>
  <Link to={`/modifier-livre/${item.id}`} className="btn btn-sm me-2" style={{ color: 'blue' }}>
    <i className="fas fa-pen"></i>
  </Link>
  <button 
    onClick={() => handleDelete(item.id)} 
    className="btn btn-sm" 
    style={{ color: 'red' }} >
    <i className="fas fa-trash-alt"></i>
  </button>
</td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                {selectedItems.length > 0 && (
                    <button className="btn btn-danger btn-sm mt-2" onClick={() => onDeleteSelected(selectedItems)}>
                        <i className="fas fa-trash-alt"></i> Supprimer les livres sélectionnés
                    </button>
                )}

                <div className="pagination justify-content-end mt-3">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => paginate(currentPage - 1)}>Précédent</button>
                        </li>
                        {[...Array(totalPages)].map((_, i) => (
                            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => paginate(currentPage + 1)}>Suivant</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TableLivres;
