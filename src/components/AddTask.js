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
        placeholder="Enviar relatório"
        required
      />
      <button type="submit">Adicionar</button>
      <button type="button" onClick={cancelEdit} class="edit-cancel">Cancelar</button>
    </form>
  );
};

export default AddTask;
