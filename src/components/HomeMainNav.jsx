import {useNavigation } from 'react-router-dom'

function HomeMainNav() {
	const { state } = useNavigation();
	return <nav className="navbar shadow-sm bg-light sticky-top">
	  <form className="container-fluid">
	  	<div>Mon supper nom d'application</div>
	  	<button type="button" className="btn btn-light"><i className="bi bi-plus"></i></button>
	  </form>
	</nav>;
}

export default HomeMainNav;
