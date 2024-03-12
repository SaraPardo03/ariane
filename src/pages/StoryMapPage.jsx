import { ref, onValue,} from "firebase/database";
import { db } from '../configs/firebaseConfig';
import {getAuth } from 'firebase/auth';
import { useRouteError } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PagesMainNav from "../components/pages/PagesMainNav.jsx";
import PagesFooterMainNav from "../components/pages/PagesFooterMainNav.jsx";
import StoryMap from "../components/StoryMap.jsx";

export function StoryMapPage() {
  const error = useRouteError();
  const auth = getAuth();
  const [pages, setPages] = useState([]);
  const [currentePageId, setCurrentePageId] = useState(null);
  const params = useParams();
  //ref of all the pages of the story
  const pagesRef =ref(db, `pages/${auth.currentUser.uid}/${params.id}`);

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
  //
  return<> 
    <PagesMainNav/> 
    <StoryMap currentePageId={currentePageId} pages={pages} setCurrentePageId={setCurrentePageId}/>
    <PagesFooterMainNav/>
  </>
}