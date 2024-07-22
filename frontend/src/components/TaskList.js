import React, { useContext, useEffect, useState } from 'react'
import { deleteTask, getTasks, updateTask } from '../config/services/task'
import TaskCard from './TaskCard';
import { STATUS } from '../constants/constants';
import { toast } from 'react-toastify';
import { TaskContext } from '../App';

const TaskList = ({ status, colIndex }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState("")
  const [userEmail] = useState(localStorage.getItem("userEmail"))
  const { userDetails, setUserDetails } = useContext(TaskContext)

  const fetchTasks = async (taskStatus) => {
    try {
      const params = { status: taskStatus, userEmail };
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

  const handleDeleteTask = async () => {
    try {
      const result = await deleteTask(selectedTask);
      let { message } = result?.data
      toast.success(message)
      fetchTasks(status)

    } catch (error) {
      // toast.error('Failed to fetch tasks.');
      console.error(error);
    }
  }

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    fetchTasks(status)
  }, [status])

  useEffect(() => {
    if (selectedTask?.length == 0) return
    handleDeleteTask()
  }, [selectedTask, userDetails?.taskAdded == true])

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className="task-list">
      <h3>{status?.toUpperCase()}</h3>
      {tasks?.map((task, index) =>
        <TaskCard key={task._id} task={task} colIndex={colIndex} taskIndex={index} tasks={tasks} setTasks={setTasks} setSelectedTask={setSelectedTask} />
      )}
    </div>
  )
}

export default TaskList