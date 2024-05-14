import {useNavigation } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

function StoriesFooterMainNav(props) {
	const { state } = useNavigation();

	const handleClickNewStory = e => {
		const storyToAdd = {
			title: "Titre",
			openNode: 0,
			nbEnd: 0,
			nbPages:0,
			nbCharacters:0,
		}
		props.addNewStoryToBDD(storyToAdd);
	}

	return <nav className="stories-footer-container d-md-none">
		<Button className="rounded-circle position-fixed bottom-0 end-0 m-4"  variant="primary" onClick={handleClickNewStory}>
	        <i className="fs-1 bi bi-plus text-on-primary"></i>
	  </Button>
	</nav>;
}

export default StoriesFooterMainNav;
