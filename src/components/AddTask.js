import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const addTask = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/tasks', { title });
    navigate('/');
  };

  return (
    <form onSubmit={addTask}>
      <h1>Add Task</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTask;
