import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function RomanianCVExamplesPage() {
  const language: Language = 'ro'
  return <ExamplesOverviewPage type="cv" language={language} />
}
