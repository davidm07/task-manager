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

  const cancelEdit = () => {
    navigate('/'); 
  };

  return (
    <form onSubmit={updateTask}>
      <h1>Editar Tarefa</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enviar relatório"
        required
      />
      <button type="submit">Atualizar</button>
      <button type="button" onClick={cancelEdit} class="edit-cancel">Cancelar</button>
    </form>
  );
};

export default EditTask;
