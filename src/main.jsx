import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./root/Root";
import Home from "./Page/Home";
import Games from "./Page/Games";
import Score from "./Page/Score";
import Game from "./Page/Game";
import TicTacToe from "./Game/TicTacTOe/TicTacToe";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Feedback from "./Page/Feedback";
const queryClient = new QueryClient();
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
      {
        path: "/feedback",
        element: <Feedback />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
