import Page from "../models/Page";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PagesMainNav from "../components/pages/PagesMainNav.jsx";
import PagesFooterMainNav from "../components/pages/PagesFooterMainNav.jsx";
import StoryMap from "../components/StoryMap.jsx";

export function StoryMapPage() {
  const [pages, setPages] = useState([]);
  const [currentePageId, setCurrentePageId] = useState(null);
  const params = useParams();

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
  }, []);
  //
  return<> 
    <PagesMainNav/> 
    <StoryMap currentePageId={currentePageId} pages={pages} setCurrentePageId={setCurrentePageId}/>
    <PagesFooterMainNav/>
  </>
}