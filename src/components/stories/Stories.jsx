import {useNavigation, useNavigate} from 'react-router-dom';
import { useState} from "react";
import Button from 'react-bootstrap/Button';
import StoryEditModal from "./StoryEditModal.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal.jsx";
import storyImg from '../../assets/img/story.jpg';
import storyImg2 from '../../assets/img/story2.jpg';

function Stories(props) {
	return <div className="row p-md-2 p-sm-1">	
		{props.stories.length > 0 &&
			props.stories.map((story)=> <StoryCard key={story.id} story={story}  updateStoryToBDD={props.updateStoryToBDD}  deleteStoryToBDD={props.deleteStoryToBDD} nbStories={props.stories.length}/>)
		}
	</div>
}

function StoryCard(props) {
	const imgs = [storyImg, storyImg2];
	const navigate = useNavigate();
	const [modalShow, setModalShow] = useState(false);
	const handleClickGoToStory = e => {
		navigate(`/story/` + props.story.id);
	};

	const handleClickRemoveStory = e => {
		props.deleteStoryToBDD(props.story);
	};

	const updateDate = new Date(props.story.updatedAt);
	const createDate = new Date(props.story.createdAt);

	return <div className='col-lg-6 mb-2 p-2'>
		<div className='card rounded-1'>
			<div className='card-body p-2 m-0'>
				<div className='row'>
					<div className='col-md-4 col-sm-12 story-card-top text-center'>
						<img src={imgs[Math.round(Math.random())]} className="img-fluid"></img>
					</div>
					<div className='col-md-8 col-sm-12 position-relative'>
						<span className="d-block fs-5">{props.story.title}</span>
						<span className="d-block fw-lighter fs-6 fst-italic">Modifié le: {`${updateDate.getDate()}.${updateDate.getMonth()+1}.${updateDate.getFullYear()}`}</span>
						<span className="fd-bloc fw-lighter fs-6 fst-italic">Crée le: {`${createDate.getDate()}.${createDate.getMonth()+1}.${createDate.getFullYear()}`}</span>
						<p className='fs-6 pb-4'>{props.story.summary}</p>
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