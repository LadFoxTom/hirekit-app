import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function SwedishCVExamplesPage() {
  const language: Language = 'sv'
  return <ExamplesOverviewPage type="cv" language={language} />
}
