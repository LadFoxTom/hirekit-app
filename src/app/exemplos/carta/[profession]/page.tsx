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
      description: 'O exemplo de carta de apresentação solicitado não foi encontrado.'
    }
  }
  
  return {
    title: `Exemplo Carta de Apresentação ${profession.name} | LadderFox`,
    description: profession.description,
    keywords: [
      `carta apresentação ${profession.name.toLowerCase()}`,
      `exemplo carta ${profession.name.toLowerCase()}`,
      'modelo carta apresentação',
      'carta profissional'
    ],
    openGraph: {
      title: `Exemplo Carta de Apresentação ${profession.name}`,
      description: profession.description,
      type: 'website',
      locale: 'pt_PT'
    },
    alternates: {
      canonical: `/exemplos/carta/${params.profession}`
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

export default function PortugueseLetterExamplePage({ params }: PageProps) {
  const language: Language = 'pt'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  
  if (!professionId) {
    notFound()
  }
  
  return <ExamplePage professionId={professionId} type="letter" language={language} />
}
