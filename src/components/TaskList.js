// TaskList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompleted = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    await axios.put(`http://localhost:5000/tasks/${task.id}`, updatedTask);
    setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t)));
  };

  return (
    <div className="task-list">
      <h1>Task List</h1>
      <Link to="/add">Add Task</Link>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </span>
            <button onClick={() => toggleCompleted(task)}>
              {task.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
            </button>
            <Link to={`/edit/${task.id}`}>Edit</Link>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
