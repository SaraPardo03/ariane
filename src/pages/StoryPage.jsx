import { ref, set, onValue, push, serverTimestamp} from "firebase/database";
import { db } from '../configs/firebaseConfig'
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import StoryMainNav from "../components/StoryMainNav.jsx";
import StoryFooterMainNav from "../components/StoryFooterMainNav.jsx";
import Story from "../components/Story.jsx";
import StoryMap from "../components/StoryMap.jsx";

export function StoryPage() {
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
    <StoryMainNav /> 
    <div className="row g-0 body-container">
      <Story 
        pages={pages}
        addNewPageToBDD={addNewPageToBDD}
      />
      <StoryMap/>
    </div>
    <StoryFooterMainNav/>  
  </>;
}