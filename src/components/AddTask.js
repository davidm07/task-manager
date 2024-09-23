import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const addTask = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/tasks', { title, description }); 
    navigate('/');
  };

  const cancelEdit = () => {
    navigate('/'); 
  };

  return (
    <form onSubmit={addTask}>
      <h1>Adicionar Tarefa</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título da tarefa"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Descrição da tarefa"
        required
      />
      <button type="submit">Adicionar</button>
      <button type="button" onClick={cancelEdit} className="edit-cancel">Cancelar</button>
    </form>
  );
};

export default AddTask;
