import { useState, useRef, useEffect} from "react";
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
    contentClassName="story-edit-modal"
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
  const [formStory, setFormStory] = useState({ ...story, cover: null });
  const textareaRef = useRef(null);

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
    console.log("cover", formStory.cover);
    e.preventDefault();
    updateStoryToBDD(formStory);
    handleClose();
  };

  useEffect(() => {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
  }, [formStory.summary]);

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
