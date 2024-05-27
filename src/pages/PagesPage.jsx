import Page from "../models/Page";
import Choice from "../models/Choice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pages from "../components/pages/Pages.jsx";
import PagesMainNav from "../components/pages/PagesMainNav.jsx";
import PagesFooterMainNav from "../components/pages/PagesFooterMainNav.jsx";
import StoryMap from "../components/StoryMap.jsx";

export function PagesPage() {
  const params = useParams();
  const [pages, setPages] = useState([]);
  const [currentePageId, setCurrentePageId] = useState(null);
  const [showMap, setShowMap] = useState(true);
  const [shouldRender, setShouldRender] = useState(false); // État pour forcer le rendu

 
  //Get all the page from story
  useEffect(() => {
    const getPagesByStoryId= async () => {
      try {
        const pagesData = await Page.getPagesByStoryId(params.id);
        setPages(pagesData);
      } catch (error) {
        console.error('Error geting stories data:', error);
      }
    };

    getPagesByStoryId();
  }, [shouldRender]);

  const addNewPageToBDD = async (page) => {
    const newPage = new Page(page);
    newPage.end = false;
    newPage.title = "Mon titre de page";
    newPage.text = "Mon texte de page";
    // Save the new page to the database and get its ID
    const newPageId = await newPage.save(params.id);

    return newPageId;
  };

  const updatePageToBDD = async (page) => {
    const pageToUpdate = new Page(page);
    await pageToUpdate.update(params.id, page.id);
    setShouldRender(!shouldRender); 
  };

  const addNewChoiceToBDD = async (choice) => {
    // Add the page to link the choice
   const newPage = {
      first: false,
      previousPageId: choice.pageId
    };
    const newPageId = await addNewPageToBDD(newPage);

    // Add choice to current page with new page id as link
    choice = new Choice(choice);
    choice.sendToPageId = newPageId;
    console.log("addNewChoiceToBDD", choice);
    await choice.save(choice.pageId);

    setShouldRender(!shouldRender);
  };


  const updateChoiceToBDD = async (choice) => {
    console.log("updateChoiceToBdd PagesPage", choice);
    const choiceToUpdate = new Choice(choice);
    await choice.update(choice.id);

    setShouldRender(!shouldRender);
  };

  return <>
    <PagesMainNav storyId={params.id}/> 
    <div className="row bg-primary m-0">
      <div className={`bg-secondary border-end border-5 p-0 ${showMap ? "col-6 d-none d-xl-block" : "d-none"}`}>
        <StoryMap pages={pages} currentePageId={currentePageId}  setCurrentePageId={setCurrentePageId}/>
      </div>
      <div className="col p-0">
        <Pages
          storyId={params.id}
          pages={pages}
          addNewPageToBDD={addNewPageToBDD}
          updatePageToBDD={updatePageToBDD}
          addNewChoiceToBDD={addNewChoiceToBDD}
          updateChoiceToBDD={updateChoiceToBDD}
          currentePageId={currentePageId}
          setCurrentePageId={setCurrentePageId} 
          setShowMap={setShowMap}
          showMap={showMap}
        />
      </div>
    </div>
    <PagesFooterMainNav/>  
  </>
}
