/* REACT */
import React from "react";

/* REACT ROUTER DOM */
import { createRoot } from "react-dom/client";

/* CSS */
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* PAGES */
import Home from "./pages/home";
import About from "./pages/about-us";
import Error from "./pages/error";
import Login from "./pages/login";

/* APP */
import App from "./App";

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
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
  {
    path: "*",
    element: (
      <Error
        errorId="404"
        description="A página que você está procurando não pôde ser encontrada. Ela pode ter sido movida, renomeada ou talvez nunca tenha existido."
      />
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
