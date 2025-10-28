
import { useForm } from 'react-hook-form';
import { signUpMock } from '../../services/authServices';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    name: z.string().min(2, 'Enter your name'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be 6+ chars'),
});
type FormData = z.infer<typeof schema>;

export default function Signup() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

    async function onSubmit(data: FormData) {
        try {
            await signUpMock(data);
            toast.success('Account created');
            navigate('/dashboard');
        } catch (err: any) {
            toast.error(err?.message || 'Signup failed');
        }
    }

    return (
        <div className="max-w-md h-[70vh] text-white flex flex-col justify-center mx-auto py-12">
            <h2 className="text-2xl  font-bold text-center">Create an account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium">Full name</label>
                    <input {...register('name')} className="mt-1 block bg-[#80008051] w-full rounded-md border-2 border-white p-2" />
                    {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input {...register('email')} className="mt-1 block bg-[#80008051] w-full rounded-md border-2 border-white p-2" />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input {...register('password')} type="password" className="mt-1 block bg-[#80008051] w-full rounded-md border-2 border-white p-2" />
                    {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>}
                </div>
                <div>
                    <button type="submit" disabled={isSubmitting} className="px-4 mt-4 py-2 bg-[#800080] text-white w-full rounded-md">Sign Up</button>
                </div>
            </form>
        </div>
    );
}
