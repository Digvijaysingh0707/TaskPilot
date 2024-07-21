import React, { useState } from 'react';
import { addTask, updateTask } from '../config/services/task';
import { Box, Modal } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddTaskForm = ({ form, toggleForm, task, action }) => {
  const [taskName, setTaskName] = useState(task?.title || "");
  const [taskDescription, setTaskDescription] = useState(task?.description || "");

  const handleNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskName || !taskDescription) {
      return;
    }
    let params = {
      title: taskName,
      description: taskDescription,
    };

    if (task) {
      params = { ...params, _id: task?._id }
    }

    try {
      if (task) {
        const result = await updateTask(params)
      }
      else {
        const result = await addTask(params);
      }
      // handleForm()
      toggleForm(!form)
    } catch (error) {
      console.error(error);
    }

    setTaskName('');
    setTaskDescription('');
  };

  return (
    <Modal
      open={form}
      onClose={() => toggleForm(false)}
      aria-labelledby="task-details-title"
      aria-describedby="task-details-description"
    >
      <Box sx={modalStyle}>
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
            <button type="submit">{action} Task</button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default AddTaskForm;
