import Link from 'next/link';
import { JobCard } from './JobCard';

interface CareerTemplateProps {
  company: {
    name: string;
    slug: string;
  };
  branding: {
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string | null;
    fontFamily: string;
    showCompanyName: boolean;
    tagline: string | null;
  };
  landingPage: {
    title: string;
    subtitle: string | null;
    introText: string | null;
    heroImageUrl: string | null;
  };
  jobs: Array<{
    id: string;
    title: string;
    location: string | null;
    type: string | null;
    department: string | null;
    salaryMin: number | null;
    salaryMax: number | null;
    salaryCurrency: string | null;
    createdAt: Date;
  }>;
  departments: string[];
}

/* ─── Shared helpers ─── */

function EmptyState({ primaryColor }: { primaryColor: string }) {
  return (
    <div className="text-center py-20">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
        style={{ backgroundColor: `${primaryColor}10` }}
      >
        <i className="ph ph-briefcase text-2xl" style={{ color: primaryColor }} />
      </div>
      <p className="text-slate-500 text-lg font-medium">No open positions at the moment</p>
      <p className="text-slate-400 mt-1 text-sm">Check back later for new opportunities.</p>
    </div>
  );
}

function JobCount({ count, primaryColor }: { count: number; primaryColor: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: `${primaryColor}10`, color: primaryColor }}
    >
      <i className="ph ph-briefcase" />
      {count} open position{count !== 1 ? 's' : ''}
    </span>
  );
}

function DepartmentJobs({
  departments,
  jobs,
  slug,
  primaryColor,
  grid = false,
}: {
  departments: string[];
  jobs: CareerTemplateProps['jobs'];
  slug: string;
  primaryColor: string;
  grid?: boolean;
}) {
  if (departments.length > 1) {
    return (
      <>
        {departments.map((dept) => {
          const deptJobs = jobs.filter((j) => (j.department || 'Other') === dept);
          if (deptJobs.length === 0) return null;
          return (
            <div key={dept} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-1 h-5 rounded-full"
                  style={{ backgroundColor: primaryColor }}
                />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
                  {dept}
                  <span className="text-slate-400 font-normal ml-2">({deptJobs.length})</span>
                </h3>
              </div>
              <div className={grid ? 'grid md:grid-cols-2 gap-3' : 'space-y-3'}>
                {deptJobs.map((job) => (
                  <JobCard key={job.id} job={job} slug={slug} primaryColor={primaryColor} />
                ))}
              </div>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div className={grid ? 'grid md:grid-cols-2 gap-3' : 'space-y-3'}>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} slug={slug} primaryColor={primaryColor} />
      ))}
    </div>
  );
}

function Footer({ companyName, variant = 'light' }: { companyName: string; variant?: 'light' | 'dark' }) {
  const cls = variant === 'dark'
    ? 'py-8 text-center text-sm text-white/50'
    : 'border-t border-slate-200 py-8 text-center text-sm text-slate-400';
  return (
    <div className={cls}>
      <p>&copy; {new Date().getFullYear()} {companyName} &middot; Powered by HireKit</p>
    </div>
  );
}

function LogoHeader({
  branding,
  companyName,
  white = false,
}: {
  branding: CareerTemplateProps['branding'];
  companyName: string;
  white?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      {branding.logoUrl && (
        <img src={branding.logoUrl} alt={companyName} className="h-9" />
      )}
      {branding.showCompanyName && (
        <span className={`text-lg font-bold ${white ? 'text-white' : 'text-slate-900'}`}>
          {companyName}
        </span>
      )}
    </div>
  );
}

/* ─── Modern Template ─── */

export function ModernTemplate({ company, branding, landingPage, jobs, departments }: CareerTemplateProps) {
  return (
    <div style={{ fontFamily: branding.fontFamily }} className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${branding.primaryColor} 0%, ${branding.primaryColor}DD 50%, ${branding.primaryColor}BB 100%)`,
        }}
      >
        {/* Decorative shapes */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}
        />

        {landingPage.heroImageUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15"
            style={{ backgroundImage: `url(${landingPage.heroImageUrl})` }}
          />
        )}

        <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
          {branding.logoUrl && (
            <img src={branding.logoUrl} alt={company.name} className="h-14 mx-auto mb-8 drop-shadow-lg" />
          )}
          {!branding.logoUrl && branding.showCompanyName && (
            <p className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-3">
              {company.name}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
            {landingPage.title}
          </h1>
          {landingPage.subtitle && (
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
              {landingPage.subtitle}
            </p>
          )}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-sm font-medium text-white">
            <i className="ph ph-briefcase" />
            {jobs.length} open position{jobs.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Intro */}
      {landingPage.introText && (
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <p className="text-lg text-slate-600 leading-relaxed">{landingPage.introText}</p>
        </div>
      )}

      {/* Jobs */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Open Positions</h2>
        </div>

        <DepartmentJobs
          departments={departments}
          jobs={jobs}
          slug={company.slug}
          primaryColor={branding.primaryColor}
        />

        {jobs.length === 0 && <EmptyState primaryColor={branding.primaryColor} />}
      </div>

      <Footer companyName={company.name} />
    </div>
  );
}

/* ─── Minimal Template ─── */

export function MinimalTemplate({ company, branding, landingPage, jobs, departments }: CareerTemplateProps) {
  return (
    <div style={{ fontFamily: branding.fontFamily }} className="min-h-screen">
      {/* Accent bar */}
      <div className="h-1" style={{ backgroundColor: branding.primaryColor }} />

      {/* Header */}
      <div style={{ backgroundColor: `${branding.primaryColor}06` }}>
        <div className="max-w-3xl mx-auto px-6 pt-12 pb-10">
          <div className="mb-8">
            <LogoHeader branding={branding} companyName={company.name} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{landingPage.title}</h1>
          {landingPage.subtitle && (
            <p className="text-lg text-slate-500 mb-4">{landingPage.subtitle}</p>
          )}
          {landingPage.introText && (
            <p className="text-slate-600 leading-relaxed max-w-2xl">{landingPage.introText}</p>
          )}
          <div className="mt-6">
            <JobCount count={jobs.length} primaryColor={branding.primaryColor} />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-slate-200" />

      {/* Jobs */}
      <div className="max-w-3xl mx-auto px-6 py-10 pb-20">
        <DepartmentJobs
          departments={departments}
          jobs={jobs}
          slug={company.slug}
          primaryColor={branding.primaryColor}
        />

        {jobs.length === 0 && <EmptyState primaryColor={branding.primaryColor} />}
      </div>

      <Footer companyName={company.name} />
    </div>
  );
}

/* ─── Corporate Template ─── */

export function CorporateTemplate({ company, branding, landingPage, jobs, departments }: CareerTemplateProps) {
  return (
    <div style={{ fontFamily: branding.fontFamily }} className="bg-slate-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200">
        <div
          className="h-1"
          style={{ background: `linear-gradient(90deg, ${branding.primaryColor}, ${branding.primaryColor}60)` }}
        />
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <LogoHeader branding={branding} companyName={company.name} />
          <span
            className="text-sm font-medium px-3 py-1 rounded-full"
            style={{ backgroundColor: `${branding.primaryColor}10`, color: branding.primaryColor }}
          >
            Careers
          </span>
        </div>
      </nav>

      {/* Hero */}
      <div
        className="border-b border-slate-200"
        style={{ backgroundColor: `${branding.primaryColor}05` }}
      >
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{landingPage.title}</h1>
            {landingPage.subtitle && (
              <p className="text-xl text-slate-600 mb-4">{landingPage.subtitle}</p>
            )}
            {landingPage.introText && (
              <p className="text-slate-500 leading-relaxed">{landingPage.introText}</p>
            )}
            <div className="mt-6">
              <JobCount count={jobs.length} primaryColor={branding.primaryColor} />
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <DepartmentJobs
          departments={departments}
          jobs={jobs}
          slug={company.slug}
          primaryColor={branding.primaryColor}
          grid
        />

        {jobs.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200">
            <EmptyState primaryColor={branding.primaryColor} />
          </div>
        )}
      </div>

      <footer className="bg-white border-t border-slate-200 py-8 text-center text-sm text-slate-400">
        &copy; {new Date().getFullYear()} {company.name} &middot; Powered by HireKit
      </footer>
    </div>
  );
}

/* ─── Creative Template ─── */

export function CreativeTemplate({ company, branding, landingPage, jobs, departments }: CareerTemplateProps) {
  return (
    <div style={{ fontFamily: branding.fontFamily }} className="min-h-screen">
      {/* Gradient accent bar */}
      <div
        className="h-1.5"
        style={{
          background: `linear-gradient(90deg, ${branding.primaryColor}, ${branding.primaryColor}80, ${branding.primaryColor}30, transparent)`,
        }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: `radial-gradient(circle, ${branding.primaryColor} 0%, transparent 70%)`, transform: 'translate(30%, -40%)' }}
        />
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <div className="flex items-center gap-4 mb-10">
            {branding.logoUrl && (
              <img src={branding.logoUrl} alt={company.name} className="h-11" />
            )}
            {branding.showCompanyName && (
              <span className="text-2xl font-bold" style={{ color: branding.primaryColor }}>
                {company.name}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-5">
            {landingPage.title}
          </h1>
          {landingPage.subtitle && (
            <p className="text-xl text-slate-500 max-w-2xl mb-4">{landingPage.subtitle}</p>
          )}
          {landingPage.introText && (
            <p className="text-slate-600 max-w-2xl leading-relaxed">{landingPage.introText}</p>
          )}
          <div className="mt-8">
            <JobCount count={jobs.length} primaryColor={branding.primaryColor} />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-b border-slate-200" />
      </div>

      {/* Jobs */}
      <div className="max-w-4xl mx-auto px-6 py-10 pb-20">
        <DepartmentJobs
          departments={departments}
          jobs={jobs}
          slug={company.slug}
          primaryColor={branding.primaryColor}
        />

        {jobs.length === 0 && <EmptyState primaryColor={branding.primaryColor} />}
      </div>

      <div
        className="py-8 text-center text-sm"
        style={{ backgroundColor: branding.primaryColor }}
      >
        <Footer companyName={company.name} variant="dark" />
      </div>
    </div>
  );
}

export const CAREER_TEMPLATES: Record<string, React.FC<CareerTemplateProps>> = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  corporate: CorporateTemplate,
  creative: CreativeTemplate,
};
