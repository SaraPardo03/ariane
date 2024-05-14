import React, { useState, useEffect } from 'react';
import {useNavigation } from 'react-router-dom';
import { signOut,getAuth } from "firebase/auth";
import { useTheme } from '../../Context/ThemeContext';
import '../../sass/main.scss'; 


function StoriesMainNav(props) {
	const auth = getAuth();
	const { state } = useNavigation();
	const { theme, toggleTheme } = useTheme();
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

	async function handleSignOut(){
		try {
			await signOut(auth);
		} catch (error) {
			console.log(error)
		}
  	}

	return <nav className="navbar navbar-primary bg-primary-nav sticky-top p-1 ps-2 pe-2">
		<div className="col-auto me-auto pt-2">
			<h6 className='text-on-primary-nav'>Ariane</h6>
		</div>
		<div className="col-auto d-flex">
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
					<label className=" form-check-label text-on-primary-nav" htmlFor="flexSwitchCheckChecked"><i className="bi bi-feather me-2"></i></label>
				</div>
			</div>
			<button 
				type="button" 
				className="d-none d-md-inline btn btn-sm btn-primary"
				onClick={handleClickNewStory}>
				<i className="bi bi-plus"></i>
				<span> Nouvelle histoire </span>
			</button>
			<button 
				type="button" 
				className="ms-2 btn btn-gray-500 rounded-circle text-light"
				onClick={() => {handleSignOut()}}>
				<i className="bi bi-person"></i>
			</button>
		</div>
	</nav>

}

export default StoriesMainNav;
