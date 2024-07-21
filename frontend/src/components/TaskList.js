import React, { useEffect, useState } from 'react'
import { getTasks, updateTask } from '../config/services/task'
import TaskCard from './TaskCard';
import { STATUS } from '../constants/constants';
import { toast } from 'react-toastify';

const TaskList = ({ status, colIndex }) => {
  const [tasks, setTasks] = useState([]);


  const fetchTasks = async (taskStatus) => {
    try {
      const params = { status: taskStatus };
      const result = await getTasks(params);
      setTasks(result?.data);
    } catch (error) {
      // toast.error('Failed to fetch tasks.');
      console.error(error);
    }
  };

  const handleOnDrop = async (e) => {
    const { prevColIndex, taskIndex, taskId } = JSON.parse(
      e.dataTransfer.getData("text")
    );

    if (colIndex !== prevColIndex) {
      let params = {
        _id: taskId,
        status: STATUS[colIndex]

      }
      await updateTask(params)
      await fetchTasks(STATUS[colIndex])
    }
  }

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    fetchTasks(status)
  }, [status])

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className="task-list">
      <h3>{status?.toUpperCase()}</h3>
      {tasks?.map((task, index) =>
        <TaskCard key={task._id} task={task} colIndex={colIndex} taskIndex={index} tasks={tasks} setTasks={setTasks} />
      )}
    </div>
  )
}

export default TaskList