import { ref, set, onValue, push, serverTimestamp} from "firebase/database";
import { db } from '../configs/firebaseConfig'
import { useRef, useEffect, useState} from "react"
import { useParams } from "react-router-dom";
import Story from '../models/Story';
import Stories from "../components/stories/Stories.jsx";
import Page from '../models/Page';
import StoriesMainNav from "../components/stories/StoriesMainNav.jsx";
import StoriesFooterMainNav from "../components/stories/StoriesFooterMainNav.jsx";


export function StoriesPage() {
  const bodyRef = useRef(document.body);
  const [stories, setStories] = useState([]);
  const storiesRef = ref(db, 'stories/');
  const [open, setOpen] = useState(false);

  //Get all the stories
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

  const addNewStoryToBDD = async (story) => {
    const newStory = new Story(story);
    newStory.createdAt = serverTimestamp();
    newStory.updatedAt = serverTimestamp();

   // Save the new story to the database
    const storyId = await newStory.save();
    
    // Add the first page to the story
    const firstPage = new Page({
      end: false,
      first: true,
      title: "Titre",
      text: "Que l'aventure commence!"
    });

    await firstPage.save(storyId);

    return storyId; // Save the first page with the story ID*/
  };

  const updateStoryToBDD = (story) => {
    const updatedStory = new Story(story);
    updatedStory.updatedAt = serverTimestamp();
    updatedStory.save();
  };

  const deleteStoryToBDD = (story) => {
    const storyToDelete = new Story(story);
    //Delete all the pages from the story
    storyToDelete.deleteAllPagesFromStory();
    //and delete the story
    storyToDelete.delete();
  };

  return<>
    <StoriesMainNav stories={stories} addNewStoryToBDD={addNewStoryToBDD}/>
    <div className="row g-0 body-container bg-secondary bg-opacity-10">
      <Stories stories={stories} updateStoryToBDD={updateStoryToBDD} addNewStoryToBDD={addNewStoryToBDD} deleteStoryToBDD={deleteStoryToBDD} />
    </div>
    <StoriesFooterMainNav stories={stories} addNewStoryToBDD={addNewStoryToBDD}/>
  </>;
}