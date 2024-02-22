function Story() {
	return <div className="col">
		<div className="story-container scrollbar-snap-y">
			<PagesListHorizontal/>
			<PagesListHorizontal/>
		</div>
	</div>;
}

export default Story;

export function PagesListHorizontal() {
	return <>
		<div className="pages-list-horizontal-container bg-light d-flex flex-row flex-nowrap scrollbar-snap-section-y scrollbar-snap-x">
			<PageCard/>
			<PageCard/>
			<PageCard/>
		</div>
	</>;
}

export function PageCard(){
	return <div className="col-11 mx-1 page-container scrollbar-snap-section-x">
		<div className="card-page-container">
    	<div className="card card-page rounded-0 shadow-sm bg-white">
    		<PageCardNavBar/>
    		<div className="page-body-container bg-dark bg-opacity-10">
	        <div className="card bg-light m-2">
	          <PageTags/>
	          <PageText/>
	          <PageListChoices/>
	        </div>
	      </div>
	      <PageCardNavBarFooter/>
    	</div>
    </div>
	</div>

}

export function PageCardNavBar(){
	return <div className="navbar bg-light p-2">
	  <div className="container-fluid">
	    <span>Chapitre : scéne</span>
	    <div className="page-body-container bg-dark bg-opacity-10">
	    </div>
	    <button type="button" className="btn btn-sm btn-light"><i className="bi bi-three-dots"></i></button>
	  </div>
	</div>
}

export function PageTags(){
	return <div className="card-body">
		<span className="badge bg-secondary m-1"><i className="bi bi-x"></i>Secondary</span>
		<span className="badge bg-secondary m-1"><i className="bi bi-x"></i>Secondary</span>
		<span className="badge bg-secondary m-1"><i className="bi bi-x"></i>Secondary</span>
	</div>
}

export function PageText(){
	return <div className="card-body">
		<h5 className="card-title">Titre de la page</h5>
		<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
		<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
	</div>
}

export function PageListChoices(){
	return <div className="card bg-light rounded-0 border-0">
	  <ul className="list-group list-group-flush">
	  	<PageChoice/>
	  	<PageChoice/>
	  </ul>
	</div>
}

export function PageChoice(){
	return <>
		<li className="list-group-item d-flex justify-content-between align-items-center bg-light rounded-0 border-1">
      Choix un
      <button type="button" className="btn btn-sm btn-light"><i className="bi bi-three-dots-vertical"></i></button>
    </li>
    <PageChoiceTagsToHave/>
    <PageChoiceTagsNotToHave/>
	</>
}

export function PageChoiceTagsToHave(){
	return <li className="list-group-item list-group-item-success rounded-0 border-0">
    <span className="badge bg-secondary bg-success m-1"><i className="bi bi-x"></i>Secondary</span>
    <span className="badge bg-secondary bg-success m-1"><i className="bi bi-x"></i>Secondary</span>
    <span className="badge bg-secondary bg-success m-1"><i className="bi bi-x"></i>Secondary</span>
  </li>
}

export function PageChoiceTagsNotToHave(){
	return	<li className="list-group-item list-group-item-danger rounded-0 border-0">
    <span className="badge bg-secondary bg-danger m-1"><i className="bi bi-x"></i>Secondary</span>
    <span className="badge bg-secondary bg-danger m-1"><i className="bi bi-x"></i>Secondary</span>
    <span className="badge bg-secondary bg-danger m-1"><i className="bi bi-x"></i>Secondary</span>
  </li>
}


export function PageCardNavBarFooter(){
	return <div className="navbar justify-content-end p-2">
		<button type="button" className="btn btn-primary btn-sm"><i className="bi bi-plus">Ajouter un choix</i></button>
	</div>
}


