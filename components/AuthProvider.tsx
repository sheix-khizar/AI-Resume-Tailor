'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabase';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleMagicLink = async () => {
      try {
        const hash = window.location.hash;

        // ✅ Detect magic link
        if (hash.includes('access_token')) {
          const params = new URLSearchParams(hash.substring(1));
          const access_token = params.get('access_token');
          const refresh_token = params.get('refresh_token');

          if (access_token && refresh_token) {
            // ✅ Try setting session in Supabase
            await supabase.auth.setSession({ access_token, refresh_token });

            // ✅ Save flag in localStorage
            localStorage.setItem('logged_in', 'true');

            // ✅ Clean URL & redirect
            window.history.replaceState({}, '', '/dashboard');
            router.replace('/dashboard');
            setLoading(false);
            return;
          }
        }

        // ✅ If we already flagged login, skip session check
        if (localStorage.getItem('logged_in') === 'true') {
          setLoading(false);
          return;
        }

        // ✅ Normal session check
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          localStorage.setItem('logged_in', 'true');
          router.replace('/dashboard');
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error('Auth Error:', err);
        setLoading(false);
      }
    };

    handleMagicLink();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        localStorage.setItem('logged_in', 'true');
        router.replace('/dashboard');
      }
    });

    return () => subscription.subscription.unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-300 bg-[#030508]">
        🔄 Checking login...
      </div>
    );
  }

  return <>{children}</>;
}
