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
  const language: Language = 'pl'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  const profession = professionId ? getProfession(professionId, language) : null
  
  if (!profession) {
    return {
      title: 'Przykład nie znaleziono',
      description: 'Nie znaleziono żądanego przykładu listu motywacyjnego.'
    }
  }
  
  return {
    title: `Przykład List Motywacyjny ${profession.name} | LadderFox`,
    description: profession.description,
    keywords: [
      `list motywacyjny ${profession.name.toLowerCase()}`,
      `przykład list ${profession.name.toLowerCase()}`,
      'szablon list motywacyjny'
    ],
    openGraph: {
      title: `Przykład List Motywacyjny ${profession.name}`,
      description: profession.description,
      type: 'website',
      locale: 'pl_PL'
    },
    alternates: {
      canonical: `/przyklady/list/${params.profession}`
    }
  }
}

export async function generateStaticParams() {
  const language: Language = 'pl'
  
  return PROFESSIONS.map((prof) => {
    const translation = prof.translations[language] || prof.translations.en
    return {
      profession: translation.slug
    }
  })
}

export default function PolishLetterExamplePage({ params }: PageProps) {
  const language: Language = 'pl'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  
  if (!professionId) {
    notFound()
  }
  
  return <ExamplePage professionId={professionId} type="letter" language={language} />
}
