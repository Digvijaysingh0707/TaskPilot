import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import TaskManagement from "./components/TaskManagement";
import Signup from "./components/Signup";

const TaskRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<TaskManagement />} />
          <Route path="/signup" exact element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default TaskRoutes;