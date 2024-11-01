// components/SupprimerLivre.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SupprimerLivre = ({ show, onConfirm, onCancel, livre }) => {
    return (
        <Modal show={show} onHide={onCancel} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation de suppression</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Êtes-vous sûr de vouloir supprimer le livre "{livre.titre}" ?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Annuler
                </Button>
                <Button variant="danger" onClick={() => onConfirm(livre.id)}>
                    Supprimer
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SupprimerLivre;
