import { useState, useRef, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function StoryCreateModal({ addNewStoryToBDD }) {
  const [show, setShow] = useState(false);
  const [formStory, setFormStory] = useState({ title: '', cover: null, summary: '' });
  const textareaRef = useRef(null);

  const handleShow = () => setShow(true);
  const handleCloseModal = () => {
    setShow(false);
    setFormStory({ title: '', cover: null, summary: '' }); // Réinitialiser les données du formulaire après la fermeture
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormStory((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setFormStory((prevData) => ({
        ...prevData,
        cover: base64
      }));
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewStoryToBDD(formStory)
    handleCloseModal();
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [formStory.summary]);

  return (
    <>
      <button 	
      type="button" 
      className="d-none d-md-inline btn btn-sm btn-primary"
      onClick={handleShow}>
        <i className="bi bi-plus"></i>
        <span> Nouvelle histoire </span>
      </button>
      <Modal
        contentClassName="story-edit-modal"
        size="lg"
        fullscreen="lg-down"
        show={show}
        scrollable
        onHide={handleCloseModal}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Créer une nouvelle histoire</Modal.Title>
        </Modal.Header>
        <Modal.Body className="page-edit-modal-body bg-secondary bg-opacity-10">
          <Form className="page-edit-modal">
            <Form.Group className="mb-3">
              <Form.Label>Titre de l'histoire</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ma super histoire"
                value={formStory.title}
                name="title"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image de la première de couverture</Form.Label>
              <Form.Control
                type="file"
                name="cover"
                onChange={handleCoverChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 page-edit-modal">
              <Form.Label>Résumé de l'histoire</Form.Label>
              <Form.Control
                className="auto-resizing-textarea"
                onChange={handleChange}
                value={formStory.summary}
                name="summary"
                ref={textareaRef}
                as="textarea"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-secondary bg-opacity-10">
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} variant="primary">
            Créer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StoryCreateModal;