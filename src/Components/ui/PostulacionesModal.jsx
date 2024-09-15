import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const PostulacionModal = ({ empleo, onClose }) => {
    const [cvFile, setCvFile] = useState(null);

    const handleFileChange = (e) => {
        setCvFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!cvFile) {
            alert('Por favor, selecciona un archivo.');
            return;
        }

        const formData = new FormData();
        formData.append('cv', cvFile);
        formData.append('id_empleo', empleo.idEmpleo);

        try {
            await axios.post('http://localhost:8080/api/postulacion/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Postulación realizada con éxito');
            onClose(); // Cierra el modal después de la postulación
        } catch (error) {
            console.error('Error al enviar la postulación', error);
            alert('Error al enviar la postulación');
        }
    };

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Postularse para {empleo.titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Selecciona tu CV (PDF)</Form.Label>
                        <Form.Control type="file" accept=".pdf" onChange={handleFileChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Enviar</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PostulacionModal;