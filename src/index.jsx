import React from "react";
import { createRoot } from "react-dom/client";

/* CSS */
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* Paginas */
import Home from "./pages/home";
import About from "./pages/about-us";
import Error from "./pages/error";
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
