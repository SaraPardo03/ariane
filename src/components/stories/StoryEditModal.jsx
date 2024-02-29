import { useState, useRef} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function StoryEditModal({story, updateStoryToBDD}) {
  const [show, setShow] = useState(false); 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return	<>
		<button
  		type="button" 
  		onClick={handleShow}
  		className="btn btn-sm btn-secondary me-2">
  		<i className="bi bi-gear me-2"></i>
  		<span>Editer</span>
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
        story={story} 
        updateStoryToBDD={updateStoryToBDD} 
        handleClose={handleClose}/>
    </Modal>
  </>
}

function EditPageForm({story, updateStoryToBDD, handleClose}){
  const [formStory, setFormStory] = useState(story);
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormStory((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    updateStoryToBDD(formStory);
    handleClose();
  };

  return <>
    <Modal.Body className={"page-edit-modal-body bg-secondary bg-opacity-10"}>
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
        <Form.Group className="mb-3 page-edit-modal"> 
          <Form.Label>Résumé de l'histoire</Form.Label>
          <Form.Control
          className="page-edit-modal-form"
          onChange={handleChange} 
          value={formStory.summary}
          name="summary"
          ref={textareaRef}
          as="textarea"/>
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

export default StoryEditModal;
