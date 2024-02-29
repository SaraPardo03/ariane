import { ref, set, onValue, push, serverTimestamp} from "firebase/database";
import { db } from '../configs/firebaseConfig';
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Page from "../models/Page";
import Choice from "../models/Choice";
import Pages from "../components/pages/Pages.jsx";
import PagesMainNav from "../components/pages/PagesMainNav.jsx";
import PagesFooterMainNav from "../components/pages/PagesFooterMainNav.jsx";
import StoryMap from "../components/StoryMap.jsx";

export function PagesPage() {
  const params = useParams();
  const pagesRef =ref(db, 'pages/' + params.id);
  const [pages, setPages] = useState([]);
  const [currentePageId, setCurrentePageId] = useState(null);

  //Get all the pages of the story
  useEffect(() => {
    onValue(pagesRef, (snapshot) => {
      let data = [];
      snapshot.forEach((childSnapshot)=>{
        data.push({id: childSnapshot.key, ...childSnapshot.val()});
      });
      setPages(data);
    }, {
      //onlyOnce: true
    });
  }, []);

  const addNewPageToBDD = async (page) => {
    const newPage = new Page(page);
    newPage.end = false;
    newPage.title = "Mon titre de page";
    newPage.text = "mon text de page";
    // Save the new page to the database and get its ID
    const newPageId = await newPage.save(params.id);

    return newPageId;
  };

  const updatePageToBDD = async (page) => {
    const pageToUpdate = new Page(page);
    await pageToUpdate.update(params.id, page.id);
  };

  const addNewChoiceToBDD = async (choice) => {
    // Add the page to link the choice
    const newPage = {
      first: false,
      previousPageId: choice.pageId
    };
    const newPageId = await addNewPageToBDD(newPage);

    // Add choice to current page with new page id as link
    choice.sendToPageId = newPageId;
    const choicesRef = ref(db, 'choices/' + choice.pageId);
    push(choicesRef, new Choice(choice));
  };

  return<>
    <PagesMainNav /> 
    <div className="row g-0 body-container bg-dark bg-opacity-10">
      <Pages
        storyId={params.id}
        pages={pages}
        addNewPageToBDD={addNewPageToBDD}
        updatePageToBDD={updatePageToBDD}
        addNewChoiceToBDD={addNewChoiceToBDD}
        currentePageId={currentePageId}
        setCurrentePageId={setCurrentePageId} 
      />
      <div className="col d-none d-xl-block">
        <StoryMap pages={pages} setCurrentePageId={setCurrentePageId}/>
      </div>
    </div>
    <PagesFooterMainNav/>  
  </>;
}