import React from 'react'
import { createRoot } from 'react-dom/client'

/* CSS */
import './index.css';

import {
		createBrowserRouter,
		RouterProvider,
	} from "react-router-dom";


/* Paginas */	
import Home from './pages/home';
import About from './pages/about-us';
import App from './App';

let router = createBrowserRouter([
	{
		path: "/",
		Component: App,
		children: [
      {
        path: "/",
        Component: Home,
      },
	  {
        path: "sobre",
        Component: About,
      }
    ],
	},
	{
		path: "*",
		element: <h1>404 | Pagina não encontrada.</h1>,
	}
]);

createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
);