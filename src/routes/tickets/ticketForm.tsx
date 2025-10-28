import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    title: z.string().min(3, 'Title must be at least 3 chars'),
    status: z.enum(['open', 'in_progress', 'closed']),
    description: z.string().max(2000).optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
});

type Schema = z.infer<typeof schema>;

export default function TicketForm({ initial, onSubmit, onCancel }: { initial?: Partial<Schema>, onSubmit: (d: any) => void, onCancel?: () => void }) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Schema>({
        defaultValues: { title: '', status: 'open', description: '', priority: undefined, ...initial },
        resolver: zodResolver(schema)
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-white">
            <div>
                <label className="block text-sm font-medium">Title</label>
                <input {...register('title')} className="mt-1 block w-full rounded-md bg-[#80008051] border-2 border-white p-2" />
                {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title.message}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium">Status</label>
                <select {...register('status')} className="mt-1 block w-full rounded-md bg-[#80008051] border-2 border-white p-2">
                    <option value="open">Open</option>
                    <option value="in_progress">In progress</option>
                    <option value="closed">Closed</option>
                </select>
                {errors.status && <p className="text-xs text-red-600 mt-1">{errors.status.message}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium">Priority</label>
                <select {...register('priority')} className="mt-1 block w-full rounded-md bg-[#80008051] border-2 border-white p-2">
                    <option value="">None</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea {...register('description')} rows={4} className="mt-1 block w-full rounded-md bg-[#80008051] border-2 border-white p-2"></textarea>
                {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description.message}</p>}
            </div>
            <div className="flex gap-2 mt-4">
                <button type="submit" disabled={isSubmitting} className="px-3 py-2 rounded-md bg-[#800080] text-white">Save</button>
                {onCancel && <button type="button" onClick={onCancel} className="px-3 py-2 rounded-md border-2 text-white ">Cancel</button>}
            </div>
        </form>
    );
}
