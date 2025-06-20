/* REACT ROUTER DOM */
import { createRoot } from "react-dom/client";

/* CSS */
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* PAGES */
import Home from "./pages/home";
import Error from "./pages/error";
import Login from "./pages/login";
import Register from "./pages/register";
import Costumization from "./pages/register/customization";
import Terms from "./pages/terms";

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
        path: "entrar",
        Component: Login,
      },
      {
        path: "cadastrar",
        Component: Register,
      },
      {
        path: "cadastrar/prefs",
        Component: Costumization,
      },
      {
        path: "termos-e-politica",
        Component: Terms,
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
