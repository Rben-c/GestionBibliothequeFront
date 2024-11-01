const getLivres = () => {
    const livres = localStorage.getItem('livres');
    return livres ? JSON.parse(livres) : [];
};

const addLivre = (newBook) => {
    const livres = getLivres();
    const newId = livres.length > 0 ? livres[livres.length - 1].id + 1 : 1;
    const livreAvecId = { ...newBook, id: newId };
    livres.push(livreAvecId);
    localStorage.setItem('livres', JSON.stringify(livres));
    console.log(`Livre ajouté: ${JSON.stringify(livreAvecId)}`);
};

const updateLivre = (updatedBook) => {
    let livres = getLivres();
    livres = livres.map((livre) => (livre.id === updatedBook.id ? updatedBook : livre));
    localStorage.setItem('livres', JSON.stringify(livres));
    console.log(`Livre mis à jour: ${JSON.stringify(updatedBook)}`);
};

const deleteLivre = (id) => {
    let livres = getLivres();
    livres = livres.filter((livre) => livre.id !== id);
    localStorage.setItem('livres', JSON.stringify(livres));
    console.log(`Livre avec id ${id} supprimé`);
};

export default {
    getLivres,
    addLivre,
    updateLivre,
    deleteLivre,
};
