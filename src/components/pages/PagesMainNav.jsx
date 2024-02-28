import {useNavigation, useNavigate} from 'react-router-dom'

function PagesMainNav(props) {
	const { state } = useNavigation();
	const navigate = useNavigate();

	const handleClickGoToHome = e => {
		navigate(`/`);
	}

	const handleClickNewPage = e =>{
		let newPage = {
  		first:true,
  	}
		props.addNewPageToBDD(newPage);
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
	  	<button 
	  		type="button" 
	  		className="d-none d-md-block btn btn-sm btn-primary"
	  		onClick={handleClickNewPage}>
	  		<i className="bi bi-plus"></i>
	  		<span> Nouvelle page </span>
	  	</button>
	  </form>
	</nav>;
}

export default PagesMainNav;
