import { useState, useEffect } from 'react';
import { RouterProvider, createBrowserRouter, Outlet, Navigate} from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';
import { ThemeProvider } from './Context/ThemeContext';
import { Protected } from './pages/Protected';
import { ErrorPage } from './pages/ErrorPage';
import { SignupPage } from './pages/SignupPage';
import { PagesPage } from './pages/PagesPage';  
import { StoriesPage } from './pages/StoriesPage';
import { StoryMapPage } from "./pages/StoryMapPage";

const router = createBrowserRouter([
  {
    path:"/",
    element:<Protected><StoriesPage /></Protected>
  },
  {
    path:"/signup",
    element:<SignupPage />,
  },
  {
    path:"/story",
    element:<>
      <Protected>
        <Outlet />
      </Protected>
    </>,
    children:[
      {
        path: '',
        element:<>
          <NoStorySelected />
        </>,
      },
      {
        path: ":id",
        element:<>
          <Outlet />
        </>,
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
      }
    ]
  },
]);

function NoStorySelected() {
  return <div> Aucune histoire sélectionnée. </div>;
}

// Composant pour la page de connexion
function LoginPage() {
  return (
    <div>
      <h2>Page de connexion</h2>
      <button onClick={signInWithGoogle}>Connexion avec Google</button>
    </div>
  );
}

function App() {
  return <AuthContext>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
  </AuthContext>
    
}
export default App
