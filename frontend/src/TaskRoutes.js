import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import TaskManagement from "./components/TaskManagement";

const TaskRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<TaskManagement />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default TaskRoutes;