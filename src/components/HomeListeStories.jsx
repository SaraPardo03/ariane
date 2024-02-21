function HomeListeStories() {
	  return <div className="container">
    <div className="row">
      <div className="col-12">
        <div className="row p-2">
        	<StoryCard />
        	<StoryCard />
        	<StoryCard />
        	<StoryCard />
        	<StoryAddCard />
        </div>
      </div>
    </div>
  </div>
}

function StoryCard() {
  return	<a href="../Story/2" className="text-decoration-none"><div className="col-sm-4 my-2">
  	<div className="card">
	    <div className="card-body">
	      <h5>Le super titre de mon histoire</h5>
	      <span className="fw-lighter fs-6 fst-italic">modifié le : 13.02.2014</span>
	    </div>
	    <ul className="list-group list-group-flush p-2">
		    <StoryCardInfo/>
		    <StoryCardInfo/>
		    <StoryCardInfo/>
	    </ul>
	  </div>
	</div></a>
}

function StoryCardInfo(){
	return	<li className="px-2 py-0 my-1 list-group-item d-flex justify-content-between align-items-center bg-light rounded-0 border-1">
		<i class="bi bi-node-plus-fill fs-1 text-primary"></i>
		<div className="align-items-center">
			<div className="row align-items-end">
				<div className="col text-end"><span className="fs-3">13</span></div>
			</div>
			<div className="row align-items-end">
				<div className="col text-end"><span className="fs-6 text-end">nœuds ouverts</span></div>
			</div>
		</div>
  </li>
}

function StoryAddCard() {
  return <div className="col-sm-4">
  	<div className="card">
  	<div className="card-header">
	      <h2 className="card-title">Ajouter</h2>
	    </div>
	    <div className="card-body">
	      <p className="card-title">Créer une nouvelle hitoire</p>
	    </div>
	  </div>
	</div>
}

export default HomeListeStories;