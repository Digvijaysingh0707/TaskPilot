import React, { useState } from 'react'
import AddTaskForm from './AddTaskForm'

const TaskManagement = () => {
  const [addForm, setAddForm] = useState(false)

  const handleAddForm = () => {
    setAddForm(true)
  }
  return (
    <div>
      <button className='btn' onClick={handleAddForm}>Add Task</button>
      <AddTaskForm />
    </div>
  )
}

export default TaskManagement