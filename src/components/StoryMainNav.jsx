import {useNavigation, useNavigate} from 'react-router-dom'

function StoryMainNav() {
	const { state } = useNavigation();
	const navigate = useNavigate();
	const handleClickGoToHome = e => {
		navigate(`/`);
	}

	return <nav className="navbar shadow-sm bg-light sticky-top p-1">
	  <form className="container-fluid">
	  	<button 
  		type="button" 
  		className="btn btn-light"
  		onClick={handleClickGoToHome}>
  			<i className="bi-arrow-left-short"></i>
  		</button>
	  	<div>Mon titre d'hitoire</div>
	  	<button type="button" className="btn btn-light"><i className="bi bi-three-dots"></i></button>
	  </form>
	</nav>;
}

export default StoryMainNav;
