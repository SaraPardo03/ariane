import { useState,useRef, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Choice from "../../models/Choice";

function ChoiceEditModal({page, addNewChoiceToBDD, choice, isOpen, setIsModalOpen, edit}) {
  const [formChoice, setFormChoice] = useState({ title: '', sendToPageId: '' });
  const handleClose = () => {
    setFormChoice({ title: '', sendToPageId: '' });
    setIsModalOpen(false);
  }
  const handleShow = () => setIsModalOpen(true);
  

  useEffect(() => {
    if (choice) {
      setFormChoice(choice); // Mettre à jour le formulaire avec les données du choix existant
    } else {
      setFormChoice({ title: '', sendToPageId: '' }); // Réinitialiser le formulaire s'il n'y a pas de choix
    }
  }, [choice]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormChoice((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newChoice = new Choice({ ...formChoice, pageId: page.id });
    if(choice){
      await newChoice.save(formChoice.id);
    }else{
      addNewChoiceToBDD(newChoice);
    }
      handleClose();
  };


  return <>
      <button
      hidden = {edit}
      type="button" 
      onClick={handleShow} 
      className="btn btn-primary btn-sm ms-2">
        <i className="bi bi-pencil">Ajouter un choix</i>
      </button>

      <Modal
      contentClassName="choice-edit-modal"
      size="lg" 
      fullscreen="lg-down"
      show={isOpen}
      scrollable
      onHide={handleClose}
      backdrop="static">
        <Modal.Header className={"bg-secondary bg-opacity-10 border-0"} closeButton>
        </Modal.Header>
        <EditChoiceForm 
          page={page} 
          choice={choice}
          handleClose={handleClose}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formChoice={formChoice}
        />
      </Modal>
    </>
}

function EditChoiceForm({page, handleClose, handleChange, handleSubmit, formChoice }){
  return <>
    <Modal.Body className={"choice-edit-modal-body bg-secondary bg-opacity-10"}>
      <Form className="choice-edit-modal">
        <Form.Group className="mb-3">
          <Form.Label>Choix</Form.Label>
          <Form.Control
            type="text"
            placeholder="Choix"
            value={formChoice.title}
            name="title"
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer className={"bg-secondary bg-opacity-10"} >
      <Button className={"btn btn-sm"} variant="danger" onClick={handleClose}>
        Annuler
      </Button>
       <Button 
        onClick={handleSubmit}
        className={"btn btn-sm"} 
        variant="primary">
          Sauvegarder
        </Button>
    </Modal.Footer>
  </>

}

export default ChoiceEditModal;