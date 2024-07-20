import React, { useEffect, useState } from 'react'
import { getTasks } from '../config/services/task'
import TaskCard from './TaskCard';

const TaskList = ({ status }) => {

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const params = { status };
      const result = await getTasks(params);
      setTasks(result?.data);
    } catch (error) {
      // toast.error('Failed to fetch tasks.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks()
  }, [status])

  return (
    <div className="task-list">
      <h3>{status?.toUpperCase()}</h3>
      {tasks?.map(task => {
        return <TaskCard key={task._id} task={task} />
      })}
    </div>
  )
}

export default TaskList