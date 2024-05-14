import { useNavigation, NavLink, useParams } from 'react-router-dom';


function PagesFooterMainNav() {
	const { state } = useNavigation();
	const params = useParams();

  // Function to check if the link is active
  const isActive = (path) => {
      if(location.pathname == path)
        return true;

      return false
  };

	return <nav className="d-sm-none d-block navbar navbar-primary-mobile bg-primary-nav fixed-bottom p-0">
    <ul className="navbar-nav nav justify-content-around flex-row p-0">  
      <li className={`nav-item flex-fill d-flex flex-column align-items-center ${isActive(`/story/${params.id}`) ? 'active' : ''}`}>
        <i className={`bi bi-pencil-fill`}></i>
        <NavLink 
          end
          exact="true"
          to={`/story/${params.id}`} 
          className="nav-link p-0" 
          activclassname="active">
          Rédaction
        </NavLink>
      </li>
      <li className={`nav-item flex-fill d-flex flex-column align-items-center ${isActive(`/story/${params.id}/map`) ? 'active' : ''}`}>
        <i className={`bi bi-pencil-fill`}></i>
        <NavLink 
          exact="true" 
          to={`/story/${params.id}/map`} 
          className="nav-link p-0" 
          activclassname="active">
          Carte
        </NavLink>
      </li>
      <li className={`nav-item flex-fill d-flex flex-column align-items-center ${isActive(`/story/${params.id}/chapters`) ? 'active' : ''}`}>
        <i className={`bi bi-pencil-fill`}></i>
        <NavLink 
          exact="true" 
          to={`/story/${params.id}/chapters`} 
          className="nav-link p-0" 
          activclassname="active">
          Chapitre
        </NavLink>
      </li>
      <li className={`nav-item flex-fill d-flex flex-column align-items-center ${isActive(`/story/${params.id}/scenes`) ? 'active' : ''}`}>
        <i className={`bi bi-pencil-fill`}></i>
        <NavLink 
          exact="true"
          to={`/story/${params.id}/scenes`} 
          className="nav-link p-0" 
          activclassname="active">
          Scénes
        </NavLink>
      </li>
      <li className={`nav-item flex-fill d-flex flex-column align-items-center ${isActive(`/story/${params.id}/notes`) ? 'active' : ''}`}>
        <i className={`bi bi-pencil-fill`}></i>
        <NavLink 
          exact="true"
          to={`/story/${params.id}/notes`} 
          className="nav-link p-0" 
          activclassname="active">
          Notes
        </NavLink>
      </li>
    </ul>
  </nav>
}

export default PagesFooterMainNav;
