import { ref, set, onValue, push, serverTimestamp} from "firebase/database";
import { db } from '../configs/firebaseConfig';
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Pages from "../components/pages/Pages.jsx";
import PagesMainNav from "../components/pages/PagesMainNav.jsx";
import PagesFooterMainNav from "../components/pages/PagesFooterMainNav.jsx";
import StoryMap from "../components/StoryMap.jsx";

export function PagesPage() {
  const [pages, setPages] = useState([]);
  const [currentePageId, setCurrentePageId] = useState(null);
  const params = useParams();
  //ref of all the pages of the story
  const pagesRef =ref(db, 'pages/' + params.id);
  /*
  //ref for the currente page
  const pageRef = ref(db, `pages/${params.id}/${currentePageId}`);
  //ref of all the choice of the currente page
  const choicesRef = ref(db, 'choices/' + currentePageId);
  */
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

  const addNewPageToBDD = (page, first) => {
    let newPageId = push(pagesRef, {...page,
      end:false,
      title:"Mon titre de page",
      text:"mon text de page",
      title:"mon super choix", 
    }).key;

    return newPageId;
  };
  
  return<>
    <PagesMainNav addNewPageToBDD={addNewPageToBDD} /> 
    <div className="row g-0 body-container bg-dark bg-opacity-10">
      <Pages
        storyId={params.id}
        pages={pages}
        currentePageId={currentePageId}
        setCurrentePageId={setCurrentePageId}
        addNewPageToBDD={addNewPageToBDD}
      />
      <div className="col d-none d-xl-block">
        <StoryMap pages={pages} setCurrentePageId={setCurrentePageId}/>
      </div>
    </div>
    <PagesFooterMainNav/>  
  </>;
}