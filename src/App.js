// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GestionEtudiants from './pages/GestionEtudiants';
import GestionPersonnel from './pages/GestionPersonnel';
import GestionAdmin from './pages/GestionAdmin';
import GestionBibliothecaires from './pages/GestionBibliothecaires';
import GestionLivre from './pages/GestionLivres';
import Login from './pages/LoginPage'; 
import Navbar from './components/Navbar';
import Header from './components/Header';
import AjouterLivre from './components/AjouterLivre';
import EditLivre from './components/EditLivre';
import SupprimerLivre from './components/SupprimerLivre';
import ParentComponent from './components/ParentComponent'; // Importation du ParentComponent

const App = () => {
  // Fonction pour supprimer un livre
  const handleDelete = (id) => {
    console.log("Suppression du livre avec l'id :", id);
    // Ajoutez ici la logique de suppression
  };

  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/gestion-personnel" element={<GestionPersonnel />} />
        <Route path="/gestion-etudiants" element={<GestionEtudiants />} />
        <Route path="/gestion-bibliothecaires" element={<GestionBibliothecaires />} />
        <Route path="/gestion-Admin" element={<GestionAdmin />} />
        {/* Remplacez GestionLivre par ParentComponent pour gérer les livres */}
        <Route path="/gestion-livre" element={<ParentComponent />} />
        <Route path="/ajouter-livre" element={<AjouterLivre onClose={() => {}} />} />
        <Route path="/ajouter-livre" element={<ParentComponent />} /> {/* Changer pour le bon chemin */}
        <Route path="/modifier-livre/:id" element={<EditLivre />} />
        <Route
          path="/supprimer-livre/:id"
          element={<SupprimerLivre onConfirm={handleDelete} />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
