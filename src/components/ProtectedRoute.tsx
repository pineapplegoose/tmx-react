import { Navigate, Outlet } from 'react-router';
import { getSession } from '../services/authServices';

export default function ProtectedRoute() {
    const session = getSession();
    if (!session || new Date(session.expiresAt) < new Date()) {
        localStorage.removeItem('ticketapp_session');
        return <Navigate to="/auth/login" replace />;
    }
    return <Outlet />;
}
