import { Link, RouterProvider, createBrowserRouter, NavLink, Outlet, useNavigation, defer } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ErrorPage } from './pages/ErrorPage';
import { PagesPage } from './pages/PagesPage';
import { StoriesPage } from './pages/StoriesPage';
import { StoryMapPage } from "./pages/StoryMapPage.jsx";


const router = createBrowserRouter([
  {
    path: "/", 
    element:<>
      <Outlet />
    </>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element:<StoriesPage />,
      },
      {
        path: "story",
        element:<>
          <Outlet />
        </>,
        children:[
          {
            path: '',
            element: <NoStorySelected />
          },
          { 
            path: ":id", 
            element: <><Outlet /></>,
            children:[
              {
                path:'',
                element: <PagesPage />
              },
              {
                path:'map',
                element: <StoryMapPage />
              },
              {
                path:'chapters',
                element: <StoryMapPage />
              },
              {
                path:'scenes',
                element: <StoryMapPage />
              },
              {
                path:'notes',
                element: <StoryMapPage />
              },
            ]
          },
        ]
      },
    ]
  }
])

function NoStorySelected() {
  return <div> Aucune histoire sélectionnée. </div>;
}

function App() {
  return <RouterProvider router={router} />
}
export default App
