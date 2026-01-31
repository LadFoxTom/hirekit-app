import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function FinnishCVExamplesPage() {
  const language: Language = 'fi'
  return <ExamplesOverviewPage type="cv" language={language} />
}
