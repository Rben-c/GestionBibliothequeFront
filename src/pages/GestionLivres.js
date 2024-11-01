import React, { useState, useEffect } from 'react';
import TableLivres from '../components/TableLivres.js'; 
import bookService from '../services/livreService.js'; // Service pour gérer les livres

const GestionLivres = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Récupérer les livres depuis le service
        const fetchBooks = async () => {
            const data = await bookService.getLivres(); // Assurez-vous que cette méthode existe
            setBooks(data);
        };
        fetchBooks();
    }, []);

    const handleAddBook = async (newBook) => {
        await bookService.addLivre(newBook); // Renommez la méthode en fonction de la convention
        setBooks(await bookService.getLivres()); // Met à jour la liste des livres après ajout
    };

    const handleEditBook = async (updatedBook) => {
        await bookService.updateLivre(updatedBook); // Renommez la méthode
        setBooks(await bookService.getLivres()); // Met à jour la liste des livres après modification
    };

    const handleDeleteBook = async (id) => {
        await bookService.deleteLivre(id); // Renommez la méthode
        setBooks(await bookService.getLivres()); // Met à jour la liste des livres après suppression
    };

    const handleDeleteSelectedBooks = async (selectedIds) => {
        await Promise.all(selectedIds.map(id => bookService.deleteLivre(id))); // Renommez la méthode
        setBooks(await bookService.getLivres()); // Met à jour la liste des livres après suppression
    };

    return (
        <TableLivres
            data={books}
            firstColumnName="Titre"
            onAdd={handleAddBook}
            onEdit={handleEditBook}
            onDelete={handleDeleteBook}
            onDeleteSelected={handleDeleteSelectedBooks}
        />
    );
};

export default GestionLivres;
