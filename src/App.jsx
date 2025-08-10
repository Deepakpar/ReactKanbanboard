import React from "react";


import { TaskProvider } from "./context/TaskContext";
import Board from "./Pages/Board";

export default function App() {
  return (
    <TaskProvider>
      <Board />
    </TaskProvider>
  );
}