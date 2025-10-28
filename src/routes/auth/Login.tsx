
import { useForm } from 'react-hook-form';
import { signInMock } from '../../services/authServices';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(1, 'Password required')
});
type FormData = z.infer<typeof schema>;

export default function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

    async function onSubmit(data: FormData) {
        try {
            await signInMock(data);
            toast.success('Logged in');
            navigate('/dashboard');
            window.location.reload();
        } catch (err: any) {
            toast.error(err?.message || 'Login failed');
        }
    }

    return (
        <div className="max-w-md h-[70vh] text-white flex flex-col justify-center mx-auto py-12">
            <h2 className="text-2xl text-white font-bold text-center">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input {...register('email')} className="mt-1 block w-full bg-[#80008051] rounded-md border-2 border-white p-2" />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input {...register('password')} type="password" className="mt-1 block bg-[#80008051] w-full rounded-md border-2 border-white p-2" />
                    <button type="button" onClick={() => { toast.info('Try user@example.com / password') }} className="text-sm font-bold text-slate-100">Hint</button>
                    {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>}
                </div>
                <div className="flex items-center mt-4 justify-between">
                    <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-[#800080] text-white rounded-md">Login</button>
                    <button type='button' className="text-sm text-slate-100">Are you new here? <Link to="/auth/signup">Sign up here</Link></button>

                </div>
            </form>
        </div>
    );
}
