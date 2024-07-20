import React from 'react';

const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Created at: {new Date(task.createdAt).toLocaleString()}</p>
      <div className="task-card-buttons">
        <button className="delete-button">Delete</button>
        <button className="edit-button">Edit</button>
        <button className="view-details-button">View Details</button>
      </div>
    </div>
  );
};

export default TaskCard;
