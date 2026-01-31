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
      description: 'L\'esempio di lettera di presentazione richiesto non è stato trovato.'
    }
  }
  
  return {
    title: `Esempio Lettera di Presentazione ${profession.name} | LadderFox`,
    description: profession.description,
    keywords: [
      `lettera presentazione ${profession.name.toLowerCase()}`,
      `esempio lettera ${profession.name.toLowerCase()}`,
      'modello lettera presentazione',
      'lettera professionale'
    ],
    openGraph: {
      title: `Esempio Lettera di Presentazione ${profession.name}`,
      description: profession.description,
      type: 'website',
      locale: 'it_IT'
    },
    alternates: {
      canonical: `/esempi/lettera/${params.profession}`
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

export default function ItalianLetterExamplePage({ params }: PageProps) {
  const language: Language = 'it'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  
  if (!professionId) {
    notFound()
  }
  
  return <ExamplePage professionId={professionId} type="letter" language={language} />
}
