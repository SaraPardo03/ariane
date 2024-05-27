import Story from '../../models/Story';
import { Context as AuthContext } from '../../Context/AuthContext';
import React, { useState, useEffect, useContext} from 'react';
import {useNavigation, useNavigate, NavLink, useParams} from 'react-router-dom'

function PagesMainNav({storyId}) {
	const {user} = useContext(AuthContext)
	const [storyTitle, setStoryTitle] = useState("Mon super titre d'histoire");
	const { state } = useNavigation();
	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
    const fetchStoryTitle = async () => {
      const title = await Story.getTitleById(user.id, storyId);
      setStoryTitle(title);
    };
    fetchStoryTitle();
  }, [storyId]);

	const handleClickGoToHome = e => {
		navigate(`/`);
	}

	return <nav className="navbar navbar-primary bg-primary-nav sticky-top p-1 ps-2 pe-4">
		<div className='col-auto d-flex ms-2 me-4 '>
			<button 
			type="button" 
			className="btn btn-sm btn-primaryNav border-0 rounded-circle me-2"
			onClick={handleClickGoToHome}>
				<i className="bi-arrow-left"></i>
			</button>
			<h6 className='text-on-primary-nav pt-2'>{storyTitle}</h6>
		</div>
		<div className="d-none d-sm-block col ms-4 me-4">
			<ul className="navbar-nav nav justify-content-between flex-row">
				<li className="nav-item">
					<NavLink 
						end
						exact="true" 
						to={`/story/${params.id}`} 
						className="nav-link" 
						activeclassname="active">
						Rédaction
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink 
						exact="true" 
						to={`/story/${params.id}/map`} 
						className="nav-link" 
						activeclassname="active">
						Carte
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink 
						exact="true"
						to={`/story/${params.id}/chapters`} 
						className="nav-link" 
						activeclassname="active">
						Chapitre
					</NavLink>
				</li>
				<li className="nav-item text-primary-nav">
					<NavLink 
						exact="true"
						to={`/story/${params.id}/scenes`} 
						className="nav-link" 
						activeclassname="active">
						Scénes
					</NavLink>
				</li>
				<li className="nav-item text-primary-nav">
					<NavLink 
						exact="true" 
						to={`/story/${params.id}/notes`} 
						className="nav-link" 
						activeclassname="active">
						Notes
					</NavLink>
				</li>
			</ul>
		</div>
	</nav>
}

export default PagesMainNav;
