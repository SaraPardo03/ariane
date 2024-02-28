import { ref, set, onValue, push, serverTimestamp} from "firebase/database";
import { useState, useEffect, useRef, useMemo} from "react";
import { db } from '../../configs/firebaseConfig';

function Pages(props) {
	let currentPages = [];

	if(props.currentePageId !== null){
		currentPages = props.pages.filter(page => page.id === props.currentePageId);
	}else{
		currentPages = props.pages.filter(page => page.first == true);
	}

	return <div className="col m-2">
	{props.pages.length > 0 &&
  	<PageCard key={currentPages[0].id} addNewPageToBDD={props.addNewPageToBDD} page={currentPages[0]} setCurrentePageId={props.setCurrentePageId}/>
   }
	</div>;
}

export default Pages;


export function PageCard(props){
	const [choices, setChoices] = useState([]);
  const choicesRef = ref(db, 'choices/' + props.page.id);

  const addNewChoiceToBDD = (choice) => {
  	let newPage = {
  		first:false,
  		previousPageId: props.page.id
  	}
  	let newPageId = props.addNewPageToBDD(newPage);
    push(choicesRef, {...choice,
    	pageId:props.page.id,
    	sendToPageId:newPageId,
    	title:"mon super choix", 
    });
  };

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
    		<PageCardNavBar page={props.page} setCurrentePageId={props.setCurrentePageId}/>
    		<div className="page-body-container bg-dark bg-opacity-10">
	        <div className="card bg-light m-2">
	          <PageTags/>
	          <PageText page={props.page}/>
	          {choices.length > 0 &&
	          	choices.map((choice)=> <PageListChoices key={choice.id} choice={choice} setCurrentePageId={props.setCurrentePageId}/>)
					  }
	        </div>
	      </div>
	      <PageCardNavBarFooter page={props.page} addNewChoiceToBDD={addNewChoiceToBDD}/>
    	</div>
    </div>
	</div>

}

export function PageCardNavBar(props){
	const handleClickGoToPreviousPage = e => {
		props.setCurrentePageId(props.page.previousPageId);
	}

	return <div className="navbar bg-light p-2">
	  <div className="container-fluid">
	    <span>Chapitre : scéne</span>
	    <div className="page-body-container bg-dark bg-opacity-10">
	    </div>
	    <button 
	    	disabled={props.page.first === true ? true : false}
	    	type="button" 
	    	onClick={handleClickGoToPreviousPage}
	    	className="btn btn-sm btn-light"><i className="bi bi-caret-up-fill"></i></button>
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

export function PageText(props){
	return <div className="card-body">
		<h5 className="card-title">{props.page.title}</h5>
		<p className="card-text">{props.page.text}</p>
	</div>
}

export function PageListChoices(props){
	return <div className="card bg-light rounded-0 border-0">
	  <ul className="list-group list-group-flush">
	  	<PageChoice choice={props.choice} setCurrentePageId={props.setCurrentePageId}/>
	  </ul>
	</div>
}

export function PageChoice(props){
	const handleClickGoToNexPage = ()=>{
		props.setCurrentePageId(props.choice.sendToPageId);
	}

	return <>
		<li className="list-group-item d-flex justify-content-between align-items-center bg-light rounded-0 border-1">
      {props.choice.title}
      <button 
      	type="button"
      	onClick={handleClickGoToNexPage} 
      	className="btn btn-sm btn-light">
      	<i className="bi bi-caret-right-fill"></i>
      </button>
    </li>
    <PageChoiceTagsToHave/>
    <PageChoiceTagsNotToHave/>
	</>
}

export function PageChoiceTagsToHave(){
	return <li className="list-group-item list-group-item-success rounded-0 border-0">
    <span className="badge bg-secondary bg-success m-1"><i className="bi bi-x"></i>Secondary</span>
    <span className="badge bg-secondary bg-success m-1"><i className="bi bi-x"></i>Secondary</span>
    <span className="badge bg-secondary bg-success m-1"><i className="bi bi-x"></i>Secondary</span>
  </li>
}

export function PageChoiceTagsNotToHave(){
	return	<li className="list-group-item list-group-item-danger rounded-0 border-0">
    <span className="badge bg-secondary bg-danger m-1"><i className="bi bi-x"></i>Secondary</span>
    <span className="badge bg-secondary bg-danger m-1"><i className="bi bi-x"></i>Secondary</span>
    <span className="badge bg-secondary bg-danger m-1"><i className="bi bi-x"></i>Secondary</span>
  </li>
}


export function PageCardNavBarFooter(props){
	const handleClickAddChoice = ()=>{
		const choice = {
			pageId: props.page.id,
			sendToPageId:0,
		}
		props.addNewChoiceToBDD(choice);
	}
	return <div className="navbar justify-content-end p-2">
		<button 
			type="button" 
			onClick={handleClickAddChoice} 
			className="btn btn-primary btn-sm"><i className="bi bi-plus">Ajouter un choix</i></button>
	</div>
}


