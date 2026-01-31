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
  const language: Language = 'ro'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  const profession = professionId ? getProfession(professionId, language) : null
  
  if (!profession) {
    return {
      title: 'Exemplu negăsit',
      description: 'Exemplul de scrisoare de intenție solicitat nu a fost găsit.'
    }
  }
  
  return {
    title: `Exemplu Scrisoare de Intenție ${profession.name} | LadderFox`,
    description: profession.description,
    keywords: [
      `scrisoare intenție ${profession.name.toLowerCase()}`,
      `exemplu scrisoare ${profession.name.toLowerCase()}`,
      'model scrisoare intenție'
    ],
    openGraph: {
      title: `Exemplu Scrisoare de Intenție ${profession.name}`,
      description: profession.description,
      type: 'website',
      locale: 'ro_RO'
    },
    alternates: {
      canonical: `/exemple/scrisoare/${params.profession}`
    }
  }
}

export async function generateStaticParams() {
  const language: Language = 'ro'
  
  return PROFESSIONS.map((prof) => {
    const translation = prof.translations[language] || prof.translations.en
    return {
      profession: translation.slug
    }
  })
}

export default function RomanianLetterExamplePage({ params }: PageProps) {
  const language: Language = 'ro'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  
  if (!professionId) {
    notFound()
  }
  
  return <ExamplePage professionId={professionId} type="letter" language={language} />
}
