import { Link, RouterProvider, createBrowserRouter, NavLink, Outlet, useNavigation, defer } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ErrorPage } from './pages/ErrorPage';
import { PagesPage } from './pages/PagesPage';
import { StoriesPage } from './pages/StoriesPage';
import StoryMap from "./components/StoryMap.jsx";


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
            element: <div> Ma liste de page </div>
          },
          { 
            path: ":id", 
            element: <><PagesPage /></>,
          },
        ]
      },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}
export default App
