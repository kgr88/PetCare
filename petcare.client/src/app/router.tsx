import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AnimalDetails from './pages/AnimalDetails';
import Dashboard from './pages/Dashboard';
import AuthorizeView from '@/features/auth/AuthorizeView';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login-page" element={<Login />} />
      <Route path="/register-page" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route
        path="/animals/:id"
        element={
          <AuthorizeView>
            <AnimalDetails />
          </AuthorizeView>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AuthorizeView>
            <Dashboard />
          </AuthorizeView>
        }
      />
    </Routes>
  );
}
