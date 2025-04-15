'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import AuthForm from '@/app/components/auth/AuthForm';

export default function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();

  // Redirect if already signed in
  if (user) {
    router.replace('/');
    return null;
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Login</h1>

      <AuthForm
        label="Login"
        submit={(email, pw) =>
          login(email, pw).then(() => router.push('/'))
        }
      />

      <p className="text-sm mt-4">
        No account? <a href="/signup" className="underline">Sign up</a>
      </p>
    </div>
  );
}
