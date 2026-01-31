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
      description: 'Exemplul de CV solicitat nu a fost găsit.'
    }
  }
  
  return {
    title: `Exemplu CV ${profession.name} | LadderFox`,
    description: profession.description,
    keywords: [
      `cv ${profession.name.toLowerCase()}`,
      `exemplu cv ${profession.name.toLowerCase()}`,
      'model cv',
      'cv profesional'
    ],
    openGraph: {
      title: `Exemplu CV ${profession.name}`,
      description: profession.description,
      type: 'website',
      locale: 'ro_RO'
    },
    alternates: {
      canonical: `/exemple/cv/${params.profession}`
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

export default function RomanianCVExamplePage({ params }: PageProps) {
  const language: Language = 'ro'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  
  if (!professionId) {
    notFound()
  }
  
  return <ExamplePage professionId={professionId} type="cv" language={language} />
}
