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
      description: 'Traženi primjer motivacijskog pisma nije pronađen.'
    }
  }
  
  return {
    title: `Primjer Motivacijsko Pismo ${profession.name} | LadderFox`,
    description: profession.description,
    keywords: [
      `motivacijsko pismo ${profession.name.toLowerCase()}`,
      `primjer pismo ${profession.name.toLowerCase()}`,
      'predložak motivacijsko pismo'
    ],
    openGraph: {
      title: `Primjer Motivacijsko Pismo ${profession.name}`,
      description: profession.description,
      type: 'website',
      locale: 'hr_HR'
    },
    alternates: {
      canonical: `/primjeri/pismo/${params.profession}`
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

export default function CroatianLetterExamplePage({ params }: PageProps) {
  const language: Language = 'hr'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  
  if (!professionId) {
    notFound()
  }
  
  return <ExamplePage professionId={professionId} type="letter" language={language} />
}
