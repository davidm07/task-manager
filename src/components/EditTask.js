import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditTask = () => {
  const [title, setTitle] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const response = await axios.get(`http://localhost:5000/tasks/${id}`);
      setTitle(response.data.title);
    };
    fetchTask();
  }, [id]);

  const updateTask = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/tasks/${id}`, { title });
    navigate('/');
  };

  return (
    <form onSubmit={updateTask}>
      <h1>Edit Task</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditTask;
