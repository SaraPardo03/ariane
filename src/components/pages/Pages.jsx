import { ref, set, onValue, push, serverTimestamp} from "firebase/database";
import { useState, useEffect, useRef, useMemo} from "react";
import { db } from '../../configs/firebaseConfig';
import Page from "../../models/Page";
import PageEditModal from './PageEditModal';
import ChoiceEditModal from './ChoiceEditModal';

function Pages({storyId, pages, addNewPageToBDD, updatePageToBDD, addNewChoiceToBDD, currentePageId, setCurrentePageId}) {
	let currentPages = [];

	if(currentePageId !== null){
		currentPages = pages.filter(page => page.id === currentePageId);
	}else{
		currentPages = pages.filter(page => page.first == true);
	}

	return <div className="col m-2">
	{pages.length > 0 &&
  	<PageCard 
  	storyId={storyId}  
  	page={currentPages[0]}
  	addNewPageToBDD={addNewPageToBDD}
  	updatePageToBDD={updatePageToBDD}
  	addNewChoiceToBDD={addNewChoiceToBDD}  
  	setCurrentePageId={setCurrentePageId} 
  	key={currentPages[0].id}/>
   }
	</div>;
}

export function PageCard({storyId, page, addNewPageToBDD, updatePageToBDD, addNewChoiceToBDD, setCurrentePageId}){
	const [choices, setChoices] = useState([]);
	const pageRef = ref(db, `pages/${storyId}/${page.id}`);
  const choicesRef = ref(db, `choices/${page.id}`);

  useEffect(() => {
    onValue(choicesRef, (snapshot) => {
      let data = [];
      snapshot.forEach((childSnapshot)=>{
        data.push({id: childSnapshot.key, ...childSnapshot.val()});
      });
      setChoices(data);
    }, {
      //onlyOnce: true
    });
  }, []);

	return <div className="col-12 page-container">
		<div className="card-page-container">
    	<div className="card card-page rounded-0 shadow-sm bg-white">
    		<PageCardNavBar page={page} setCurrentePageId={setCurrentePageId}/>
    		<div className="page-body-container bg-secondary bg-opacity-25">
	        <div className="card bg-light m-2">
	          <PageTags/>
	          <PageText page={page}/>
	          {choices.length > 0 &&
	          	choices.map((choice)=> <PageListChoices key={choice.id} choice={choice} setCurrentePageId={setCurrentePageId}/>)
					  }
	        </div>
	      </div>
	      <PageCardNavBarFooter 
	      choices={choices}
	      page={page}
	      updatePageToBDD={updatePageToBDD} 
	      addNewChoiceToBDD={addNewChoiceToBDD}/>
    	</div>
    </div>
	</div>

}

export function PageCardNavBar({page, setCurrentePageId}){
	const handleClickGoToPreviousPage = e => {
		setCurrentePageId(page.previousPageId);
	}

	return <div className="navbar bg-light p-2">
	  <div className="container-fluid">
	    <span>Chapitre : scéne</span>
	    <div className="page-body-container bg-dark bg-opacity-10">
	    </div>
	    <button 
	    	disabled={page.first === true ? true : false}
	    	type="button" 
	    	onClick={handleClickGoToPreviousPage}
	    	className="btn btn-sm btn-light rounded-circle"><i className="bi bi-caret-up-fill"></i></button>
	  </div>
	</div>
}

export function PageTags(){
	return <div className="card-body">
		<span className="badge bg-secondary m-1"><i className="bi bi-x"></i>Secondary</span>
		<span className="badge bg-secondary m-1"><i className="bi bi-x"></i>Secondary</span>
		<span className="badge bg-secondary m-1"><i className="bi bi-x"></i>Secondary</span>
	</div>
}

export function PageText({page}){

	const handleClickEditPage = ()=>{
		console.log("toto");
	}

	return <div className="card-body" onClick={handleClickEditPage}>
		<h5 className="card-title">{page.title}</h5>
		<p className="card-text">{page.text}</p>
	</div>
}

export function PageListChoices({choice, setCurrentePageId}){
	const handleClickGoToNexPage = ()=>{
		setCurrentePageId(choice.sendToPageId);
	}

	return <div className="card bg-light rounded-0 border-0">
	  <ul className="list-group list-group-flush">
	  	<li className="list-group-item d-flex justify-content-between align-items-center bg-light rounded-0 border-1">
	      {choice.title}
	      <button 
	      	type="button"
	      	onClick={handleClickGoToNexPage} 
	      	className="btn btn-sm btn-light rounded-circle">
	      	<i className="bi bi-caret-right-fill"></i>
	      </button>
	    </li>
	    <PageChoiceTagsToHave/>
	    <PageChoiceTagsNotToHave/>
	  </ul>
	</div>
}

export function PageChoiceTagsToHave(){
	return <li className="list-group-item list-group-item-success rounded-0 border-0">
    <span className="badge bg-secondary bg-success m-1"><i className="bi bi-x"></i>Epee</span>
  </li>
}

export function PageChoiceTagsNotToHave(){
	return	<li className="list-group-item list-group-item-danger rounded-0 border-0">
    <span className="badge bg-secondary bg-danger m-1"><i className="bi bi-x"></i>30 pièces</span>
    <span className="badge bg-secondary bg-danger m-1"><i className="bi bi-x"></i>Corde</span>
  </li>
}


export function PageCardNavBarFooter({page, choices, updatePageToBDD, addNewChoiceToBDD}){
	const handleClickAddChoice = ()=>{
		const choice = {
			pageId:page.id,
		}
		addNewChoiceToBDD(choice);
	}
	return <div className="navbar justify-content-end p-2">
		<PageEditModal updatePageToBDD={updatePageToBDD} page={page} choices={choices}/>
		<ChoiceEditModal addNewChoiceToBDD={addNewChoiceToBDD} page={page}/>
	</div>
}

export default Pages;


