'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabase';
import ResumeForm from '@/components/ResumeForm';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/');
      } else {
        setUserEmail(session.user?.email || null);
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-300 bg-[#030508]">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#030508] text-gray-200 px-6 py-8">
      <div className="max-w-4xl mx-auto bg-[#0b0f1a] border border-gray-700 rounded-xl shadow-2xl p-8">
        {/* Header */}
        <header className="flex justify-between items-center border-b border-gray-700 pb-4 mb-6">
          <h1 className="text-3xl font-extrabold text-yellow-400 tracking-wide">🎯 Resume Tailor</h1>
          <div className="text-sm text-gray-400">{userEmail}</div>
        </header>

        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-100">Welcome Back!</h2>
          <p className="text-gray-400 mt-1">
            Tailor your resume for every job application with precision and ease.
          </p>
        </div>

        {/* Resume Form */}
        <ResumeForm />

        {/* Logout */}
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push('/');
          }}
          className="mt-8 w-full py-3 rounded-md font-semibold transition-all duration-300 bg-red-600 hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
