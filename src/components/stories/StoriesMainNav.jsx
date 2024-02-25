import {useNavigation } from 'react-router-dom'

function StoriesMainNav(props) {
	const { state } = useNavigation();

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
	return <nav className="navbar shadow-sm bg-light sticky-top p-1">
	  <form className="container-fluid">
	  	<div>Mon supper nom d'application</div>
	  	<button 
	  		type="button" 
	  		className="btn btn-light"
	  		onClick={handleClickNewStory}>
	  		<i className="bi bi-plus"></i>
	  	</button>
	  </form>
	</nav>;

}

export default StoriesMainNav;
