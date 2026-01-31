import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ExamplePage from '@/components/examples/ExamplePage'
import { getProfession, getProfessionIdFromSlug, PROFESSIONS } from '@/data/professions'
import type { Language } from '@/data/professions'

interface PageProps {
  params: {
    profession: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const language: Language = 'sv'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  const profession = professionId ? getProfession(professionId, language) : null
  
  if (!profession) {
    return {
      title: 'Exempel hittades inte',
      description: 'Det begärda CV-exemplet kunde inte hittas.'
    }
  }
  
  return {
    title: `${profession.name} CV Exempel | LadderFox`,
    description: profession.description,
    keywords: [
      `cv ${profession.name.toLowerCase()}`,
      `cv exempel ${profession.name.toLowerCase()}`,
      'cv mall',
      'professionellt cv'
    ],
    openGraph: {
      title: `${profession.name} CV Exempel`,
      description: profession.description,
      type: 'website',
      locale: 'sv_SE'
    },
    alternates: {
      canonical: `/exempel/cv/${params.profession}`
    }
  }
}

export async function generateStaticParams() {
  const language: Language = 'sv'
  
  return PROFESSIONS.map((prof) => {
    const translation = prof.translations[language] || prof.translations.en
    return {
      profession: translation.slug
    }
  })
}

export default function SwedishCVExamplePage({ params }: PageProps) {
  const language: Language = 'sv'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  
  if (!professionId) {
    notFound()
  }
  
  return <ExamplePage professionId={professionId} type="cv" language={language} />
}
