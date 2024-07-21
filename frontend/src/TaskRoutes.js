import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import TaskManagement from "./components/TaskManagement";
import Signup from "./components/Signup";
import LoginPage from "./components/LoginPage";

const TaskRoutes = () => {
  const userToken = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={userToken ? <TaskManagement /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default TaskRoutes;
