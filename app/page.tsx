import AuthForm from '@/components/AuthForm';

export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#030508' }}
    >
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: '#FFD700' }}>
          🎯 Resume Tailor
        </h1>
        <p className="text-gray-400 mb-6 text-center text-sm">
          Tailor your resume for every job application with ease.
        </p>

        {/* ✅ Login Form */}
        <AuthForm />

        {/* ✅ Footer */}
        <p className="text-xs text-gray-500 text-center mt-6">
          Powered by <span className="text-yellow-400">Supabase</span> | Resume Tailor © 2025
        </p>
      </div>
    </main>
  );
}
