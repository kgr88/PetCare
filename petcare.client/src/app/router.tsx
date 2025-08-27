import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AnimalDetails from './pages/AnimalDetails';
import Dashboard from './pages/Dashboard';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login-page" element={<Login />} />
      <Route path="/register-page" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/animals/:id" element={<AnimalDetails />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
