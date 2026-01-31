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
  const language: Language = 'sr'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  const profession = professionId ? getProfession(professionId, language) : null
  
  if (!profession) {
    return {
      title: 'Primer nije pronađen',
      description: 'Traženi primer motivacionog pisma nije pronađen.'
    }
  }
  
  return {
    title: `Primer Motivaciono Pismo ${profession.name} | LadderFox`,
    description: profession.description,
    keywords: [
      `motivaciono pismo ${profession.name.toLowerCase()}`,
      `primer pismo ${profession.name.toLowerCase()}`,
      'predložak motivaciono pismo'
    ],
    openGraph: {
      title: `Primer Motivaciono Pismo ${profession.name}`,
      description: profession.description,
      type: 'website',
      locale: 'sr_RS'
    },
    alternates: {
      canonical: `/primeri/pismo/${params.profession}`
    }
  }
}

export async function generateStaticParams() {
  const language: Language = 'sr'
  
  return PROFESSIONS.map((prof) => {
    const translation = prof.translations[language] || prof.translations.en
    return {
      profession: translation.slug
    }
  })
}

export default function SerbianLetterExamplePage({ params }: PageProps) {
  const language: Language = 'sr'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  
  if (!professionId) {
    notFound()
  }
  
  return <ExamplePage professionId={professionId} type="letter" language={language} />
}
