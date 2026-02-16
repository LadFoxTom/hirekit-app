'use client';

import { useRouter } from 'next/navigation';

export function JobFilter({
  jobs,
  currentJobId,
  baseUrl,
}: {
  jobs: { id: string; title: string }[];
  currentJobId: string;
  baseUrl: string;
}) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-[#94A3B8]">Job:</span>
      <select
        value={currentJobId}
        onChange={(e) => {
          const val = e.target.value;
          const params = new URLSearchParams(baseUrl.split('?')[1] || '');
          if (val) {
            params.set('jobId', val);
          } else {
            params.delete('jobId');
          }
          params.delete('page');
          const qs = params.toString();
          router.push(`/applications${qs ? `?${qs}` : ''}`);
        }}
        className="px-3 py-2 rounded-xl border border-slate-200 text-sm text-[#1E293B] bg-white focus:outline-none focus:border-[#4F46E5]"
      >
        <option value="">All Jobs</option>
        {jobs.map((j) => (
          <option key={j.id} value={j.id}>
            {j.title}
          </option>
        ))}
      </select>
    </div>
  );
}
