'use client';
import { useState } from 'react';
import supabase from '@/lib/supabase';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setError('⚠️ Failed to send magic link. Please try again.');
    } else {
      setSent(true);
    }
  };

  return (
    <div>
      <label className="block text-gray-300 text-sm mb-2">Enter your email</label>
      <input
        type="email"
        className="border border-gray-700 bg-gray-800 text-gray-200 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="mt-4 w-full bg-yellow-500 text-black font-semibold py-2 rounded hover:bg-yellow-400 transition cursor-pointer"
      >
        ✉️ Send Magic Link
      </button>

      {sent && <p className="text-green-400 mt-3 text-sm">✅ Magic link sent! Check your inbox.</p>}
      {error && <p className="text-red-400 mt-3 text-sm">{error}</p>}
    </div>
  );
}
