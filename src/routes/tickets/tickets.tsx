import { useEffect, useState } from 'react';
import { fetchTickets, createTicket, updateTicket, deleteTicket } from '../../services/ticketServices';
import { toast } from 'react-toastify';
import TicketForm from './ticketForm';
import { Link } from 'react-router';

export default function Tickets() {
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<any | null>(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        load();
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
    async function handleUpdate(id: string, changes: any) {
        try {
            await updateTicket(id, changes);
            toast.success('Ticket updated');
            setEditing(null);
            load();
        } catch (e: any) {
            toast.error(e.message || 'Update failed');
        }
    }
    async function handleDelete(id: string) {
        if (!confirm('Delete this ticket?')) return;
        try {
            await deleteTicket(id);
            toast.success('Ticket deleted');
            load();
        } catch (e: any) {
            toast.error('Delete failed');
        }
    }

    return (
        <div className="py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h2 className="text-2xl mb-4 lg:mb-0 text-white font-bold">Tickets</h2>
                <div>
                    <button onClick={() => { setShowForm(s => !s); setEditing(null); }} className="px-3 py-2 bg-[#800080] rounded-md text-white">New Ticket</button>
                    <Link to="/dashboard" className="px-3 py-2 ml-2 rounded-md text-[#800080] bg-[#ffffff4e] border-2 border-[#800080]">Back to Dashboard</Link>
                </div>
            </div>

            {showForm && <div className="mb-6"><TicketForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} /></div>}

            {loading ? <div>Loading...</div> : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tickets.map(t => (
                        <div key={t.id} className="card p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-semibold">{t.title}</h4>
                                    <p className="text-sm text-slate-600 mt-1">{t.description}</p>
                                    <div className="mt-2">
                                        <span className={`inline-block px-2 py-1 text-xs rounded ${t.status === 'open' ? 'bg-green-100 text-green-800' : t.status === 'in_progress' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}`}>{t.status}</span>
                                        {t.priority && <span className="inline-block px-2 py-1 text-xs rounded ml-2 bg-slate-50 text-slate-700">{t.priority}</span>}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button onClick={() => { setEditing(t); }} className="text-sm px-2 py-1 border text-[#800080] border-[#800080] rounded">Edit</button>
                                    <button onClick={() => handleDelete(t.id)} className="text-sm px-2 py-1 border text-red-400 border-red-400 rounded">Delete</button>
                                </div>
                            </div>

                            {editing && editing.id === t.id && (
                                <div className="mt-4">
                                    <TicketForm initial={editing} onSubmit={(data) => handleUpdate(t.id, data)} onCancel={() => setEditing(null)} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
