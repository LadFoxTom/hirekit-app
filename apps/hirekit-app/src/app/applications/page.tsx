import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { db } from '@repo/database-hirekit';
import { DashboardLayout } from '@/app/components/DashboardLayout';
import { StatusBadge } from '@/app/components/StatusBadge';
import { KanbanBoard } from './components/KanbanBoard';
import { JobFilter } from './components/JobFilter';

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: { status?: string; page?: string; view?: string; jobId?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect('/auth/login');

  const company = await db.company.findFirst({
    where: { ownerId: session.user.id },
  });
  if (!company) redirect('/onboarding');

  const status = searchParams.status || 'all';
  const page = parseInt(searchParams.page || '1', 10);
  const view = searchParams.view || 'table';
  const jobId = searchParams.jobId || '';
  const limit = 20;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = { companyId: company.id };
  if (status !== 'all') where.status = status;
  if (jobId) where.jobId = jobId;

  const [applications, total, jobs] = await Promise.all([
    db.application.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      ...(view === 'table' ? { skip, take: limit } : {}),
      include: { job: { select: { id: true, title: true } } },
    }),
    db.application.count({ where }),
    db.job.findMany({
      where: { companyId: company.id, active: true },
      select: { id: true, title: true },
      orderBy: { title: 'asc' },
    }),
  ]);

  const totalPages = Math.ceil(total / limit);
  const statusOptions = ['all', 'new', 'screening', 'interviewing', 'offered', 'hired', 'rejected'];

  const buildUrl = (params: Record<string, string>) => {
    const base: Record<string, string> = {};
    if (status !== 'all') base.status = status;
    if (view !== 'table') base.view = view;
    if (jobId) base.jobId = jobId;
    const merged = { ...base, ...params };
    const qs = new URLSearchParams(merged).toString();
    return `/applications${qs ? `?${qs}` : ''}`;
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1E293B]">Applications</h2>
            <p className="text-[#64748B] text-[15px] mt-1">{total} total applications</p>
          </div>
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1">
            <Link
              href={buildUrl({ view: 'table' })}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                view === 'table'
                  ? 'bg-[#4F46E5] text-white'
                  : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              <i className="ph-list text-base" />
            </Link>
            <Link
              href={buildUrl({ view: 'kanban' })}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                view === 'kanban'
                  ? 'bg-[#4F46E5] text-white'
                  : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              <i className="ph-kanban text-base" />
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {/* Status Filter */}
          <div className="flex gap-2 flex-wrap">
            {statusOptions.map((s) => (
              <Link
                key={s}
                href={buildUrl({ status: s === 'all' ? '' : s, page: '' })}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  status === s || (s === 'all' && status === 'all')
                    ? 'bg-[#4F46E5] text-white shadow-md shadow-indigo-500/25'
                    : 'bg-white text-[#64748B] border border-slate-200 hover:border-[#4F46E5] hover:text-[#4F46E5]'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Link>
            ))}
          </div>

          {/* Job Filter */}
          {jobs.length > 0 && (
            <JobFilter
              jobs={jobs}
              currentJobId={jobId}
              baseUrl={buildUrl({})}
            />
          )}
        </div>

        {/* Kanban View */}
        {view === 'kanban' ? (
          <KanbanBoard
            applications={applications.map((app) => ({
              id: app.id,
              name: app.name,
              email: app.email,
              status: app.status,
              aiScore: (app as any).aiScore ?? null,
              createdAt: app.createdAt.toISOString(),
              job: app.job,
            }))}
          />
        ) : (
          <>
            {/* Table View */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {applications.length === 0 ? (
                <div className="p-16 text-center">
                  <div className="w-16 h-16 bg-[#E0E7FF] rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ph-users text-[#4F46E5] text-2xl" />
                  </div>
                  <p className="text-[#64748B] text-[15px]">
                    {status === 'all'
                      ? 'No applications yet. Install the widget to start receiving CVs.'
                      : `No ${status} applications.`}
                  </p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-[#FAFBFC]">
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                        Applicant
                      </th>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                        Job
                      </th>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                        AI Score
                      </th>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.map((app) => {
                      const aiScore = (app as any).aiScore as number | null;
                      const scoreColor = aiScore
                        ? aiScore >= 80
                          ? '#16A34A'
                          : aiScore >= 60
                          ? '#D97706'
                          : '#DC2626'
                        : null;
                      return (
                        <tr
                          key={app.id}
                          className="hover:bg-[#FAFBFC] transition-colors duration-200"
                        >
                          <td className="px-6 py-4">
                            <Link
                              href={`/applications/${app.id}`}
                              className="font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors"
                            >
                              {app.name || 'Unnamed'}
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-sm text-[#64748B]">
                            {app.email}
                          </td>
                          <td className="px-6 py-4 text-sm text-[#64748B]">
                            {app.job?.title || '-'}
                          </td>
                          <td className="px-6 py-4">
                            {aiScore !== null && aiScore !== undefined ? (
                              <span
                                className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold"
                                style={{
                                  backgroundColor: `${scoreColor}15`,
                                  color: scoreColor!,
                                }}
                              >
                                {aiScore}%
                              </span>
                            ) : (
                              <span className="text-xs text-[#94A3B8]">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={app.status} />
                          </td>
                          <td className="px-6 py-4 text-sm text-[#94A3B8]">
                            {new Date(app.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-[#64748B]">
                  Page {page} of {totalPages}
                </p>
                <div className="flex gap-2">
                  {page > 1 && (
                    <Link
                      href={buildUrl({ page: String(page - 1) })}
                      className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-semibold text-[#1E293B] hover:border-[#4F46E5] transition-all"
                    >
                      Previous
                    </Link>
                  )}
                  {page < totalPages && (
                    <Link
                      href={buildUrl({ page: String(page + 1) })}
                      className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-semibold text-[#1E293B] hover:border-[#4F46E5] transition-all"
                    >
                      Next
                    </Link>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
