import { ref, set, onValue, push, serverTimestamp} from "firebase/database";
import { db } from '../configs/firebaseConfig'
import { useRef, useEffect, useState} from "react"
import { useParams } from "react-router-dom";
import Stories from "../components/stories/Stories.jsx";
import StoryEditModal from "../components/stories/StoryEditModal.jsx";
import StoriesMainNav from "../components/stories/StoriesMainNav.jsx";
import StoriesFooterMainNav from "../components/stories/StoriesFooterMainNav.jsx";


export function StoriesPage() {
  const bodyRef = useRef(document.body);
  const [stories, setStories] = useState([]);
  const storiesRef = ref(db, 'stories/');
  const [open, setOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

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

  const handleOpenModal = (story) => {
    bodyRef.current.classList.add('modal-open');
    setSelectedStory(story);
    setOpen(true);
  };

  const handleCloseModal = () => {
    bodyRef.current.classList.remove('modal-open');
    setSelectedStory(null);
    setOpen(false);
  }; 

  const addNewStoryToBDD = (story) => {
    const newDate = serverTimestamp();
    story.updatedAt = newDate;
    story.createdAt = newDate;
    const newStoryId = push(storiesRef, {...story}).key;
    story.id = newStoryId;
    handleOpenModal(story);
  };

  const updateStoryToBDD = (story) => {
    const storyId = story.id;
    story.id = null;
    story.updatedAt = serverTimestamp();
    set(ref(db, 'stories/' + storyId), story);
  };

  const deleteStoryToBDD = (story) => {
    set(ref(db, 'stories/' + story.id), {});
  };

  return<>
    <StoriesMainNav stories={stories} addNewStoryToBDD={addNewStoryToBDD}/>
    <div className="row g-0 body-container">
      <StoryEditModal isOpen={open} story={selectedStory} updateStoryToBDD={updateStoryToBDD} handleCloseModal={handleCloseModal}/>
      <Stories stories={stories} addNewStoryToBDD={addNewStoryToBDD} deleteStoryToBDD={deleteStoryToBDD} handleOpenModal={handleOpenModal} />
    </div>
    <StoriesFooterMainNav stories={stories} addNewStoryToBDD={addNewStoryToBDD}/>
  </>;
}