import React, { createContext, useState } from 'react'
import TaskRoutes from './TaskRoutes'
import { ToastContainer } from 'react-toastify'

export const TaskContext = createContext()

const App = () => {
  const [userDetails, setUserDetails] = useState()

  return (
    <TaskContext.Provider value={{ userDetails, setUserDetails }}>
      <TaskRoutes />
      <ToastContainer
        autoClose={1000}

      />
    </TaskContext.Provider>
  )
}

export default App