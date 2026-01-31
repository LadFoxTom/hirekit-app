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
  const language: Language = 'hu'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  const profession = professionId ? getProfession(professionId, language) : null
  
  if (!profession) {
    return {
      title: 'Példa nem található',
      description: 'A kért önéletrajz példa nem található.'
    }
  }
  
  return {
    title: `${profession.name} Önéletrajz Példa | LadderFox`,
    description: profession.description,
    keywords: [
      `önéletrajz ${profession.name.toLowerCase()}`,
      `${profession.name.toLowerCase()} cv`,
      'önéletrajz sablon',
      'professzionális önéletrajz'
    ],
    openGraph: {
      title: `${profession.name} Önéletrajz Példa`,
      description: profession.description,
      type: 'website',
      locale: 'hu_HU'
    },
    alternates: {
      canonical: `/peldak/cv/${params.profession}`
    }
  }
}

export async function generateStaticParams() {
  const language: Language = 'hu'
  
  return PROFESSIONS.map((prof) => {
    const translation = prof.translations[language] || prof.translations.en
    return {
      profession: translation.slug
    }
  })
}

export default function HungarianCVExamplePage({ params }: PageProps) {
  const language: Language = 'hu'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  
  if (!professionId) {
    notFound()
  }
  
  return <ExamplePage professionId={professionId} type="cv" language={language} />
}
