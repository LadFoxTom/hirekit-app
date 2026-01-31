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
  const language: Language = 'it'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  const profession = professionId ? getProfession(professionId, language) : null
  
  if (!profession) {
    return {
      title: 'Esempio non trovato',
      description: 'L\'esempio di CV richiesto non è stato trovato.'
    }
  }
  
  return {
    title: `Esempio CV ${profession.name} | LadderFox`,
    description: profession.description,
    keywords: [
      `cv ${profession.name.toLowerCase()}`,
      `esempio cv ${profession.name.toLowerCase()}`,
      'modello cv',
      'cv professionale',
      'creare cv'
    ],
    openGraph: {
      title: `Esempio CV ${profession.name}`,
      description: profession.description,
      type: 'website',
      locale: 'it_IT'
    },
    alternates: {
      canonical: `/esempi/cv/${params.profession}`
    }
  }
}

export async function generateStaticParams() {
  const language: Language = 'it'
  
  return PROFESSIONS.map((prof) => {
    const translation = prof.translations[language] || prof.translations.en
    return {
      profession: translation.slug
    }
  })
}

export default function ItalianCVExamplePage({ params }: PageProps) {
  const language: Language = 'it'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  
  if (!professionId) {
    notFound()
  }
  
  return <ExamplePage professionId={professionId} type="cv" language={language} />
}
