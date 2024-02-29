import { useNavigation, NavLink, useParams } from 'react-router-dom';


function PagesFooterMainNav() {
	const { state } = useNavigation();
	const params = useParams();

	return <nav id="pages-footer-main-nav" className="navbar shadow-sm bg-light fixed-bottom p-1">
    <form className="container-fluid">
      <NavLink
        to={`/story/${params.id}`}
        end
        className="btn btn-light px-1 py-0 m-0 text-center border-0"
        activeclassname="active">
        <i className="fs-3 bi bi-book-half"></i>
        <div className="story-footer-button-text">Édition</div>
      </NavLink>
      <NavLink
        to={`/story/${params.id}/map`}
        className="btn btn-light px-1 py-0 m-0 text-center border-0"
        activeclassname="active">
        <i className="fs-3 bi bi-diagram-3"></i>
        <div className="story-footer-button-text">Carte</div>
      </NavLink>
      <NavLink
        to={`/story/${params.id}/chapters`}
        className="btn btn-light px-1 py-0 m-0 text-center border-0"
        activeclassname="active">
        <i className="fs-3 bi bi-list-ol"></i>
        <div className="story-footer-button-text">Chapitres</div>
      </NavLink>
      <NavLink
        to={`/story/${params.id}/scenes`}
        className="btn btn-light px-1 py-0 m-0 text-center border-0"
        activeclassname="active">
        <i className="fs-3 bi bi-images"></i>
        <div className="story-footer-button-text">Scènes</div>
      </NavLink>
      <NavLink
        to={`/story/${params.id}/notes`}
        className="btn btn-light px-1 py-0 m-0 text-center border-0"
        activeclassname="active">
        <i className="fs-3 bi bi-stickies"></i>
        <div className="story-footer-button-text">Notes</div>
      </NavLink>
    </form>
  </nav>
}

export default PagesFooterMainNav;
