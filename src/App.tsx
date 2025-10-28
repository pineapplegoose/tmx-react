import { Routes, Route, Navigate } from 'react-router';
import Layout from './components/Layout';
import Landing from './routes/Landing';
import Login from './routes/auth/Login';
import Signup from './routes/auth/Signup';
import Dashboard from './routes/Dashboard';
import Tickets from './routes/tickets/tickets';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tickets/*" element={<Tickets />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
