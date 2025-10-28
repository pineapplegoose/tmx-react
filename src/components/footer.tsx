
export const Footer = () => {
    // const location = useLocation();
    //const isHomePage = location.pathname === '/';
    return (

        <footer className={`w-full text-white  z-20 container-max px-6 py-8 text-sm `}>
            <div className="text-center">© {new Date().getFullYear()} TicketApp — Built for the challenge</div>
        </footer>
    )
}