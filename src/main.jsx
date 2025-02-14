import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import App from "./App";
import ErrorPage from "./pages/errorPage.jsx";
import MoviePage from "./pages/MoviePage.jsx";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "home/movie/:id",
    element: <MoviePage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
