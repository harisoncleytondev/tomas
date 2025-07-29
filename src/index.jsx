/* REACT ROUTER DOM */
import { createRoot } from 'react-dom/client';

/* CSS */
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/* PAGES */
import Home from './pages/home';
import Error from './pages/error';
import Login from './pages/login';
import Register from './pages/register';
import Costumization from './pages/chatbot/customization/index.jsx';
import Terms from './pages/terms';
import ChatBot from './pages/chatbot';
import AuthGoogleCallback from './pages/google';

/* WRAPPERS */
import ProtectRouterWrapper from './wrappers/ProtectRouterWrapper.jsx';

/* APP */
import AppWrapper from './wrappers/AppWrapper.jsx';

let router = createBrowserRouter([
  {
    path: '/',
    Component: AppWrapper,
    children: [
      {
        path: '/',
        Component: Home,
      },
      {
        path: 'entrar',
        Component: Login,
      },
      {
        path: 'criar-conta',
        Component: Register,
      },
      {
        path: 'termos-e-politica',
        Component: Terms,
      },
    ],
  },
  {
    path: 'auth/google/callback/:action/:token',
    Component: AuthGoogleCallback,
  },
  {
    path: 'assistente',
    Component: ProtectRouterWrapper,
    children: [
      {
        path: 'chat/:chatId?',
        Component: ChatBot,
      },
      {
        path: 'preferencias',
        Component: Costumization,
      },
    ],
  },
  {
    path: '*',
    element: (
      <Error
        errorId="404"
        description="A página que você está procurando não pôde ser encontrada. Ela pode ter sido movida, renomeada ou talvez nunca tenha existido."
      />
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
