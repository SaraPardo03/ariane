import { ref, set, onValue, push, serverTimestamp} from "firebase/database";
import { db } from '../configs/firebaseConfig'
import { useEffect, useState} from "react"
import { useParams } from "react-router-dom";
import Stories from "../components/stories/Stories.jsx";
import StoriesMainNav from "../components/stories/StoriesMainNav.jsx";
import StoriesFooterMainNav from "../components/stories/StoriesFooterMainNav.jsx";


export function StoriesPage() {
  const [stories, setStories] = useState([]);
  const storiesRef = ref(db, 'stories/');

  const addNewStoryToBDD = (story) => {
    push(storiesRef, {...story,
      createdAt:serverTimestamp(),
      updatedAt:serverTimestamp(),
    });
  };

  useEffect(() => {
    onValue(storiesRef, (snapshot) => {
      let data = [];
      snapshot.forEach((childSnapshot)=>{
        data.push({id: childSnapshot.key, ...childSnapshot.val()});
      });
      setStories(data);
    }, {
      //onlyOnce: true
    });
  }, []);
  
  return<>
    <StoriesMainNav stories={stories} addNewStoryToBDD={addNewStoryToBDD}/>
    <div className="row g-0 body-container">
      <Stories stories={stories} addNewStoryToBDD={addNewStoryToBDD}/>
    </div>
    <StoriesFooterMainNav stories={stories} addNewStoryToBDD={addNewStoryToBDD}/>
  </>;
}