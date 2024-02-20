import {useNavigation } from 'react-router-dom'

function StoryMainNav() {
	const { state } = useNavigation();

	return <nav className="navbar shadow-sm bg-light sticky-top">
	  <form className="container-fluid">
	  	<button type="button" className="btn btn-light"><a href="../home" ><i className="bi bi-arrow-left-short"></i></a></button>
	  	<div>Mon titre d'hitoire</div>
	  	<button type="button" className="btn btn-light"><i className="bi bi-three-dots"></i></button>
	  </form>
	</nav>;
}

export default StoryMainNav;
