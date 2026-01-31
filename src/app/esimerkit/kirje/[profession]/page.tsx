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
      description: 'Pyydettyä motivaatiokirje-esimerkkiä ei löytynyt.'
    }
  }
  
  return {
    title: `${profession.name} Motivaatiokirje Esimerkki | LadderFox`,
    description: profession.description,
    keywords: [
      `motivaatiokirje ${profession.name.toLowerCase()}`,
      `kirje esimerkki ${profession.name.toLowerCase()}`,
      'motivaatiokirje pohja'
    ],
    openGraph: {
      title: `${profession.name} Motivaatiokirje Esimerkki`,
      description: profession.description,
      type: 'website',
      locale: 'fi_FI'
    },
    alternates: {
      canonical: `/esimerkit/kirje/${params.profession}`
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

export default function FinnishLetterExamplePage({ params }: PageProps) {
  const language: Language = 'fi'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  
  if (!professionId) {
    notFound()
  }
  
  return <ExamplePage professionId={professionId} type="letter" language={language} />
}
