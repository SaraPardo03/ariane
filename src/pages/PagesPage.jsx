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
  const params = useParams();
  //get all the pages of the story
  const pagesRef =ref(db, 'pages/' + params.id);
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

  const addNewPageToBDD = (page) => {
    let newPageId = push(pagesRef, {...page,
      first:false,
      end:false,
      title:"Mon titre de page",
      text:"mon text de page",
      title:"mon super choix", 
    }).key;

    console.log(newPageId);
    return newPageId;
  };
  
  return<>
    <PagesMainNav /> 
    <div className="row g-0 body-container">
      <Pages
        pages={pages}
        addNewPageToBDD={addNewPageToBDD}
      />
      <StoryMap/>
    </div>
    <PagesFooterMainNav/>  
  </>;
}