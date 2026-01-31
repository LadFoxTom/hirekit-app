import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function GreekCVExamplesPage() {
  const language: Language = 'el'
  return <ExamplesOverviewPage type="cv" language={language} />
}
