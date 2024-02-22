import { Link, RouterProvider, createBrowserRouter, NavLink, Outlet, useNavigation, defer } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ErrorPage } from './pages/ErrorPage';
import { StoryPage } from './pages/StoryPage';
import { EditPagePage } from './pages/EditPagePage';
import { HomePage } from './pages/HomePage';
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
        element:<HomePage />,
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
            element: <><StoryPage /></>,
          },
        ]
      },
      {
        path:"edit",
        element:<>
          <Outlet />
        </>,
        children:[
          { 
            path: ":id", 
            element: <EditPagePage />,
          },
        ]
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}
export default App
