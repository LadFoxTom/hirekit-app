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
  const language: Language = 'bg'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  const profession = professionId ? getProfession(professionId, language) : null
  
  if (!profession) {
    return {
      title: 'Примерът не е намерен',
      description: 'Заявеният пример за CV не беше намерен.'
    }
  }
  
  return {
    title: `Пример CV ${profession.name} | LadderFox`,
    description: profession.description,
    keywords: [
      `cv ${profession.name.toLowerCase()}`,
      `пример cv ${profession.name.toLowerCase()}`,
      'шаблон cv',
      'професионално cv'
    ],
    openGraph: {
      title: `Пример CV ${profession.name}`,
      description: profession.description,
      type: 'website',
      locale: 'bg_BG'
    },
    alternates: {
      canonical: `/primery/cv/${params.profession}`
    }
  }
}

export async function generateStaticParams() {
  const language: Language = 'bg'
  
  return PROFESSIONS.map((prof) => {
    const translation = prof.translations[language] || prof.translations.en
    return {
      profession: translation.slug
    }
  })
}

export default function BulgarianCVExamplePage({ params }: PageProps) {
  const language: Language = 'bg'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  
  if (!professionId) {
    notFound()
  }
  
  return <ExamplePage professionId={professionId} type="cv" language={language} />
}
