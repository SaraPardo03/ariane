import { useState,useRef, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Choice from "../../models/Choice";

function ChoiceEditModal({page, addNewChoiceToBDD}) {
  const [show, setShow] = useState(false); 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return <>
      <button 
      type="button" 
      onClick={handleShow} 
      className="btn btn-primary btn-sm ms-2">
        <i className="bi bi-pencil">Ajouter un choix</i>
      </button>

      <Modal
      contentClassName="choice-edit-modal"
      size="lg" 
      fullscreen="lg-down"
      show={show} 
      scrollable
      onHide={handleClose}
      backdrop="static">
        <Modal.Header className={"bg-secondary bg-opacity-10 border-0"} closeButton>
        </Modal.Header>
          <EditChoiceForm 
          page={page} 
          addNewChoiceToBDD={addNewChoiceToBDD} 
          handleClose={handleClose}/>
      </Modal>
    </>
}

function EditChoiceForm({page, addNewChoiceToBDD, handleClose}){
  const [formChoice, setFormChoice] = useState({ title: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormChoice((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    const newChoice = { ...formChoice, pageId: page.id };
    addNewChoiceToBDD(newChoice);
    handleClose();
  };

  /*
  const handleSubmit = (e)=>{
    const newChoice = {...formChoice, pageId:page.id};
    addNewChoiceToBDD(choice);
    console.log("handleSubmit", formChoice);
    //addNewChoiceToBDD(formChoice);
    //handleClose();
  };*/

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