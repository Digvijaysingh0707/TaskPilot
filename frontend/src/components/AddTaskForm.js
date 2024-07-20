import React, { useState } from 'react';

const AddTaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName || !taskDescription) {
      alert('Please fill in both fields.');
      return;
    }
    const newTask = {
      name: taskName,
      description: taskDescription,
    };
    onAddTask(newTask);
    setTaskName('');
    setTaskDescription('');
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      <div>
        <label htmlFor="taskName">Task Name:</label>
        <input
          type="text"
          id="taskName"
          value={taskName}
          onChange={handleNameChange}
          placeholder="Enter task name"
        />
      </div>
      <div>
        <label htmlFor="taskDescription">Description:</label>
        <textarea
          id="taskDescription"
          value={taskDescription}
          onChange={handleDescriptionChange}
          placeholder="Enter task description"
        />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
