import React, { useState } from 'react'
import AddTaskForm from './AddTaskForm'
import TaskList from './TaskList'

const TaskManagement = () => {
  const [addForm, setAddForm] = useState(false)

  const handleForm = () => {
    setAddForm(!addForm)
  }
  return (
    <div>
      <button className='btn' onClick={handleForm}>Add Task</button>
      {addForm &&
        <AddTaskForm handleForm={handleForm} />
      }
      <TaskList status={"pending"} />
    </div>
  )
}

export default TaskManagement