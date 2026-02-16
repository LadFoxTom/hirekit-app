'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function JobActions({ jobId, active }: { jobId: string; active: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggleActive = async () => {
    setLoading(true);
    try {
      await fetch(`/api/v1/jobs/${jobId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !active }),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleActive}
      disabled={loading}
      className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-50 ${
        active
          ? 'bg-white text-[#DC2626] border border-red-200 hover:bg-red-50'
          : 'bg-white text-[#16A34A] border border-green-200 hover:bg-green-50'
      }`}
    >
      {loading ? '...' : active ? 'Deactivate' : 'Activate'}
    </button>
  );
}
