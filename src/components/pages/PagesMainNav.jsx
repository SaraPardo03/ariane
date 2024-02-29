import React, { useState, useEffect } from 'react';
import {useNavigation, useNavigate} from 'react-router-dom'
import Story from '../../models/Story';

function PagesMainNav({storyId}) {
	const [storyTitle, setStoryTitle] = useState("Mon super titre d'histoire");
	const { state } = useNavigation();
	const navigate = useNavigate();

	useEffect(() => {
    const fetchStoryTitle = async () => {
      const title = await Story.getTitleById(storyId);
      setStoryTitle(title);
    };
    fetchStoryTitle();
  }, [storyId]);

	//const storyName = getStoryName();

	console.log("toto");
	const handleClickGoToHome = e => {
		navigate(`/`);
	}

	return <nav className="navbar shadow-sm bg-light sticky-top p-1">
	  <form className="container-fluid">
	  	<button 
  		type="button" 
  		className="btn btn-light btn-sm rounded-circle"
  		onClick={handleClickGoToHome}>
  			<i className="bi-arrow-left"></i>
  		</button>
	  	<div>{storyTitle}</div>
	  	<button 
	  		type="button" 
	  		className="btn btn-sm btn-light rounded-circle">
	  		<i className="bi bi-three-dots"></i>
	  	</button>
	  </form>
	</nav>;
}

export default PagesMainNav;
