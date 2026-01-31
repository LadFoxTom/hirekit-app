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
  const language: Language = 'cs'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  const profession = professionId ? getProfession(professionId, language) : null
  
  if (!profession) {
    return {
      title: 'Příklad nenalezen',
      description: 'Požadovaný příklad motivačního dopisu nebyl nalezen.'
    }
  }
  
  return {
    title: `Příklad Motivační Dopis ${profession.name} | LadderFox`,
    description: profession.description,
    keywords: [
      `motivační dopis ${profession.name.toLowerCase()}`,
      `příklad dopis ${profession.name.toLowerCase()}`,
      'šablona motivační dopis'
    ],
    openGraph: {
      title: `Příklad Motivační Dopis ${profession.name}`,
      description: profession.description,
      type: 'website',
      locale: 'cs_CZ'
    },
    alternates: {
      canonical: `/priklady/dopis/${params.profession}`
    }
  }
}

export async function generateStaticParams() {
  const language: Language = 'cs'
  
  return PROFESSIONS.map((prof) => {
    const translation = prof.translations[language] || prof.translations.en
    return {
      profession: translation.slug
    }
  })
}

export default function CzechLetterExamplePage({ params }: PageProps) {
  const language: Language = 'cs'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  
  if (!professionId) {
    notFound()
  }
  
  return <ExamplePage professionId={professionId} type="letter" language={language} />
}
