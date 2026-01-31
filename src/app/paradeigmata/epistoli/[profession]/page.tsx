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
  const language: Language = 'el'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  const profession = professionId ? getProfession(professionId, language) : null
  
  if (!profession) {
    return {
      title: 'Παράδειγμα δεν βρέθηκε',
      description: 'Το ζητούμενο παράδειγμα επιστολής δεν βρέθηκε.'
    }
  }
  
  return {
    title: `Παράδειγμα Επιστολή ${profession.name} | LadderFox`,
    description: profession.description,
    keywords: [
      `επιστολή ${profession.name.toLowerCase()}`,
      `παράδειγμα επιστολή ${profession.name.toLowerCase()}`
    ],
    openGraph: {
      title: `Παράδειγμα Επιστολή ${profession.name}`,
      description: profession.description,
      type: 'website',
      locale: 'el_GR'
    },
    alternates: {
      canonical: `/paradeigmata/epistoli/${params.profession}`
    }
  }
}

export async function generateStaticParams() {
  const language: Language = 'el'
  
  return PROFESSIONS.map((prof) => {
    const translation = prof.translations[language] || prof.translations.en
    return {
      profession: translation.slug
    }
  })
}

export default function GreekLetterExamplePage({ params }: PageProps) {
  const language: Language = 'el'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  
  if (!professionId) {
    notFound()
  }
  
  return <ExamplePage professionId={professionId} type="letter" language={language} />
}
