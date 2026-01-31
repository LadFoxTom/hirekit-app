import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function HungarianCVExamplesPage() {
  const language: Language = 'hu'
  return <ExamplesOverviewPage type="cv" language={language} />
}
