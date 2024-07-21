import React, { useState } from 'react'
import AddTaskForm from './AddTaskForm'
import TaskList from './TaskList'

const TaskManagement = () => {
  const [addForm, setAddForm] = useState(false)

  const handleForm = () => {
    setAddForm(!addForm)
  }
  return (
    <div className="container">
      <button className="btn" onClick={handleForm}>Add Task</button>
      {addForm &&
        <AddTaskForm form={addForm} toggleForm={setAddForm} action={"Add"} />
      }
      <div className="flex-container">
        <TaskList status={"pending"} colIndex={0} className="task-list" />
        <TaskList status={"in progress"} colIndex={1} className="task-list" />
        <TaskList status={"done"} colIndex={2} className="task-list" />
      </div>
    </div>
  )
}

export default TaskManagement