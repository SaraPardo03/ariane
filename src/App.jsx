import "./sass/main.scss";
import { Link, RouterProvider, createBrowserRouter, NavLink, Outlet, useNavigation, defer } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ErrorPage } from './pages/ErrorPage';
import { StoryPage } from './pages/StoryPage';
import { HomePage } from './pages/HomePage';
import MainNavBar from "./components/MainNavBar.jsx";
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
        path: "home",
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
          }
        ]
      },
      
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}
export default App
