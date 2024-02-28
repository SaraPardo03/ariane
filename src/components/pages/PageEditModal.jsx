import { useState,useRef, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function PageEditModal({page, choices, updatePageToBDD}) {
  const [show, setShow] = useState(false); 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button 
      type="button" 
      onClick={handleShow} 
      className="btn btn-secondary btn-sm">
        <i className="bi bi-pencil">Editer</i>
      </button>

      <Modal
      contentClassName="page-edit-modal"
      size="lg" 
      fullscreen="lg-down"
      show={show} 
      scrollable
      onHide={handleClose}
      backdrop="static">
        <Modal.Header className={"bg-secondary bg-opacity-10 border-0"} closeButton>
        </Modal.Header>
          <EditPageForm 
          page={page} 
          choices={choices} 
          updatePageToBDD={updatePageToBDD} 
          page={page} 
          handleClose={handleClose}/>
      </Modal>
    </>
  );
}

function EditPageForm({page, choices, updatePageToBDD, handleClose}){
  const [formPage, setFormPage] = useState(page);
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormPage((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormPage((prevData) => ({
      ...prevData,
      [name]: checked
    }));
  };

  const handleSubmit = (e)=>{
    updatePageToBDD(formPage);
    handleClose();
  };

  // Determine if the checkbox should be disabled based on the presence of choices on the page
  const isCheckboxDisabled = choices.length > 0;

  return <>
    <Modal.Body className={"page-edit-modal-body bg-secondary bg-opacity-10"}>
      <Form className="page-edit-modal">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Titre"
            value={formPage.title}
            name="title"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 page-edit-modal"> 
          <Form.Control
          className="page-edit-modal-form"
          onChange={handleChange} 
          value={formPage.text}
          name="text"
          ref={textareaRef}
          as="textarea"/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check // prettier-ignore
            type="switch"
            name="end"
            disabled={isCheckboxDisabled} 
            id={"checkboxEditPage"+page.id}
            checked={formPage.end}
            onChange={handleCheckboxChange}
            label="Fin"
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

export default PageEditModal;