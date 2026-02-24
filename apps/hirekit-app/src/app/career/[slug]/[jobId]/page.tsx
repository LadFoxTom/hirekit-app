import { notFound } from 'next/navigation';
import { db } from '@repo/database-hirekit';
import { Metadata } from 'next';
import Link from 'next/link';
import { ApplicationForm } from '../components/ApplicationForm';
import { ensureHtml } from '@/lib/html-utils';

interface PageProps {
  params: { slug: string; jobId: string };
}

async function getJobData(slug: string, jobId: string) {
  const company = await db.company.findFirst({
    where: { slug },
    include: {
      branding: true,
      landingPage: true,
    },
  });

  if (!company || !company.landingPage?.published) return null;

  const job = await db.job.findFirst({
    where: { id: jobId, companyId: company.id, active: true },
  });

  if (!job) return null;
  return { company, job };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = await getJobData(params.slug, params.jobId);
  if (!data) return {};

  const { company, job } = data;
  const title = `${job.title} at ${company.name}`;
  const description = job.description?.slice(0, 160) || `Apply for ${job.title} at ${company.name}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      ...(company.landingPage?.socialImageUrl && {
        images: [{ url: company.landingPage.socialImageUrl }],
      }),
    },
  };
}

const TYPE_LABELS: Record<string, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  contract: 'Contract',
  internship: 'Internship',
  freelance: 'Freelance',
};

export default async function JobDetailPage({ params }: PageProps) {
  const data = await getJobData(params.slug, params.jobId);
  if (!data) notFound();

  const { company, job } = data;
  const branding = company.branding || { primaryColor: '#4F46E5', logoUrl: null, fontFamily: 'Inter', showCompanyName: true };
  const primaryColor = branding.primaryColor;

  const salaryPeriod = (job as any).salaryPeriod || 'year';
  const periodLabel = salaryPeriod === 'month' ? '/mo' : salaryPeriod === 'hour' ? '/hr' : '/yr';
  const showSalary = (job as any).showSalary !== false;
  const salary = showSalary && (job.salaryMin || job.salaryMax)
    ? job.salaryMin && job.salaryMax
      ? `${job.salaryMin.toLocaleString()}-${job.salaryMax.toLocaleString()} ${job.salaryCurrency || 'EUR'}${periodLabel}`
      : job.salaryMin
        ? `From ${job.salaryMin.toLocaleString()} ${job.salaryCurrency || 'EUR'}${periodLabel}`
        : `Up to ${job.salaryMax!.toLocaleString()} ${job.salaryCurrency || 'EUR'}${periodLabel}`
    : null;

  const workplaceLabels: Record<string, string> = { 'on-site': 'On-site', hybrid: 'Hybrid', remote: 'Remote' };
  const experienceLabels: Record<string, string> = { entry: 'Entry Level', mid: 'Mid Level', senior: 'Senior', lead: 'Lead', director: 'Director', executive: 'Executive' };
  const unitTextMap: Record<string, string> = { year: 'YEAR', month: 'MONTH', hour: 'HOUR' };

  // Build employment types for JSON-LD
  const employmentTypes: string[] = (job as any).employmentTypes?.length
    ? (job as any).employmentTypes.map((t: string) => t.toUpperCase().replace('-', '_'))
    : job.type ? [job.type.toUpperCase().replace('-', '_')] : [];

  // JSON-LD for this specific job
  const jsonLd: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description || '',
    datePosted: job.createdAt.toISOString().split('T')[0],
    hiringOrganization: {
      '@type': 'Organization',
      name: company.name,
      ...(branding.logoUrl && { logo: branding.logoUrl }),
    },
    ...((job.city || job.region || job.country) && {
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          ...(job.city && { addressLocality: job.city }),
          ...(job.region && { addressRegion: job.region }),
          ...(job.country && { addressCountry: job.country }),
        },
      },
    }),
    ...(employmentTypes.length && { employmentType: employmentTypes.length === 1 ? employmentTypes[0] : employmentTypes }),
    ...((job as any).workplaceType === 'remote' && { jobLocationType: 'TELECOMMUTE' }),
    ...((job as any).experienceLevel && { experienceRequirements: experienceLabels[(job as any).experienceLevel] || (job as any).experienceLevel }),
    ...(job.salaryMin && {
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: job.salaryCurrency || 'EUR',
        value: {
          '@type': 'QuantitativeValue',
          minValue: job.salaryMin,
          ...(job.salaryMax && { maxValue: job.salaryMax }),
          unitText: unitTextMap[salaryPeriod] || 'YEAR',
        },
      },
    }),
  };

  return (
    <div style={{ fontFamily: branding.fontFamily }} className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <nav className="bg-white sticky top-0 z-10 border-b border-slate-200">
        <div
          className="h-1"
          style={{ background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}60)` }}
        />
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href={`/career/${params.slug}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            {branding.logoUrl && (
              <img src={branding.logoUrl} alt={company.name} className="h-8" />
            )}
            {branding.showCompanyName && (
              <span className="font-bold text-slate-900">{company.name}</span>
            )}
          </Link>
          <Link
            href={`/career/${params.slug}`}
            className="text-sm font-medium flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            style={{ color: primaryColor }}
          >
            <i className="ph ph-arrow-left text-xs" />
            All Jobs
          </Link>
        </div>
      </nav>

      {/* Job Title Area */}
      <div style={{ backgroundColor: `${primaryColor}05` }} className="border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5">{job.title}</h1>
          <div className="flex flex-wrap items-center gap-2.5 text-sm">
            {job.location && (
              <span className="flex items-center gap-1.5 text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                <i className="ph ph-map-pin" style={{ color: primaryColor }} />
                {job.location}
              </span>
            )}
            {(job as any).workplaceType && (
              <span
                className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{ backgroundColor: `${primaryColor}12`, color: primaryColor }}
              >
                {workplaceLabels[(job as any).workplaceType] || (job as any).workplaceType}
              </span>
            )}
            {((job as any).employmentTypes?.length > 0 ? (job as any).employmentTypes : job.type ? [job.type] : []).map((t: string) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{ backgroundColor: `${primaryColor}12`, color: primaryColor }}
              >
                {TYPE_LABELS[t] || t}
              </span>
            ))}
            {(job as any).experienceLevel && (
              <span className="flex items-center gap-1.5 text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                <i className="ph ph-chart-line-up" style={{ color: primaryColor }} />
                {experienceLabels[(job as any).experienceLevel] || (job as any).experienceLevel}
              </span>
            )}
            {job.department && (
              <span className="flex items-center gap-1.5 text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                <i className="ph ph-buildings" style={{ color: primaryColor }} />
                {job.department}
              </span>
            )}
            {salary && (
              <span className="flex items-center gap-1.5 text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                <i className="ph ph-currency-circle-dollar" style={{ color: primaryColor }} />
                {salary}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Job Content */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Description */}
        {job.description && (
          <div className="mb-10">
            <div
              className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-a:no-underline"
              dangerouslySetInnerHTML={{ __html: ensureHtml(job.description) }}
            />
          </div>
        )}

        {/* Requirements */}
        {(job as any).requirements && (
          <div className="mb-10">
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${primaryColor}10` }}
              >
                <i className="ph ph-list-checks text-sm" style={{ color: primaryColor }} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Requirements</h2>
            </div>
            <div
              className="prose prose-slate max-w-none prose-headings:text-slate-900"
              dangerouslySetInnerHTML={{ __html: ensureHtml((job as any).requirements) }}
            />
          </div>
        )}

        {/* Benefits */}
        {((job as any).benefits || (job as any).benefitTags?.length > 0) && (
          <div className="mb-10">
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${primaryColor}10` }}
              >
                <i className="ph ph-gift text-sm" style={{ color: primaryColor }} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Benefits & Perks</h2>
            </div>
            {(job as any).benefitTags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {(job as any).benefitTags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={{ backgroundColor: `${primaryColor}10`, color: primaryColor }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {(job as any).benefits && (
              <div
                className="prose prose-slate max-w-none prose-headings:text-slate-900"
                dangerouslySetInnerHTML={{ __html: ensureHtml((job as any).benefits) }}
              />
            )}
          </div>
        )}

        {/* Application Form */}
        <ApplicationForm
          companyId={company.id}
          jobId={job.id}
          primaryColor={primaryColor}
        />
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 py-8 text-center text-sm text-slate-400">
        <p>&copy; {new Date().getFullYear()} {company.name} &middot; Powered by HireKit</p>
      </div>
    </div>
  );
}
