import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteConfirmationModal({isOpen, onHide, onDelete}) {
  return  <Modal
  aria-labelledby="contained-modal-title-vcenter"
  centered
  size="lg" 
  show={isOpen}>
    <Modal.Header className={"bg-secondary bg-opacity-10"}>
      <Modal.Title id="contained-modal-title-vcenter">
        Confirmation de suppression
      </Modal.Title>
      <Button className="rounded-circle" size="sm" variant="secondary" onClick={onHide}>
        <i className="bi bi-x-lg"></i>
      </Button>
    </Modal.Header>
    <Modal.Body
    className={"bg-secondary bg-opacity-10"}>
      <p>
        Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
      </p>
    </Modal.Body>
    <Modal.Footer
    className={"bg-secondary bg-opacity-10"}>
      <Button size="sm" onClick={onHide}>Annuler</Button>
      <Button size="sm" variant="danger" onClick={onDelete}>Supprimer</Button>
    </Modal.Footer>
  </Modal>
}

export default DeleteConfirmationModal;