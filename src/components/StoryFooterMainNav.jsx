import {useNavigation } from 'react-router-dom'

function StoryFooterMainNav() {
	const { state } = useNavigation();

	return <nav className="navbar shadow-sm bg-light fixed-bottom p-1">
	  <form className="container-fluid">
	  	<button type="button" className="btn btn-light px-1 py-0 m-0 text-center border-0">
	  			<i className="fs-3 bi bi-book-half"></i>
	  			<div className="story-footer-button-text">Édition</div>
	  	</button>
	  	<button type="button" className="btn btn-light px-1 py-0 m-0 text-center border-0">
	  			<i className="fs-3 bi bi-diagram-3"></i>
	  			<div className="story-footer-button-text">Carte</div>
	  	</button>
	  	<button type="button" className="btn btn-light px-1 py-0 m-0 text-center border-0">
	  			<i className="fs-3 bi bi-list-ol"></i>
	  			<div className="story-footer-button-text">Chapitres</div>
	  	</button>
	  	<button type="button" className="btn btn-light px-1 py-0 m-0 text-center border-0">
	  			<i className="fs-3 bi bi-images"></i>
	  			<div className="story-footer-button-text">Scénes</div>
	  	</button>
	  	<button type="button" className="btn btn-light px-1 py-0 m-0 text-center border-0">
	  			<i className="fs-3 bi bi-stickies"></i>
	  			<div className="story-footer-button-text">Notes</div>
	  	</button>
	  </form>
	</nav>;
}

export default StoryFooterMainNav;
