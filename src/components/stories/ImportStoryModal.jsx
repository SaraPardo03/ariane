import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ImportStoryModal({ importStory }) {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async (e) => {
    e.preventDefault();
    if (file) {
      await importStory(file);
      handleClose();
    }
  };

  return (
    <>
      <a className="dropdown-item" onClick={handleShow} href="#">Importer une sauvegarde</a>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Importer une sauvegarde</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Choisissez un fichier</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleImport}>
            Importer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ImportStoryModal;
