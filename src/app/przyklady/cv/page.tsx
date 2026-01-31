import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function PolishCVExamplesPage() {
  const language: Language = 'pl'
  return <ExamplesOverviewPage type="cv" language={language} />
}
