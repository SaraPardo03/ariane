import { ref, set, onValue, push, serverTimestamp} from "firebase/database";
import { db } from '../configs/firebaseConfig'
import { useEffect, useState} from "react"
import { useParams } from "react-router-dom";
import HomeMainNav from "../components/HomeMainNav.jsx";
import HomeListeStories from "../components/HomeListeStories.jsx";

export function HomePage() {
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
    <HomeMainNav stories={stories} addNewStoryToBDD={addNewStoryToBDD}/>
    <div className="row g-0 body-container">
      <HomeListeStories stories={stories} addNewStoryToBDD={addNewStoryToBDD}/>
    </div>
  </>;
}