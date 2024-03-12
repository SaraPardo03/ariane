import {useNavigation } from 'react-router-dom';
import { signOut,getAuth } from "firebase/auth";

function StoriesMainNav(props) {
	const auth = getAuth();
	const { state } = useNavigation();

	const handleClickNewStory = e => {
		const storyToAdd = {
			title: "Ma super histoire",
			openNode: 0,
			nbEnd: 0,
			nbPages:0,
			nbCharacters:0,
		}
		props.addNewStoryToBDD(storyToAdd);
	}

	async function handleSignOut(){
      try {
          await signOut(auth);
      } catch (error) {
          console.log(error)
      }
  }
	return <nav className="navbar shadow-sm bg-light sticky-top p-1">
	  <form className="container-fluid">
	  	<div>Mon super nom d'application</div>
	  	<button 
	  		type="button" 
	  		className="d-none d-md-block btn btn-sm btn-primary"
	  		onClick={handleClickNewStory}>
	  		<i className="bi bi-plus"></i>
	  		<span> Nouvelle histoire </span>
	  	</button>
	  	<button 
	  		type="button" 
	  		className="d-none d-md-block btn btn-sm btn-danger"
	  		onClick={() => {handleSignOut()}}>
	  		<i className="bi bi-box-arrow-left"></i>
	  		<span> Se déconnecter </span>
	  	</button>
	  </form>
	</nav>;

}

export default StoriesMainNav;
