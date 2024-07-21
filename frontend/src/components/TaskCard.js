import React, { useState } from 'react';
import { deleteTask } from '../config/services/task';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddTaskForm from './AddTaskForm';


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

const TaskCard = ({ task, colIndex, taskIndex, tasks, setTasks }) => {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false)

  const handleClick = async (type) => {
    if (type === "delete") {
      await deleteTask(task._id);
    } else if (type === "viewDetails") {
      setViewModal(true);
    }
    else if (type == "edit") {
      setEditModal(true)
    }
  };

  const handleViewModal = () => {
    setViewModal(false);
  };

  const handleEditModal = () => {
    setEditModal(false);
  };

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex, taskId: task?._id })
    );

    setTimeout(() => {
      let updatedList = tasks.filter(item => item?._id !== task?._id)
      setTasks(updatedList)
    }, 1500)
  };

  return (
    <div className="task-card">
      <div
        draggable
        onDragStart={handleOnDrag}
      >
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Created at: {new Date(task.createdAt).toLocaleString()}</p>
        <div className="task-card-buttons">
          <button className="delete-button" onClick={() => handleClick("delete")}>Delete</button>
          <button className="edit-button" onClick={() => handleClick("edit")}>Edit</button>
          <button className="view-details-button" onClick={() => handleClick("viewDetails")}>View Details</button>
        </div>
      </div>

      <Modal
        open={viewModal}
        onClose={handleViewModal}
        aria-labelledby="task-details-title"
        aria-describedby="task-details-description"
      >
        <Box sx={modalStyle}>
          <Button onClick={handleViewModal} sx={{ float: "right", size: "larger" }}>X</Button>
          <Typography id="task-details-title" variant="h5" component="h2">
            {"Task Details"}
          </Typography>
          <Typography id="task-details-title" variant="h6" component="h2">
            {"Title: " + task.title}
          </Typography>
          <Typography id="task-details-description" sx={{ mt: 2 }}>
            {"Description: " + task.description}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Created at: {new Date(task.createdAt).toLocaleString()}
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={editModal}
        onClose={handleEditModal}
        aria-labelledby="edit-task-title"
        aria-describedby="edit-task-description"
      >
        <Box sx={modalStyle}>
          <AddTaskForm form={editModal} toggleForm={setEditModal} task={task} action={"Update"} />
        </Box>
      </Modal>
    </div>
  );
};

export default TaskCard;
