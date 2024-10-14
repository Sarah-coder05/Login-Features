// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Component/Login';
import WeatherDashboard from './Component/WeatherDashboard';
import TodoList from './Component/TodoList';

const App = () => {
  // Clear the authentication status on every page reload
  useEffect(() => {
    localStorage.removeItem('isAuthenticated');
  }, []);

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      <Routes>
        {/* Always go to login page on page load */}
        <Route path="/" element={<Login />} />
        
        {/* Weather Dashboard route */}
        <Route
          path="/weather"
          element={isAuthenticated ? <WeatherDashboard /> : <Navigate to="/" />}
        />
        
        {/* To-Do List route */}
        <Route
          path="/todolist"
          element={isAuthenticated ? <TodoList /> : <Navigate to="/" />}
        />
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
