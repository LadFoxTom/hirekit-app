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
      description: 'Det ønskede motivationsbrev-eksempel blev ikke fundet.'
    }
  }
  
  return {
    title: `${profession.name} Motivationsbrev Eksempel | LadderFox`,
    description: profession.description,
    keywords: [
      `motivationsbrev ${profession.name.toLowerCase()}`,
      `brev eksempel ${profession.name.toLowerCase()}`,
      'motivationsbrev skabelon'
    ],
    openGraph: {
      title: `${profession.name} Motivationsbrev Eksempel`,
      description: profession.description,
      type: 'website',
      locale: 'da_DK'
    },
    alternates: {
      canonical: `/eksempler/brev/${params.profession}`
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

export default function DanishLetterExamplePage({ params }: PageProps) {
  const language: Language = 'da'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  
  if (!professionId) {
    notFound()
  }
  
  return <ExamplePage professionId={professionId} type="letter" language={language} />
}
