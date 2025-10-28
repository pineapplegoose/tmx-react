import { Link, useLocation, useNavigate } from 'react-router';
import { getSession, signOut } from '../services/authServices';

export const Nav = () => {

    const session = getSession();
    const navItems = session ? [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/tickets', label: 'Tickets' },
    ] : [];

    const navigate = useNavigate();
    //const location = useLocation()
    function handleLogout() {
        signOut();
        window.location.reload();
        navigate('/');
    }
    //const isHomePage = location.pathname === '/';
    return (
        <header className="w-full z-20 container-max px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <Link to="/" className={`text-white text-xl mr-10 font-bold`}>TMX</Link>
                <nav className="hidden md:flex gap-4 text-sm text-slate-100">
                    {navItems.map(i => <Link key={i.to} to={i.to}>{i.label}</Link>)}
                </nav>
            </div>
            <div className="flex items-center gap-4">
                {session ? (
                    <>
                        <span className="hidden md:inline text-sm text-slate-100">Hi, {session.user.name}</span>
                        <button onClick={handleLogout} className="px-3 py-2 ml-2 rounded-md text-[#800080] bg-[#ffffff4e] border-2 border-[#800080]">Logout</button>
                    </>
                ) : (
                    ''
                )}
            </div>
        </header>
    )
}