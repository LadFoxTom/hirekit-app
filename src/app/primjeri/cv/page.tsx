import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function CroatianCVExamplesPage() {
  const language: Language = 'hr'
  return <ExamplesOverviewPage type="cv" language={language} />
}
