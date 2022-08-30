import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './routes/Login';
import Register from './routes/Register';
import Todo from './routes/Todo';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './components/Context';
import HomeRoute from './routes/HomeRoute';

const App = () => (
  <AuthProvider>
    <Routes>
      <Route element={<HomeRoute />}>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path='/todo' element={<Todo />} />
      </Route>
    </Routes>
  </AuthProvider>
);

export default App;
