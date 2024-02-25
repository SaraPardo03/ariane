import {useNavigation } from 'react-router-dom'

function StoriesFooterMainNav(props) {
	const { state } = useNavigation();

	const handleClickNewStory = e => {
		console.log("click");
		const storyToAdd = {
			title: "Une nouvelle histoire qui commence...",
			openNode: 0,
			nbEnd: 0,
			nbPages:0,
			nbCharacters:0,
		}
		props.addNewStoryToBDD(storyToAdd);
	}
	return <nav className="d-md-none navbar shadow-sm bg-white bg-opacity-10 fixed-bottom p-2">
		<form className="container-fluid">
		<div></div>
			<button 
			type="button"
			className="btn btn-primary rounded-circle"
			onClick={handleClickNewStory}>
					<i className="fs-1 bi bi-plus"></i>
			</button>
		</form>
	</nav>;
}

export default StoriesFooterMainNav;
