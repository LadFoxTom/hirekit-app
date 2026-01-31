import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function SpanishCVExamplesPage() {
  const language: Language = 'es'
  return <ExamplesOverviewPage type="cv" language={language} />
}
