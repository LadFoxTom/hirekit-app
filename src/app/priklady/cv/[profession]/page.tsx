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
  const language: Language = 'cs'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  const profession = professionId ? getProfession(professionId, language) : null
  
  if (!profession) {
    return {
      title: 'Příklad nenalezen',
      description: 'Požadovaný příklad životopisu nebyl nalezen.'
    }
  }
  
  return {
    title: `Příklad CV ${profession.name} | LadderFox`,
    description: profession.description,
    keywords: [
      `cv ${profession.name.toLowerCase()}`,
      `příklad cv ${profession.name.toLowerCase()}`,
      'šablona cv',
      'profesionální cv'
    ],
    openGraph: {
      title: `Příklad CV ${profession.name}`,
      description: profession.description,
      type: 'website',
      locale: 'cs_CZ'
    },
    alternates: {
      canonical: `/priklady/cv/${params.profession}`
    }
  }
}

export async function generateStaticParams() {
  const language: Language = 'cs'
  
  return PROFESSIONS.map((prof) => {
    const translation = prof.translations[language] || prof.translations.en
    return {
      profession: translation.slug
    }
  })
}

export default function CzechCVExamplePage({ params }: PageProps) {
  const language: Language = 'cs'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  
  if (!professionId) {
    notFound()
  }
  
  return <ExamplePage professionId={professionId} type="cv" language={language} />
}
