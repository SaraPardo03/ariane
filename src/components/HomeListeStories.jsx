function HomeListeStories(props) {
	  return <div className="container">
    <div className="row">
      <div className="col-12">
        <div className="row p-2">
        	{
        		props.stories.length === 0 ?(<StoryAddCard addNewStoryToBDD={props.addNewStoryToBDD}/>
        		):(
        			props.stories.map((story)=> <StoryCard key={story.id} story={story}/>)
        		)
        	}
        	<StoryAddCard addNewStoryToBDD={props.addNewStoryToBDD}/>
        </div>
      </div>
    </div>
  </div>
}

function StoryCard(props) {
  return	<div key={props.story.id} id={props.story.id} className="col-sm-4 my-2">
  	<div className="card cursor-pointer">
	    <div className="card-body">
	      <h5><a href="../Story/2" className="text-decoration-none">{props.story.title}</a></h5>
	      <span className="fw-lighter fs-6 fst-italic">Modifié le: {props.story.updatedAt}</span>
	      <br/>
	      <span className="fw-lighter fs-6 fst-italic">Crée le: {props.story.createdAt}</span>
	    </div>
	    <ul className="list-group list-group-flush p-2">
		    <StoryCardInfo iconClass="bi-node-plus-fill" classColorIcon="text-primary" infoName="nœuds ouverts" info={props.story.openNode}/>
		    <StoryCardInfo iconClass="bi-node-minus-fill" classColorIcon="text-secondary" infoName="nombre de fin" info={props.story.nbEnd}/>
		    <StoryCardInfo iconClass="bi-collection" classColorIcon="" infoName="nombre de pages" info={props.story.nbPages}/>
		    <StoryCardInfo iconClass="bi-alphabet-uppercase" classColorIcon="" infoName="nombre de caractères" info={props.story.nbCharacters}/>
	    </ul>
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
			title: "Une nouvelle histoire qui commence...",
			openNode: 0,
			nbEnd: 0,
			nbPages:0,
			nbCharacters:0,
		}
		props.addNewStoryToBDD(storyToAdd);
	}
  return <div 
  className="col-sm-4 my-2 cursor-pointer"
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

export default HomeListeStories;