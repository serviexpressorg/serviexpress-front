'use client';

import { RegisterForm } from '@/widgets/RegisterForm';
import { useParams } from 'next/navigation';

export default function RegisterPage() {
    const params = useParams();
    const { type } = params;
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <RegisterForm role={type as 'client' | 'specialist'} />
        </div>
    );
}
