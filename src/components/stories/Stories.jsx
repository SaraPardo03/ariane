import Story from '../../models/Story';
import { API_URL } from '../../configs/configBDD';
import {useNavigate} from 'react-router-dom';
import { useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import StoryEditModal from "./StoryEditModal.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal.jsx";

function Stories(props) {
	return <div className="row p-md-2 p-sm-1">	
		{props.stories.length > 0 &&
			props.stories.map((story)=> <StoryCard key={story.id} story={story}  updateStoryToBDD={props.updateStoryToBDD}  deleteStoryToBDD={props.deleteStoryToBDD} nbStories={props.stories.length}/>)
		}
	</div>
}

function StoryCard(props) {
	const [formStory, setFormStory] = useState(props.story);
	const [previousStory, setPreviousStory] = useState(props.story);
	const navigate = useNavigate();
	const [modalShow, setModalShow] = useState(false);

	useEffect(() => {
        const isModified = formStory.title !== previousStory.title ||
            formStory.summary !== previousStory.summary;

        if (isModified) {
			const updatedStory = { ...formStory};
            props.updateStoryToBDD(updatedStory);
            setPreviousStory(updatedStory);  // Mettre à jour l'histoire d'origine après la mise à jour
        }
    }, [formStory, previousStory, props]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormStory((prevData) => ({
		  ...prevData,
		  [name]: value
		}));
	};



	const handleClickGoToStory = e => {
		navigate(`/story/` + props.story.id);
	};

	const handleClickRemoveStory = e => {
		props.deleteStoryToBDD(props.story);
		setModalShow(false)
	};

	const updateDate = new Date(props.story.updatedAt);
	const createDate = new Date(props.story.createdAt);
	
	return <div className='col-lg-6 mb-2 p-2'>
		<div className='card rounded-1'>
			<div className='card-body p-2 m-0'>
				<div className='row text-end'>
					<StoryDropDownMenu story={props.story}/>
				</div>
				<div className='row'>
					<div className={`${formStory.cover === null ? "d-none" : ""} col-md-4 col-sm-12 story-card-top text-center`}>
						<img src={`${API_URL}${formStory.cover}`} className="img-fluid" alt="story" />
					</div>
					<div className={`${formStory.cover === null ? "col-md-12" : "col-md-8 col-sm-12"} position-relative`}>
						<Form>
							<Form.Control
							className='fs-5 story-card-title border-0 p-0 m-0'
							type="text"
							placeholder="Titre"
							value={formStory.title}
							name="title"
							onChange={handleChange}
							/>
							<span className="d-block fw-lighter fs-6 fst-italic">Modifié le: {`${updateDate.getDate()}.${updateDate.getMonth()+1}.${updateDate.getFullYear()}`}</span>
							<span className="fd-bloc fw-lighter fs-6 fst-italic">Crée le: {`${createDate.getDate()}.${createDate.getMonth()+1}.${createDate.getFullYear()}`}</span>
							<Form.Control
							className="story-card-summary fs-6 border-0 p-0 m-0"
							onChange={handleChange} 
							value={formStory.summary}
							name="summary"
							as="textarea"/>	
						</Form>
						<div className='container p-0 text-end position-absolute bottom-0 end-0 p-0'>
							<StoryEditModal story={props.story} updateStoryToBDD={props.updateStoryToBDD}/>
						</div>
					</div>
				</div>
			</div>
			<div className='card-body p-2 m-0'>
				<div className='row p-0 m-0'>
					<StoryCardInfo iconClass="bi-node-plus-fill" classColorIcon="text-danger opacity-75" infoName="nœuds ouverts" info={props.story.totalOpenNode} costumPadding="1"/>
					<StoryCardInfo iconClass="bi-node-minus-fill" classColorIcon="text-success opacity-75" infoName="nombre de fin" info={props.story.totalEnd} costumPadding="0"/>
					<StoryCardInfo iconClass="bi-collection" classColorIcon="" infoName="nombre de pages" info={props.story.totalPages} costumPadding="1"/>
					<StoryCardInfo iconClass="bi-alphabet-uppercase" classColorIcon="text-secondary" infoName="nombre de caractères" info={props.story.totalCharacters} costumPadding="0"/>
				</div>
			</div>
			<div className="card-body p-2 text-end">
				<Button className="btn btn-sm me-2" variant="danger" onClick={() => setModalShow(true)}>
					<i className="bi bi-trash3 me-2"></i>
					<span>Supprimer</span>
				</Button>
				<DeleteConfirmationModal 
					isOpen={modalShow}
					onHide={() => setModalShow(false)}
					onDelete={handleClickRemoveStory}
				/>
				<button 
					type="button" 
					onClick={handleClickGoToStory}
					className="btn btn-sm btn-primary">
					<i className="bi bi-pencil me-2"></i>
					<span>Rédaction</span>
				</button>
			</div>
		</div>
	</div>
}

function StoryCardInfo(props){
	return <div className={`col-md-6 mb-1 p-0 pe-${props.costumPadding}`}>
		<div className='container-fluid'>
			<div className='row bg-gray-200'>
				<div className='col-2'>
					<i className={`bi ${props.iconClass} fs-2 ${props.classColorIcon}`}></i>
				</div>
				<div className='col-10 '>
					<div className='container text-end'>
						<span className="fs-8">{props.info}</span>
					</div>
					<div className='container text-end'>
						<span className="fs-6 fw-lighter">{props.infoName}</span>
					</div>
				</div>	
			</div>
		</div>
	</div>
}

function StoryDropDownMenu({story}){
	const [dropdownOpen, setDropdownOpen] = useState(false);

	// Add event listener to detect clicks outside the dropdown
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownOpen]);
	
	// Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

	// Close dropdown when clicking outside
  const handleClickOutside = event => {
    if (dropdownOpen && !event.target.closest('.dropdown')) {
      setDropdownOpen(false);
    }
  };

	const handleClickPrintPdfStory = e =>{
		e.preventDefault();
		story.printPdfStory();
	}
	const handleClickUploadStory = e =>{
		e.preventDefault();
		story.uploadStory();
	}

	return <div className={`dropdown`}>
		<button 
		onClick={toggleDropdown}
		className="btn btn-light border-0 rounded-circle position-relative" 
		type="button">
			<i className="bi bi-three-dots-vertical"></i>
		</button>
		<ul
			className={`story-card-dropdown-menu dropdown-menu position-absolute ${dropdownOpen ? 'show' : ''}`}
			aria-labelledby="dropdownMenuButton1"
		>	
			<li><h4 className="dropdown-header border-bottom">Télécharger</h4></li>
			<li><a className="dropdown-item" onClick={handleClickPrintPdfStory} href="#">PDF</a></li>
			<li><a className="dropdown-item" onClick={handleClickUploadStory} href="#">Sauvegarde local</a></li>
		</ul>
	</div>
}

function StoryAddCard({addNewStoryToBDD, nbStories}) {
	const handleClickNewStory = e => {
		const newStory = {
			title: "Titre",
		}
		addNewStoryToBDD(newStory);
	}
  return <div 
  className={nbStories < 3 ? "my-2 col-md-6 cursor-pointer" : "my-2 col-md-6 col-lg-4 cursor-pointer"}
  onClick={handleClickNewStory}>
  	<div className="card">
	    <div className="card-body border-bottom">
	      <h5>Ajouter</h5>
	    </div>
	    <div className="card-body">
	      <p className="card-title">Créer une nouvelle hitoire</p>
	    </div>
	  </div>
	</div>
}

export default Stories;