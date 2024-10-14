import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  const formik = useFormik({
    initialValues: {
      task: '',
    },
    validationSchema: Yup.object({
      task: Yup.string().required('Task is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const newTasks = [...tasks, { id: Date.now(), text: values.task, completed: false }];
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      resetForm();
    },
  });

  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className="container">
      <h1 className="heading">To-Do List</h1>
      <form onSubmit={formik.handleSubmit} className="form">
        <input
          type="text"
          name="task"
          onChange={formik.handleChange}
          value={formik.values.task}
          onBlur={formik.handleBlur}
          placeholder="Add a new task"
          className="input"
        />
        {formik.touched.task && formik.errors.task ? (
          <div className="error">{formik.errors.task}</div>
        ) : null}
        <button type="submit" className="add-button">Add Task</button>
      </form>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'task-completed' : ''}`}>
            <span>{task.text}</span>
            <div>
              <button onClick={() => toggleTask(task.id)} className="toggle-button">
                {task.completed ? 'Undo' : 'Done'}
              </button>
              <button onClick={() => deleteTask(task.id)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
