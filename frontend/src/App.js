import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserPage from './components/UserPage';
import AdminPage from './components/AdminPage';

function App() {
  const isAdmin = true; // Aqui você pode implementar uma lógica real para verificar se o usuário é admin.

  return (
    <Router>
      <Routes>
        <Route path="/user" element={<UserPage />} />
        <Route path="/admin" element={isAdmin ? <AdminPage /> : <Navigate to="/user" />} />
        <Route path="*" element={<Navigate to="/user" />} />
      </Routes>
    </Router>
  );
}

export default App;
