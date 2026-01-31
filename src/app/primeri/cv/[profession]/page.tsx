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
  const language: Language = 'sr'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  const profession = professionId ? getProfession(professionId, language) : null
  
  if (!profession) {
    return {
      title: 'Primer nije pronađen',
      description: 'Traženi primer CV-a nije pronađen.'
    }
  }
  
  return {
    title: `Primer CV ${profession.name} | LadderFox`,
    description: profession.description,
    keywords: [
      `cv ${profession.name.toLowerCase()}`,
      `primer cv ${profession.name.toLowerCase()}`,
      'predložak cv',
      'profesionalni cv'
    ],
    openGraph: {
      title: `Primer CV ${profession.name}`,
      description: profession.description,
      type: 'website',
      locale: 'sr_RS'
    },
    alternates: {
      canonical: `/primeri/cv/${params.profession}`
    }
  }
}

export async function generateStaticParams() {
  const language: Language = 'sr'
  
  return PROFESSIONS.map((prof) => {
    const translation = prof.translations[language] || prof.translations.en
    return {
      profession: translation.slug
    }
  })
}

export default function SerbianCVExamplePage({ params }: PageProps) {
  const language: Language = 'sr'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  
  if (!professionId) {
    notFound()
  }
  
  return <ExamplePage professionId={professionId} type="cv" language={language} />
}
