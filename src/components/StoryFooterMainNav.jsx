import {useNavigation } from 'react-router-dom'

function StoryFooterMainNav() {
	const { state } = useNavigation();

	return <nav className="navbar shadow-sm bg-light fixed-bottom">
	  <form className="container-fluid">
	  	<button type="button" className="btn btn-light">atata</button>
	  	<div></div>
	  	<button type="button" className="btn btn-light">aaa</button>
	  </form>
	</nav>;
}

export default StoryFooterMainNav;
