import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function ItalianCVExamplesPage() {
  const language: Language = 'it'
  return <ExamplesOverviewPage type="cv" language={language} />
}
