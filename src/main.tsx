import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login/Login";
import ErrorPage from "./components/error-page/ErrorPage";
import "./index.scss";
import Board from "./components/board/Board";
import ProtectedRoutes from "./ProtectedRoutes";
import { Provider } from "./components/context/Context";
import Highscores from "./components/highscores/Highscores";

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
    ),
    children: [
      {
        path: "/game/highscores",
        element: <Highscores />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
