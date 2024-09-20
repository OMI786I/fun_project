import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./root/Root";
import Home from "./Page/Home";
import Games from "./Page/Games";
import Score from "./Page/Score";
import Game from "./Page/Game";
import TicTacToe from "./Page/TicTacToe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/game",
        element: <Games></Games>,
      },
      {
        path: "/score",
        element: <Score></Score>,
      },
      {
        path: "/runner",
        element: <Game />,
      },
      {
        path: "/tictactoe",
        element: <TicTacToe />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
