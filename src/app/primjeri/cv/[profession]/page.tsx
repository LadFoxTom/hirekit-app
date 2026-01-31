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
  const language: Language = 'hr'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  const profession = professionId ? getProfession(professionId, language) : null
  
  if (!profession) {
    return {
      title: 'Primjer nije pronađen',
      description: 'Traženi primjer CV-a nije pronađen.'
    }
  }
  
  return {
    title: `Primjer CV ${profession.name} | LadderFox`,
    description: profession.description,
    keywords: [
      `cv ${profession.name.toLowerCase()}`,
      `primjer cv ${profession.name.toLowerCase()}`,
      'predložak cv',
      'profesionalni cv'
    ],
    openGraph: {
      title: `Primjer CV ${profession.name}`,
      description: profession.description,
      type: 'website',
      locale: 'hr_HR'
    },
    alternates: {
      canonical: `/primjeri/cv/${params.profession}`
    }
  }
}

export async function generateStaticParams() {
  const language: Language = 'hr'
  
  return PROFESSIONS.map((prof) => {
    const translation = prof.translations[language] || prof.translations.en
    return {
      profession: translation.slug
    }
  })
}

export default function CroatianCVExamplePage({ params }: PageProps) {
  const language: Language = 'hr'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  
  if (!professionId) {
    notFound()
  }
  
  return <ExamplePage professionId={professionId} type="cv" language={language} />
}
