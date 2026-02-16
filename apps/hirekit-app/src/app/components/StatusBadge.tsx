'use client';

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  new: { bg: '#E0E7FF', text: '#4F46E5', label: 'New' },
  screening: { bg: '#FEF3C7', text: '#D97706', label: 'Screening' },
  interviewing: { bg: '#DBEAFE', text: '#2563EB', label: 'Interviewing' },
  offered: { bg: '#F3E8FF', text: '#7C3AED', label: 'Offered' },
  hired: { bg: '#DCFCE7', text: '#16A34A', label: 'Hired' },
  rejected: { bg: '#FEE2E2', text: '#DC2626', label: 'Rejected' },
  // Legacy statuses
  reviewing: { bg: '#FEF3C7', text: '#D97706', label: 'Reviewing' },
  shortlisted: { bg: '#DCFCE7', text: '#16A34A', label: 'Shortlisted' },
};

export const PIPELINE_STATUSES = ['new', 'screening', 'interviewing', 'offered', 'hired', 'rejected'] as const;

export function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLES[status] || { bg: '#F1F5F9', text: '#64748B', label: status };
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      {s.label}
    </span>
  );
}
