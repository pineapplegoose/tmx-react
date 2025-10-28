import { Footer } from "./footer";
import { Nav } from "./nav";

export default function Layout({ children }: { children: React.ReactNode; }) {

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center">
            <Nav />
            <main className="w-full z-20 container-max px-12 flex-1">
                {children}
            </main>

            <Footer />
            <div className="background h-screen"></div>
        </div>
    );
}
