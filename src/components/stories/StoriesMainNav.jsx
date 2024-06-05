import React, { useState, useContext, useEffect} from 'react';
import Story from '../../models/Story';
import { Context as AuthContext } from '../../Context/AuthContext';
import { useTheme } from '../../Context/ThemeContext';
import '../../sass/main.scss'; 
import StoryCreateModal from "./StoryCreateModal.jsx";
import ImportStoryModal from './ImportStoryModal.jsx';



function StoriesMainNav(props) {
	const {toggleTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState('concentration');

	const handleThemeToggle = () => {
		const newTheme = currentTheme === 'concentration' ? 'light' : 'concentration';
		setCurrentTheme(newTheme);
		toggleTheme();
	};

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

	return <nav className="navbar navbar-primary bg-primary-nav sticky-top p-1 ps-2 pe-2">
		<div className="col-auto me-auto pt-2">
			<h6 className='text-on-primary-nav'>Ariane</h6>
		</div>
		<div className="col-auto">
			<div className='d-flex justify-content-between flex-row text-on-primary-nav'>
				<div className='d-flex mt-2'>
					<i className="text-on-primary-nav bi bi-sun me-2"></i>
					<div className="form-check form-switch">
						<input 
						className="form-check-input" 
						type="checkbox" 
						role="switch" 
						id="flexSwitchCheckChecked" 
						checked={currentTheme === 'concentration'} 
						onChange={handleThemeToggle}>
						</input>
						<label className="d-none form-check-label text-on-primary-nav" htmlFor="flexSwitchCheckChecked"><i className="bi bi-feather me-2"></i></label>
					</div>
					<i className="text-on-primary-nav bi bi-feather me-2"></i>
				</div>
				<div>
					<StoryCreateModal addNewStoryToBDD={props.addNewStoryToBDD}/>
					<MainDropDownMenu user={props.user}/>
				</div>
			</div>
		</div>
	</nav>

}


function MainDropDownMenu({user}){
	const { logout } = useContext(AuthContext);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	// Add event listener to detect clicks outside the dropdown
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownOpen]);


	// Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

	// Close dropdown when clicking outside
  const handleClickOutside = event => {
    if (dropdownOpen && !event.target.closest('.dropdown')) {
      setDropdownOpen(false);
    }
  };

	const handleSignOut = e => {
    e.preventDefault();
		try {
			logout()
    } catch (error) {
    	console.log(error);
    }
  };

	const importStory = async (file) => {
		console.log("file", file)
    await Story.importStory(file);
  };


	return <div className="dropdown d-inline">
		<button 
		type="button" 
		className="ms-2 btn btn-gray-500 rounded-circle text-light"
			onClick={toggleDropdown}>
			<i className="bi bi-person"></i>
		</button>
		<ul
			className={`story-card-dropdown-menu dropdown-menu position-absolute ${dropdownOpen ? 'show' : ''}`}
			aria-labelledby="dropdownMenuButton1"
		>	
			<li className='dropdown-header'>
				<p className="text-center">{user.email}</p>
				<p className='text-center'>
					<button 
					type="button" 
					className=" ps-3 pe-3 btn btn-gray-500 rounded-circle text-light"
						onClick={toggleDropdown}>
						<i className="fs-1 bi bi-person"></i>
					</button>
				</p>
				<p className="fs-5 fst-normal text-center">Bonjour {user.username}!</p>
			</li>
			<li><hr className="dropdown-divider"/></li>
			<li>
				<ImportStoryModal importStory={importStory} />
			</li>
			<li><hr className="dropdown-divider" /></li>
			<li><a className="dropdown-item" onClick={handleSignOut} href="#">Se déconnecter</a></li>
		</ul>
	</div>
}


export default StoriesMainNav;
