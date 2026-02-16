'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const formData = new FormData(e.currentTarget);

    const password = formData.get('password') as string;
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          password,
          companyName: formData.get('companyName'),
        }),
      });

      if (res.ok) {
        router.push('/auth/login?registered=true');
      } else {
        const data = await res.json();
        setError(data.error || 'Signup failed');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-hk-bg flex flex-col">
      {/* Header */}
      <header className="py-6 px-6">
        <div className="max-w-container mx-auto">
          <Link href="/" className="text-2xl font-extrabold text-hk-primary flex items-center gap-2">
            <i className="ph-fill ph-circles-three-plus text-[32px]" />
            HireKit
          </Link>
        </div>
      </header>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-6 pb-20">
        <div className="w-full max-w-[440px]">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-hk-dark">Create your account</h1>
            <p className="text-slate-500 mt-2">Get started with HireKit in minutes</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            {/* Google Button (greyed out) */}
            <button
              disabled
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 font-semibold text-sm cursor-not-allowed relative group"
            >
              <svg className="w-5 h-5 opacity-40" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-hk-dark text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Coming soon
              </span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400 font-medium uppercase">or</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-hk-dark mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-hk-dark placeholder:text-slate-400 focus:outline-none focus:border-hk-primary focus:ring-2 focus:ring-hk-primary/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-hk-dark mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  required
                  placeholder="Acme Inc."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-hk-dark placeholder:text-slate-400 focus:outline-none focus:border-hk-primary focus:ring-2 focus:ring-hk-primary/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-hk-dark mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-hk-dark placeholder:text-slate-400 focus:outline-none focus:border-hk-primary focus:ring-2 focus:ring-hk-primary/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-hk-dark mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={8}
                  placeholder="At least 8 characters"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-hk-dark placeholder:text-slate-400 focus:outline-none focus:border-hk-primary focus:ring-2 focus:ring-hk-primary/10 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-hk-primary text-white rounded-xl font-semibold text-sm hover:bg-[#4338CA] transition-all duration-300 disabled:opacity-50 shadow-md shadow-indigo-500/25"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
          </div>

          <p className="mt-6 text-sm text-center text-slate-500">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-hk-primary font-semibold hover:text-[#4338CA] transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
