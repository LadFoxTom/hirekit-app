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
  const language: Language = 'fi'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  const profession = professionId ? getProfession(professionId, language) : null
  
  if (!profession) {
    return {
      title: 'Esimerkkiä ei löytynyt',
      description: 'Pyydettyä CV-esimerkkiä ei löytynyt.'
    }
  }
  
  return {
    title: `${profession.name} CV Esimerkki | LadderFox`,
    description: profession.description,
    keywords: [
      `cv ${profession.name.toLowerCase()}`,
      `cv esimerkki ${profession.name.toLowerCase()}`,
      'cv pohja',
      'ammattimainen cv'
    ],
    openGraph: {
      title: `${profession.name} CV Esimerkki`,
      description: profession.description,
      type: 'website',
      locale: 'fi_FI'
    },
    alternates: {
      canonical: `/esimerkit/cv/${params.profession}`
    }
  }
}

export async function generateStaticParams() {
  const language: Language = 'fi'
  
  return PROFESSIONS.map((prof) => {
    const translation = prof.translations[language] || prof.translations.en
    return {
      profession: translation.slug
    }
  })
}

export default function FinnishCVExamplePage({ params }: PageProps) {
  const language: Language = 'fi'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  
  if (!professionId) {
    notFound()
  }
  
  return <ExamplePage professionId={professionId} type="cv" language={language} />
}
