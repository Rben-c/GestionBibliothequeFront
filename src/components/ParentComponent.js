// components/ParentComponent.js
import React, { useState, useEffect } from 'react';
import TableLivres from './TableLivres';

const ParentComponent = () => {
    const [livres, setLivres] = useState(() => {
        // Récupérer les livres stockés dans localStorage
        const savedLivres = localStorage.getItem('livres');
        return savedLivres ? JSON.parse(savedLivres) : []; // Si aucun livre n'est trouvé, initialiser à un tableau vide
    });

    // Mettre à jour localStorage à chaque changement de livres
    useEffect(() => {
        localStorage.setItem('livres', JSON.stringify(livres));
    }, [livres]);

    // Fonction pour ajouter des livres à partir du fichier importé
    const onAddBooks = (newBooks) => {
        setLivres(prevLivres => [...prevLivres, ...newBooks]);
        alert(`${newBooks.length} livres ajoutés avec succès !`); // Message de confirmation
    };

    const handleEdit = (id) => {
        // Gérer la logique d'édition
    };

    const handleDelete = (id) => {
        setLivres(prevLivres => prevLivres.filter(livre => livre.id !== id));
    };

    const handleDeleteSelected = (selectedIds) => {
        setLivres(prevLivres => prevLivres.filter(livre => !selectedIds.includes(livre.id)));
        alert(`${selectedIds.length} livres supprimés avec succès !`); // Message de confirmation
    };

    return (
        <div>
            <h2>Gestion des Livres</h2>
            <TableLivres 
                data={livres} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
                onDeleteSelected={handleDeleteSelected} 
                          onAddBooks={onAddBooks} 
            />
        </div>
    );
};

export default ParentComponent;
