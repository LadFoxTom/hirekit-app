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
      description: 'Το ζητούμενο παράδειγμα βιογραφικού δεν βρέθηκε.'
    }
  }
  
  return {
    title: `Παράδειγμα CV ${profession.name} | LadderFox`,
    description: profession.description,
    keywords: [
      `cv ${profession.name.toLowerCase()}`,
      `βιογραφικό ${profession.name.toLowerCase()}`,
      'πρότυπο cv'
    ],
    openGraph: {
      title: `Παράδειγμα CV ${profession.name}`,
      description: profession.description,
      type: 'website',
      locale: 'el_GR'
    },
    alternates: {
      canonical: `/paradeigmata/cv/${params.profession}`
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

export default function GreekCVExamplePage({ params }: PageProps) {
  const language: Language = 'el'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  
  if (!professionId) {
    notFound()
  }
  
  return <ExamplePage professionId={professionId} type="cv" language={language} />
}
