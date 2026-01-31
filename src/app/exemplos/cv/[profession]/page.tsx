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
  const language: Language = 'pt'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  const profession = professionId ? getProfession(professionId, language) : null
  
  if (!profession) {
    return {
      title: 'Exemplo não encontrado',
      description: 'O exemplo de CV solicitado não foi encontrado.'
    }
  }
  
  return {
    title: `Exemplo CV ${profession.name} | LadderFox`,
    description: profession.description,
    keywords: [
      `cv ${profession.name.toLowerCase()}`,
      `exemplo cv ${profession.name.toLowerCase()}`,
      'modelo cv',
      'cv profissional',
      'criar cv'
    ],
    openGraph: {
      title: `Exemplo CV ${profession.name}`,
      description: profession.description,
      type: 'website',
      locale: 'pt_PT'
    },
    alternates: {
      canonical: `/exemplos/cv/${params.profession}`
    }
  }
}

export async function generateStaticParams() {
  const language: Language = 'pt'
  
  return PROFESSIONS.map((prof) => {
    const translation = prof.translations[language] || prof.translations.en
    return {
      profession: translation.slug
    }
  })
}

export default function PortugueseCVExamplePage({ params }: PageProps) {
  const language: Language = 'pt'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  
  if (!professionId) {
    notFound()
  }
  
  return <ExamplePage professionId={professionId} type="cv" language={language} />
}
