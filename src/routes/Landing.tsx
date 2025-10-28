import { Link } from 'react-router';
import homeImage from '../assets/homepageimage.jpg'
export default function Landing() {
    return (
        <section className=" relative overflow-hidden flex flex-col pr-10 lg:py-16 justify-center md:h-[80vh] ">
            <div className="container-max px-6 flex flex-col justify-center  md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                    <h1 className="text-3xl lg:text-4xl text-white md:text-5xl font-extrabold">TicketApp — Track issues clearly</h1>
                    <p className="mt-4 lg:text-lg text-slate-100 max-w-xl">
                        A simple ticket manager for teams & demos. Create, edit, and resolve issues fast.
                    </p>
                    <div className="mt-6 flex gap-3">
                        <Link to="/auth/signup" className="px-4 py-2  shadow-sm border border-white text-white rounded-md">Get Started</Link>
                        <Link to="/auth/login" className="px-4 py-2 text-white bg-[#a64ca6]  rounded-md">Login</Link>
                    </div>

                    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-1 lg:gap-4">
                        <div className="card p-4">
                            <h4 className="font-semibold">Fast</h4>
                            <p className="text-sm text-slate-600">Create tickets in seconds.</p>
                        </div>
                        <div className="card p-4">
                            <h4 className="font-semibold">Responsive</h4>
                            <p className="text-sm text-slate-600">Works on mobile & desktop.</p>
                        </div>
                        <div className="card p-4">
                            <h4 className="font-semibold">Accessible</h4>
                            <p className="text-sm text-slate-600">Built with semantic HTML.</p>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2 lg:w-[400px] lg:ml-30 relative w-[200px]  hidden md:block">
                    <div className="absolute -top-8 -right-16 w-40 h-40 rounded-full hero-circle"></div>
                    <div className="absolute top-16 right-8 w-24 h-24 rounded-full hero-circle opacity-60"></div>

                    <div className="card p-6">
                        <img className='rounded-2xl h-[200px]' src={homeImage} alt="hero" />
                    </div>
                </div>
            </div>
        </section>
    );
}
