import {useNavigation, useNavigate} from 'react-router-dom';
import { useState} from "react";

function Stories(props) {
	  return <div className="container">
    <div className="row">
      <div className="col-12">
        <div className="row p-2">
        	{props.stories.length > 0 &&
        		props.stories.map((story)=> <StoryCard key={story.id} story={story}  deleteStoryToBDD={props.deleteStoryToBDD} handleOpenModal={props.handleOpenModal}  nbStories={props.stories.length}/>)
      		}
      		<StoryAddCard addNewStoryToBDD={props.addNewStoryToBDD}  nbStories={props.stories.length}/>
        </div>
      </div>
    </div>
  </div>
}

function StoryCard(props) {
	const navigate = useNavigate();

	const handleClickGoToStory = e => {
		navigate(`/story/` + props.story.id);
	};

	const handleClickStoryEditModalOpen = e => {
		props.handleOpenModal(props.story);
	};

	const handleClickRemoveStory = e => {
		console.log("handleClickRemoveStory", props.story);
		props.deleteStoryToBDD(props.story);
	};


	const updateDate = new Date(props.story.updatedAt);
	const createDate = new Date(props.story.createdAt);

  return	<div 
  key={props.story.id} 
  id={props.story.id} 
  className={props.nbStories < 3 ? "my-2 col-md-6" : "my-2 col-md-6 col-lg-4"}>
  	<div className="card">
	    <div className="card-body">
	    	<div>
	    		<button
	    			onClick={handleClickRemoveStory}
			  		type="button" 
			  		className="btn btn-sm btn-secondary rounded-circle me-2">
			  		<i className="bi bi-trash3 "></i>
			  	</button>
		      <span className="fs-5">{props.story.title}</span>
		    </div>
	      <span className="fw-lighter fs-6 fst-italic">Modifié le: {`${updateDate.getDate()}.${updateDate.getMonth()+1}.${updateDate.getFullYear()}`}</span>
	      <br/>
	      <span className="fw-lighter fs-6 fst-italic">Crée le: {`${createDate.getDate()}.${createDate.getMonth()+1}.${createDate.getFullYear()}`}</span>
	    </div>
	    <ul className="list-group list-group-flush p-2">
		    <StoryCardInfo iconClass="bi-node-plus-fill" classColorIcon="text-danger opacity-75" infoName="nœuds ouverts" info={props.story.openNode}/>
		    <StoryCardInfo iconClass="bi-node-minus-fill" classColorIcon="text-success opacity-75" infoName="nombre de fin" info={props.story.nbEnd}/>
		    <StoryCardInfo iconClass="bi-collection" classColorIcon="" infoName="nombre de pages" info={props.story.nbPages}/>
		    <StoryCardInfo iconClass="bi-alphabet-uppercase" classColorIcon="text-secondary" infoName="nombre de caractères" info={props.story.nbCharacters}/>
	    </ul>
	    <div className="navbar p-2">
		    <button 
		  		type="button" 
		  		onClick={handleClickStoryEditModalOpen}
		  		className="btn btn-sm btn-secondary">
		  		<i className="bi bi-gear me-2"></i>
		  		<span>Configurer</span>
		  	</button>
		  	<button 
		  		type="button" 
		  		onClick={handleClickGoToStory}
		  		className="btn btn-sm btn-primary">
		  		<i className="bi bi-pencil me-2"></i>
		  		<span>Editer</span>
		  	</button>
			</div>
	  </div>
	</div>
}

function StoryCardInfo(props){
	return	<li className="px-2 py-0 my-1 list-group-item d-flex justify-content-between align-items-center bg-light rounded-0 border-1">
		<i className={`bi ${props.iconClass} fs-2 ${props.classColorIcon}`}></i>
		<div className="align-items-center">
			<div className="row align-items-end">
				<div className="col text-end"><span className="fs-4">{props.info}</span></div>
			</div>
			<div className="row align-items-end">
				<div className="col text-end"><span className="fs-6 text-end fw-lighter">{props.infoName}</span></div>
			</div>
		</div>
  </li>
}

function StoryAddCard(props) {
	const handleClickNewStory = e => {
		const storyToAdd = {
			title: "Titre",
			openNode: 0,
			nbEnd: 0,
			nbPages:0,
			nbCharacters:0,
		}
		props.addNewStoryToBDD(storyToAdd);
	}
  return <div 
  className={props.nbStories < 3 ? "my-2 col-md-6 cursor-pointer" : "my-2 col-md-6 col-lg-4 cursor-pointer"}
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