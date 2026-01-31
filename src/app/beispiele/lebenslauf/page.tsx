import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function GermanCVExamplesPage() {
  const language: Language = 'de'
  return <ExamplesOverviewPage type="cv" language={language} />
}
