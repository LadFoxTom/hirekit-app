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
      description: 'Заявеният пример за мотивационно писмо не беше намерен.'
    }
  }
  
  return {
    title: `Пример Мотивационно Писмо ${profession.name} | LadderFox`,
    description: profession.description,
    keywords: [
      `мотивационно писмо ${profession.name.toLowerCase()}`,
      `пример писмо ${profession.name.toLowerCase()}`,
      'шаблон мотивационно писмо'
    ],
    openGraph: {
      title: `Пример Мотивационно Писмо ${profession.name}`,
      description: profession.description,
      type: 'website',
      locale: 'bg_BG'
    },
    alternates: {
      canonical: `/primery/pismo/${params.profession}`
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

export default function BulgarianLetterExamplePage({ params }: PageProps) {
  const language: Language = 'bg'
  const professionId = getProfessionIdFromSlug(params.profession, language)
  
  if (!professionId) {
    notFound()
  }
  
  return <ExamplePage professionId={professionId} type="letter" language={language} />
}
