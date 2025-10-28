import { useEffect, useState } from 'react';
import { fetchTickets } from '../services/ticketServices';
import { toast } from 'react-toastify';
import { Link } from 'react-router';
import { createTicket } from '../services/ticketServices';
import TicketForm from './tickets/ticketForm';

export default function Dashboard() {
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchTickets().then(setTickets).catch(() => toast.error('Failed to load tickets. Please retry.')).finally(() => setLoading(false));
    }, []);

    function load() {
        setLoading(true);
        fetchTickets().then(setTickets).catch(() => toast.error('Failed to load tickets. Please retry.')).finally(() => setLoading(false));
    }

    async function handleCreate(payload: any) {
        try {
            await createTicket(payload);
            toast.success('Ticket created');
            setShowForm(false);
            load();
        } catch (e: any) {
            toast.error(e.message || 'Create failed');
        }
    }


    const total = tickets.length;
    const open = tickets.filter(t => t.status === 'open').length;
    const closed = tickets.filter(t => t.status === 'closed').length;

    return (
        <div className="py-8">
            {showForm ? <div className="mb-6"><TicketForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} /></div> : <>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <h2 className="text-2xl text-white mb-4 lg:mb-0 font-bold">Dashboard</h2>
                    <div>
                        <button onClick={() => setShowForm(true)} className="px-3 py-2.5 bg-[#800080] rounded-md text-white ">New Ticket</button>
                        <Link to="/tickets" className="px-3 py-2 ml-2 rounded-md text-[#800080] bg-[#ffffff4e] border-2 border-[#800080]">Manage Tickets</Link>
                    </div>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="card p-4 pb-10 lg:pb-20">
                        <h4 className="text-sm text-slate-500">Total tickets</h4>
                        <div className="text-2xl font-semibold">{loading ? '...' : total}</div>
                    </div>
                    <div className="card p-4 pb-10 lg:pb-20">
                        <h4 className="text-sm text-slate-500">Open</h4>
                        <div className="text-2xl font-semibold text-green-600">{loading ? '...' : open}</div>
                    </div>
                    <div className="card p-4 pb-10 lg:pb-20">
                        <h4 className="text-sm text-slate-500">Closed</h4>
                        <div className="text-2xl font-semibold text-slate-600">{loading ? '...' : closed}</div>
                    </div>
                </div></>}
        </div>
    );
}
