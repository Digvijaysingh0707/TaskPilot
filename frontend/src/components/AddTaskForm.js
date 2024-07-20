import React, { useState } from 'react';
import { addTask } from '../config/services/task';
import { toast } from "react-hot-toast";

const AddTaskForm = ({ handleForm }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskName || !taskDescription) {
      toast.error('Please fill in both fields.');
      return;
    }
    const params = {
      title: taskName,
      description: taskDescription,
    };

    try {
      const result = await addTask(params);
      console.log(result, 'RESULT');
      toast.success('Task added successfully!');
      handleForm()
    } catch (error) {
      toast.error('Failed to add task.');
      console.error(error);
    }

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
      <div className="button-group">
        <button type="submit">Add Task</button>
        <button type="button" onClick={() => handleForm()}>Cancel</button>
      </div>
    </form>
  );
};

export default AddTaskForm;
