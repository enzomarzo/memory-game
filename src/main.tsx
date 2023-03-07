import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./components/login/Login";
import ErrorPage from "./components/error-page/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";
import Board from "./components/board/Board";
import ProtectedRoutes from "./ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: "/game",
    element: (
      <ProtectedRoutes>
        <Board />
      </ProtectedRoutes>
    )
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
