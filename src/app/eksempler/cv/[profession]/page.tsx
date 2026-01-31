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
  const language: Language = 'da'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  const profession = professionId ? getProfession(professionId, language) : null
  
  if (!profession) {
    return {
      title: 'Eksempel ikke fundet',
      description: 'Det ønskede CV-eksempel blev ikke fundet.'
    }
  }
  
  return {
    title: `${profession.name} CV Eksempel | LadderFox`,
    description: profession.description,
    keywords: [
      `cv ${profession.name.toLowerCase()}`,
      `cv eksempel ${profession.name.toLowerCase()}`,
      'cv skabelon',
      'professionelt cv'
    ],
    openGraph: {
      title: `${profession.name} CV Eksempel`,
      description: profession.description,
      type: 'website',
      locale: 'da_DK'
    },
    alternates: {
      canonical: `/eksempler/cv/${params.profession}`
    }
  }
}

export async function generateStaticParams() {
  const language: Language = 'da'
  
  return PROFESSIONS.map((prof) => {
    const translation = prof.translations[language] || prof.translations.en
    return {
      profession: translation.slug
    }
  })
}

export default function DanishCVExamplePage({ params }: PageProps) {
  const language: Language = 'da'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  
  if (!professionId) {
    notFound()
  }
  
  return <ExamplePage professionId={professionId} type="cv" language={language} />
}
