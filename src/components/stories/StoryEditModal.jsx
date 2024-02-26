import Modal from 'react-modal';
import { useState} from "react";

Modal.setAppElement('#root');

function StoryEditModal(props) {
	const customStyles = {
	  content: {
	  	inset:"20px",
	  	padding:"0px",
	  	border:"none",
	  	marginTop:"40px",
	  },
	};

	return	<Modal
	style={customStyles}
	isOpen={props.isOpen}>
		<div className="story-editModal bg-secondary bg-opacity-10 border border-secondar rounded-3 p-3">
			<div className="navbar justify-content-end p-2">
				<button 
					type="button" 
					onClick={props.handleCloseModal} 
					className="btn btn-secondary btn-sm rounded-circle"><i className="bi bi-x-lg"></i>
				</button>
			</div>
			<div className="story-editModal">
				{props.story && <EditStoryForm updateStoryToBDD={props.updateStoryToBDD} story={props.story}/>}
			</div>
		</div>
	</Modal>
}

function EditStoryForm({story, updateStoryToBDD}){
	console.log("render", story);
	const [formStory, setFormStory] = useState(story);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormStory((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e)=>{
  	updateStoryToBDD(formStory);
  };

  return <form onSubmit={handleSubmit} className="story-form">
	  <div className="mb-3">
	    <input type="text" name="title" className="form-control" placeholder="Titre de l'histoire" value={formStory.title} onChange={handleChange} required/>
	  </div>
	  <div className="mb-3">
		    <textarea className="form-control story-summary" name="summary" placeholder="Résumé de l'histoire" placeholder="Résumé" value={formStory.summary} onChange={handleChange}></textarea>
	  </div>
	  <div className="navbar p-2">
			<button 
	  		type="cancel" 
	  		className="btn btn-sm btn-danger">
	  		<span>Annuler</span>
	  	</button>
	  	<button 
	  		type="submit" 
	  		className="btn btn-sm btn-primary">
	  		<span>Enregistrer</span>
	  	</button>
		</div>
	</form>


}

export default StoryEditModal;
