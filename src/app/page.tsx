'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  const handleSelectRole = (role: 'client' | 'specialist') => {
    router.push(`/register/${role}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800">¡Bienvenido a ServiExpress!</h1>
        <p className="text-gray-500 mt-2">Selecciona cómo deseas registrarte</p>
      </motion.div>

      <motion.div
        className="flex flex-col space-y-4 w-full max-w-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <button
          onClick={() => handleSelectRole('client')}
          className="w-full py-4 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
        >
          Registrarse como Cliente
        </button>

        <button
          onClick={() => handleSelectRole('specialist')}
          className="w-full py-4 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition"
        >
          Registrarse como Especialista
        </button>
      </motion.div>
    </div>
  );
}
