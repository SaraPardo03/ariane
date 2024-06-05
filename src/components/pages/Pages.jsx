import { API_URL } from '../../configs/configBDD';
import Choice from "../../models/Choice";
import { useState, useEffect, useRef} from "react";
import Form from 'react-bootstrap/Form';
import PageEditModal from './PageEditModal';
import ChoiceEditModal from './ChoiceEditModal';

function Pages({storyId, pages, addNewPageToBDD, updatePageToBDD, addNewChoiceToBDD, updateChoiceToBDD, currentePageId, setCurrentePageId, setShowMap, showMap}) {
	let currentPages = [];
	
	if(currentePageId !== null){
		currentPages = pages.filter(page => page.id === currentePageId);
	}else{
		currentPages = pages.filter(page => page.first == true);
	}
	
	return <>
		<PageMainNavBar setShowMap={setShowMap} showMap={showMap}/>
		<div className={`contrainer current-page-container bg-container p-0 pt-2 ${!showMap ? 'p-sm-4' : 'p-sm-2'}`}>	
		{pages.length > 0 &&
			<PageCard 
			storyId={storyId}  
			page={currentPages[0]}
			addNewPageToBDD={addNewPageToBDD}
			updatePageToBDD={updatePageToBDD}
			addNewChoiceToBDD={addNewChoiceToBDD}
			updateChoiceToBDD={updateChoiceToBDD} 
			setCurrentePageId={setCurrentePageId} 
			key={currentPages[0].id}
			/>
		}
		</div>
	</>
}

export function PageMainNavBar({setShowMap, showMap}){
	return <nav className="navbar navbar-secondary bg-secondary-nav p-2">
		<div>
			<button 
			type="button" 
			className="btn btn-sm btn-primaryNav border-0 rounded-circle me-2"
			>
				<i className="bi-bookmark-check-fill"></i>
			</button>
		</div>
		<div>
			<button 
			type="button" 
			className="btn btn-sm btn-gray-500 me-1"
			>
				<i className="text-white fs-6 bi-type-bold"></i>
			</button>
			<button 
			type="button" 
			className="btn btn-sm btn-gray-500 me-1"
			>
				<i className="text-white fs-6 bi-type-italic"></i>
			</button>
			<button 
			type="button" 
			className="btn btn-sm btn-gray-500 me-1"
			>
				<i className="text-white fs-6 bi-type-underline"></i>
			</button>
			<button 
			type="button" 
			className="btn btn-sm btn-gray-500 me-1"
			>
				<i className="text-white fs-6 bi-info-circle"></i>
			</button>
		</div>
		<div className="form-check form-switch">
			<input className="form-check-input d-none d-xl-block" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={showMap} onChange={() => setShowMap(!showMap)}></input>
			<label className=" form-check-label d-none d-xl-block" htmlFor="flexSwitchCheckChecked">Carte</label>
		</div>

	</nav>
}

export function PageCard({storyId, page, addNewPageToBDD, updatePageToBDD, addNewChoiceToBDD, updateChoiceToBDD, setCurrentePageId}){
	const [choices, setChoices] = useState([]);
	//Get all the page from story
  useEffect(() => {
    const getChoicesByPageId= async () => {
      try {
        const choicesData = await Choice.getChoicesByPageId (page.id);
        setChoices(choicesData);
      } catch (error) {
        console.error('Error geting choices data:', error);
      }
    };

		getChoicesByPageId();
		
  }, []);

	return <div className="m-auto card rounded-0 current-page-card-body">
		<PageCardHeader page={page} setCurrentePageId={setCurrentePageId}/>
		<div className="card-body current-page-card-body p-2 p-sm-4">
			<PageTags/>
			<p className="bg-gray-400 text-courier mt-2">Nom du chapitre en cours, nom de la scéne en cours - {page.choiceTitle}</p>
			<PageText page={page } choices={choices} updatePageToBDD={updatePageToBDD}/>
			<div className="card-body p-0">
				<div className="bg-gray-400 text-courier mt-2 mt-sm-4 mb-2 mb-sm-4 d-flex justify-content-between">
					<span>Choix:</span>
					<i className="bi bi-caret-down-fill text-courier me-1"></i>
				</div>
				{choices.length > 0 &&
					choices.map((choice)=> <PageListChoices page={page} choice={choice} addNewChoiceToBDD={addNewChoiceToBDD} updateChoiceToBDD={updateChoiceToBDD} setCurrentePageId={setCurrentePageId} key={choice.id}/>)
				}
			</div>
		</div>
		<PageCardNavBarFooter
		choices={choices}
		page={page}
		updatePageToBDD={updatePageToBDD} 
		addNewChoiceToBDD={addNewChoiceToBDD}/>
	</div>
}

export function PageCardHeader({page, setCurrentePageId}){
	const handleClickGoToPreviousPage = e => {
		setCurrentePageId(page.previousPageId);
	}

	return <div className="card-header bg-white text-end">
		<button 
		disabled={page.first === true ? true : false}
		type="button" 
		onClick={handleClickGoToPreviousPage}
		className="btn btn-sm btn-light rounded">
			<i className="bi bi-caret-up-fill text-secondary"></i>
			<span className="ms-2 text-secondary">Page précédente</span>
		</button>
	</div>
}

export function PageTags(){
	return <div className="d-inline d-sm-flex justify-content-between p-1">
		<div>
			<span className="badge bg-gray-600 m-1 text-courier"><i className="bi bi-tag me-1 text-courier"></i>Hache<i className="bi bi-x ms-1 text-courier"></i></span>
			<span className="badge bg-gray-600 m-1 text-courier"><i className="bi bi-tag me-1 text-courier"></i>Indice<i className="bi bi-x ms-1 text-courier"></i></span>
		</div>
		<button 
		type="button" 
		className="btn btn-sm btn-light rounded">
			<i className="bi bi-plus-square"></i>
			<span className="ms-2 text-courier">Ajouter un objet</span>
		</button>
	</div>
}

export function PageText({page, choices, updatePageToBDD}){
	const [formPage, setFormPage] = useState(page);
	const [previousPage, setPreviousPage] = useState(page);

	useEffect(() => {
    const isModified = formPage.title !== previousPage.title ||
		formPage.text !== previousPage.text;

		if (isModified) {
			const updatedPage = { ...formPage};
			updatePageToBDD(updatedPage);
			setPreviousPage(updatedPage);
		}
	}, [formPage, previousPage, page]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormPage((prevData) => ({
		  ...prevData,
		  [name]: value
		}));
	};

	return <div className="card-body m-0 p-0">
		<PageEditModal page={page} choices={choices} updatePageToBDD={updatePageToBDD}/>
		<h5 className="text-courier">{page.title}</h5>
		<div className={`${page.image === "" ? "d-none" : ""} text-center`}>
			<img src={`${API_URL}${page.image}`} className="img-fluid" alt="page image" />
		</div>
		<Form>
			<AutoResizingTextarea
				value={formPage.text}
				name="text"
				onChange={handleChange}
				className="mt-2 auto-resizing-textarea"
			/>
		</Form>
	</div>
}

export function AutoResizingTextarea({ value, onChange, ...props }) {
    const textareaRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }, [value]);

    return (
        <Form.Control
            as="textarea"
            ref={textareaRef}
            value={value}
            onChange={onChange}
            {...props}
            className="page-card-text text-courier auto-resizing-textarea"
        />
    );
}

export function PageListChoices({page, choice, setCurrentePageId, addNewChoiceToBDD, updateChoiceToBDD}){
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleClickGoToNexPage = (e)=>{
		e.stopPropagation();
		setCurrentePageId(choice.sendToPageId);
	}

	const handleClickEditChoice =(e)=>{
		e.stopPropagation();
		setIsModalOpen(true);
	}

	return<div>
		<ul className="p-0">
			<ChoiceEditModal choice={choice} addNewChoiceToBDD={addNewChoiceToBDD} updateChoiceToBDD={updateChoiceToBDD} edit={true} page={page} isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
			<li className="list-group-item d-flex justify-content-between" onClick={handleClickEditChoice} >
				<div>
					<button 
					type="button" 
					className="btn btn-sm btn-light rounded-circle me-1">
						<i className="bi bi-trash text-danger"></i>
					</button>
					<span className="text-courier">{choice.title}</span>
				</div>
				<div>
					<button 
					type="button" 
					className="btn btn-sm btn-light rounded m-1">
						<i className="bi bi-plus-square"></i>
						<span className="d-none d-md-inline ms-2 text-courier">Ajouter un objet</span>
					</button>
					<button 
					type="button"
					onClick={handleClickGoToNexPage} 
						className="btn btn-sm btn-light rounded-circle text-secondary">
						<i className="bi bi-caret-right-fill"></i>
					</button>
				</div>
			</li>
			{Math.floor(Math.random() * 6) > 4 &&
				<PageChoiceTagsToHave/>
			}
			{Math.floor(Math.random() * 6) > 4 &&
				<PageChoiceTagsNotToHave/>
			}
		</ul>
	</div>
}

export function PageChoiceTagsToHave(){
	return <li className="list-group-item list-group-item-success rounded-0 border-0 p-1">
		<span className="badge bg-gray-600 m-1 text-courier"><i className="bi bi-tag me-1 text-courier"></i>Eppe<i className="bi bi-x ms-1 text-courier"></i></span>
		<span className="badge bg-gray-600 m-1 text-courier"><i className="bi bi-tag me-1 text-courier"></i>Corde<i className="bi bi-x ms-1 text-courier"></i></span>
  </li>
}

export function PageChoiceTagsNotToHave(){
	return <li className="list-group-item list-group-item-danger rounded-0 border-0 p-1">
		<span className="badge bg-gray-600 m-1 text-courier"><i className="bi bi-tag me-1 text-courier"></i>30 pièces<i className="bi bi-x ms-1 text-courier"></i></span>
  </li>
}


export function PageCardNavBarFooter({page, choices, updatePageToBDD, addNewChoiceToBDD}){
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleClickAddChoice = ()=>{
		const choice = {
			pageId:page.id,
		}
		addNewChoiceToBDD(choice);
	}
	return <div className="card-footer bg-white text-end">
		<ChoiceEditModal addNewChoiceToBDD={addNewChoiceToBDD} page={page} isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
	</div>
}

export default Pages;


