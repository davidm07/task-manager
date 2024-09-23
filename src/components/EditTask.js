import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); 
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const response = await axios.get(`http://localhost:5000/tasks/${id}`);
      setTitle(response.data.title);
      setDescription(response.data.description); 
    };
    fetchTask();
  }, [id]);

  const updateTask = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/tasks/${id}`, { title, description }); 
    navigate('/'); // Redirect to TaskList after updating
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
        placeholder="Título da tarefa"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Descrição da tarefa"
        required
      />
      <button type="submit">Atualizar</button>
      <button type="button" onClick={cancelEdit} className="edit-cancel">Cancelar</button>
    </form>
  );
};

export default EditTask;
